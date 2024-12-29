<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <template #tableBeforeButtons>
        <a-button type="primary" status="success" @click="showNewNodeModal()"
          ><template #icon> <icon-plus /></template
          >{{ $t("adm.addNode") }}</a-button
        >
      </template>
      <template #operationBeforeExtend="{ record }">
        <a-link
          @click="showNodeEnableModal(record.id, record.enable == 1 ? 0 : 1)"
          type="primary"
          ><icon-close-circle v-if="record.enable" /><icon-check-circle
            v-else
          />{{
            record.enable === 0 ? t("adm.enableNode") : t("adm.disableNode")
          }}</a-link
        >
        <a-link
          @click="showNodeBlockModal(record.id, record.block == 1 ? 0 : 1)"
          type="primary"
          ><icon-close-circle v-if="record.block === 0" /><icon-check-circle
            v-else
          />{{
            record.block === 0 ? t("adm.blockNode") : t("adm.unblockNode")
          }}</a-link
        >
      </template>
    </ma-crud>
    <a-modal v-model:visible="newNodeModalVisible" :cancelButtonProps="{ style: { display: 'none' } }">
      <template #title>{{ $t("adm.addNode") }}</template>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; align-items: center; margin-bottom: 10px">
          <label>{{ $t("adm.addNodeText") }}</label>
        </div>
        <div style="display: flex; align-items: center">
          <a-textarea v-model="newNodeModalData.cmd" auto-size readonly />
        </div>
        <div style="margin-top: 30px; margin-bottom: 5px; display: flex; align-items: center">
          <!-- <label style="width: 70px">{{ $t("adm.cnMirror") }}：</label>
          <a-checkbox
            style="width: 64px; margin: 0"
            v-model="newNodeModalData.cn"
            allow-clear
            readonly
          /> -->
          
          <label>{{ $t("adm.shareNode") }}：</label>
          <a-checkbox
            style="width: 24px; margin: 0"
            v-model="newNodeModalData.share"
            allow-clear
            readonly
          />
          <a-input style="width: 150px; margin: 0"
            :placeholder="t('adm.shareName')"
            :maxlength="10"
            allow-clear
            show-count
            v-model="newNodeModalData.shareName"
            v-if="newNodeModalData.share"
          />
          <a-tooltip :content="t('adm.shareNodeTooltip')"><icon-question-circle class="arco-form-item-label-tooltip" /></a-tooltip>

        </div>
        <div style="margin-top: 10px; line-height: 30px">
          <p style="margin-right: 10px">{{ $t("adm.notes") }}：</p>
          <p style="margin-right: 10px">1、{{ $t("adm.addNodeNotes1") }}</p>
          <p style="margin-right: 10px">2、{{ $t("adm.addNodeNotes2") }}</p>
          <p style="margin-right: 10px">3、{{ $t("adm.addNodeNotes3") }} <a href="https://doc.admin.im/zh/guide/agent/install.html" target="_blank"><icon-send /> {{ $t("adm.addNodeNotes3Link") }}</a></p>
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="nodeEnableModalVisible"
      @ok="handleNodeEnable(nodeEnableModalEnable, nodeEnableModalNodeID)"
      width="400px"
    >
      <template #title>{{
        nodeEnableModalEnable == 1 ? t("adm.enableNode") : t("adm.disableNode")
      }}</template>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; align-items: center; margin-bottom: 10px">
          {{
            nodeEnableModalEnable == 1
              ? t("adm.enableNodeText")
              : t("adm.disableNodeText")
          }}
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="nodeBlockModalVisible"
      @ok="handleNodeBlock(nodeBlockModalEnable, nodeBlockModalNodeID)"
      width="400px"
    >
      <template #title>{{
        nodeBlockModalEnable == 1 ? t("adm.blockNode") : t("adm.unblockNode")
      }}</template>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; align-items: center; margin-bottom: 10px">
          {{
            nodeBlockModalEnable == 1
              ? t("adm.blockNodeText")
              : t("adm.unblockNodeText")
          }}
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="jsx">
import { ref, reactive, computed } from "vue";
import admNode from "@/api/adm/admNode";
import admNodeGroup from "@/api/adm/admNodeGroup";
import settingConfig from "@/api/setting/config";
import { Message } from "@arco-design/web-vue";
import tool from "@/utils/tool";
import * as common from "@/utils/common";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const crudRef = ref();

const numberOperation = (newValue, id, numberName) => {
  admNode
    .numberOperation({ id, numberName, numberValue: newValue })
    .then((res) => {
      res.success && Message.success(res.message);
    })
    .catch((e) => {
      console.log(e);
    });
};

const switchStatus = (statusValue, id, statusName) => {
  admNode
    .changeStatus({ id, statusName, statusValue })
    .then((res) => {
      res.success && Message.success(res.message);
    })
    .catch((e) => {
      console.log(e);
    });
};

const options = reactive({
  id: "adm_node",
  rowSelection: {
    showCheckedAll: true,
  },
  pk: "id",
  operationColumn: true,
  operationColumnWidth: 300,
  operationColumnAlign: "center",
  formOption: {
    viewType: "drawer",
    width: 600,
  },
  api: admNode.getList,
  recycleApi: admNode.getRecycleList,
  edit: {
    show: true,
    api: admNode.update,
    auth: ["adm:node:update"],
    text: t("adm.edit")
  },
  delete: {
    show: true,
    api: admNode.deletes,
    auth: ["adm:node:delete"],
    realApi: admNode.realDeletes,
    realAuth: ["adm:node:realDeletes"],
    text: t("adm.delete")
  },
  recovery: {
    show: true,
    api: admNode.recoverys,
    auth: ["adm:node:recovery"],
    text: t("adm.recovery")
  },
  isDbClickEdit: false,
  pageSize:50
});

const columns = reactive([
  {
    title: "ID",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: t('adm.pleaseInput')+'ID',
    },
  },
  {
    title: "Did",
    dataIndex: "did",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.nodeCNName"),
    dataIndex: "name",
    formType: "input",
    search: true,
    searchPlaceholder: t('adm.pleaseInput')+t('adm.nodeCNName'),
    width: 200,
    commonRules: {
      required: true,
      message: t('adm.pleaseInput')+t('adm.nodeCNName'),
    },
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: t("adm.nodeENName"),
    dataIndex: "name_en",
    formType: "input",
    hide: true,
    searchPlaceholder: t('adm.pleaseInput')+t('adm.nodeENName'),
    commonRules: {
      required: true,
      message: t('adm.pleaseInput')+t('adm.nodeENName'),
    },
  },
  {
    title: "IP",
    dataIndex: "ipv4",
    formType: "input",
    ellipsis: false,
    align: 'center',
    width: 200,
    customRender: ({ record }) => {
      const { ipv4, ipv6 } = record;
          return (
            <div>
              <a-tag>{record.ipv4}</a-tag>
              <a-tag>{record.ipv6}</a-tag>
            </div>
          );    }
  },
  {
    title: "IPv6",
    dataIndex: "ipv6",
    formType: "input",
    width: 180,
    hide: true,
  },
  {
    title: t("adm.country"),
    dataIndex: "country",
    formType: "select",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    align: 'center',
    width: 200,
    commonRules: {
      required: false,
      message: t('adm.pleaseChoose') + t('adm.country'),
    },
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    dict: {
      name: "country_code",
      props: {
        label: "title",
        value: "key",
      },
      translation: false,
    },
  },
  {
    title: t("adm.province"),
    dataIndex: "province",
    formType: "input",
    type: "select",
    mode: "name",
    addDisplay: false,
    editDisplay: false,
    ellipsis: false,
    hide: true,
    searchPlaceholder: t('adm.pleaseChoose'),
  },
  {
    title: t("adm.region"),
    dataIndex: "region",
    formType: "select",
    addDisplay: false,
    editDisplay: false,
    ellipsis: false,
    hide: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    commonRules: {
      required: false,
      message: t('adm.pleaseChoose') + t('adm.region'),
    },
    dict: {
      name: "region",
      props: {
        label: "title",
        value: "key",
      },
      translation: true,
    },
  },
  {
    title: t("adm.continent"),
    dataIndex: "continent",
    formType: "select",
    searchPlaceholder: t('adm.pleaseChoose'),
    addDisplay: false,
    editDisplay: false,
    ellipsis: false,
    hide: true,
    commonRules: {
      required: false,
      message: t('adm.pleaseChoose') + t('adm.continent'),
    },
    dict: {
      name: "continent_code",
      props: {
        label: "title",
        value: "key",
      },
      translation: true,
    },
  },
  {
    title: t("adm.isp"),
    dataIndex: "isp",
    formType: "select",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    width: 150,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    dict: {
      name: "ISP",
      props: {
        label: "title",
        value: "key",
      },
      translation: true,
    },
  },
  {
    title: t("adm.online"),
    dataIndex: "online_status",
    formType: "radio",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    addDisplay: false,
    editDisplay: false,
    align: 'center',
    width: 10,
    commonRules: {
      required: true,
      message: t('adm.pleaseChoose') + t('adm.online') + t('adm.status'),
    },
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    dict: {
      data: [
        {
          label: t("adm.yes"),
          value: "1",
        },
        {
          label: t("adm.no"),
          value: "0",
        },
      ],
      translation: true,
    },
  },
  {
    title: t("adm.onlineTime"),
    dataIndex: "online_total_time",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    align: 'center',
    width: 150,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    customRender: ({ record }) => {
        const online_total_time = formatSeconds(record.online_total_time)
        return (
            online_total_time
        )
    }
  },
  {
    title: t("adm.lastOnline"),
    dataIndex: "online_last_time",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    ellipsis: false,
    hide: true,
    align: 'center',
    width: 120,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    showTime: true,
  },
  {
    title: t("adm.group"),
    dataIndex: "group.id",
    formType: "radio",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    addDisplay: false,
    editDisplay: false,
    align: 'center',
    dict: {
      remote: "adm/nodeGroup/remote",
      props: { label: "name", value: "id" },
      translation: true,
    },
  },
  {
    title: t("adm.version"),
    dataIndex: "version",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    ellipsis: false,
    hide: false,
    align: 'center',
    width: 120,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    showTime: true,
  },
  {
    title: t("adm.enable"),
    dataIndex: "enable",
    formType: "radio",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    align: 'center',
    width: 10,
    commonRules: {
      required: true,
      message: t('adm.pleaseChoose'),
    },
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    checkedValue: "1",
    uncheckedValue: "0",
    dict: {
      data: [
        {
          label: t("adm.yes"),
          value: "1",
        },
        {
          label: t("adm.no"),
          value: "0",
        },
      ],
      translation: true,
    },
  },
  {
    title: t("adm.block"),
    dataIndex: "block",
    formType: "radio",
    search: false,
    searchPlaceholder: t('adm.pleaseChoose'),
    align: 'center',
    width: 10,
    commonRules: {
      required: true,
      message: t('adm.pleaseChoose'),
    },
    checkedValue: "1",
    uncheckedValue: "0",
    dict: {
      data: [
        {
          label: t("adm.yes"),
          value: "1",
        },
        {
          label: t("adm.no"),
          value: "0",
        },
      ],
      translation: true,
    },
  },
  {
    title: t("adm.weight"),
    dataIndex: "weight",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.connectionType"),
    dataIndex: "connection_type",
    formType: "radio",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    dict: {
      data: [
        {
          label: t("adm.own"),
          value: "1",
        },
        {
          label: t("adm.anonymous"),
          value: "2",
        },
        {
          label: t("adm.user"),
          value: "3",
        },
      ],
      translation: true,
    },
  },
  {
    title: t("adm.sponsorID"),
    dataIndex: "sponsor_id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.sponsorName"),
    dataIndex: "sponsor_name",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.sponsorURL"),
    dataIndex: "sponsor_url",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.sponsorStatus"),
    dataIndex: "sponsor_status",
    formType: "radio",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    checkedValue: "approval",
    uncheckedValue: "review",
    dict: {
      data: [
        {
          label: t("adm.hidden"),
          value: "review",
        },
        {
          label: t("adm.show"),
          value: "approval",
        },
      ],
      translation: true,
    },
  },
  {
    title: t("adm.ext"),
    dataIndex: "ext",
    formType: "textarea",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.authCode"),
    dataIndex: "auth_code",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.creator"),
    dataIndex: "created_by",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.updater"),
    dataIndex: "updated_by",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
  {
    title: t("adm.createTime"),
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true,
  },
  {
    title: t("adm.updateTime"),
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true,
  },
  {
    title: t("adm.deleteTime"),
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true,
  },
  {
    title: t("adm.remark"),
    dataIndex: "remark",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
  },
]);

const formatSeconds = (totalSeconds) => {
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      
      let result = '';
      if (days > 0) result += `${days}`+t("adm.day");
      if (hours > 0) result += `${hours}`+t("adm.hour");
      if (minutes > 0) result += `${minutes}`+t("adm.minute");
      
      return result || t("adm.lessThan1Minute");
    };
    
const newNodeModalVisible = ref(false);
const newNodeModalData = ref({
  cmd: "",
  websocket_url: "",
  client_id: "",
  client_secret: "",
  cn: false,
  share: false,
});
newNodeModalData.value.cmd = computed(() => {
  let websocket_url = newNodeModalData.value.websocket_url ? newNodeModalData.value.websocket_url : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  let share = newNodeModalData.value.share ? "-share yes" : "";
  let shareName = share && newNodeModalData.value.shareName ? " -sharename " + newNodeModalData.value.shareName : "";
  return `bash <(curl -fsSL https://get.admin.im) -a ${websocket_url} -k ${newNodeModalData.value.client_id} -s ${newNodeModalData.value.client_secret} ${share}${shareName}`;
});
const showNewNodeModal = () => {
  newNodeModalVisible.value = true;
  admNodeGroup.getList({ orderBy: "id", pageSize: 1 }).then((res) => {
    if (res.data.items != undefined && res.data.items.length > 0) {
      newNodeModalData.value.client_id = res.data.items[0].client_id;
      newNodeModalData.value.client_secret = res.data.items[0].client_secret;
    }
  });
  settingConfig.getConfigList({ key: "websocket_url" }).then((res) => {
    if (res.data.length > 0) {
      newNodeModalData.value.websocket_url = res.data[0].value;
    }
  });
};

const nodeEnableModalVisible = ref(false);
const nodeEnableModalEnable = ref(1);
const nodeEnableModalNodeID = ref(0);

const showNodeEnableModal = (nodeID, enable) => {
  nodeEnableModalVisible.value = true;
  nodeEnableModalEnable.value = enable;
  nodeEnableModalNodeID.value = nodeID;
};
const handleNodeEnable = (enable, id) => {
  console.log(id, enable);
  admNode
    .nodeEnable(id, { enable: enable })
    .then((res) => {
      res.success && Message.success(res.message);
      crudRef.value.refresh();
    })
    .catch((e) => {
      console.log(e);
    });
};


const nodeBlockModalVisible = ref(false);
const nodeBlockModalEnable = ref(1);
const nodeBlockModalNodeID = ref(0);
const app_official = import.meta.env.VITE_APP_OFFICIAL === "true";
const sponsor_fields = ["sponsor_id", "sponsor_name", "sponsor_url", "sponsor_status"];
if (app_official == true) {
  sponsor_fields.forEach(field => {
    const column = columns.find(col => col.dataIndex === field)
    if (column) {
      column.editDisplay = true
    }
  })
} else {
  const tempColumns = [...columns]
  columns.length = 0
  columns.push(...tempColumns.filter(col => !sponsor_fields.includes(col.dataIndex)))
}

const showNodeBlockModal = (nodeID, block) => {
  nodeBlockModalVisible.value = true;
  nodeBlockModalEnable.value = block;
  nodeBlockModalNodeID.value = nodeID;
};
const handleNodeBlock = (block, id) => {
  console.log("handleNodeBlock", id, block);
  admNode
    .nodeBlock(id, { block: block })
    .then((res) => {
      res.success && Message.success(res.message);
      crudRef.value.refresh();
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
<script lang="jsx">
export default { name: "adm:node" };
</script>
