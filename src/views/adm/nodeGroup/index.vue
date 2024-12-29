<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <template #operationBeforeExtend="{ record }">
        <a-link @click="showAuthModal(record.id, record.client_id, record.client_secret)" type="primary"><icon-safe />{{ $t('adm.authCode') }}</a-link>
      </template>
    </ma-crud>
  <a-modal v-model:visible="authModalVisible" width="400px" >
    <template #title>{{ $t('adm.authCode') }}</template>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <label style="width: 60px; margin-right: 10px;">ID:</label>
        <a-input style="width: 320px;" v-model="authModalData.clientID" allow-clear readonly/>
      </div>
      <div style="display: flex; align-items: center;">
        <label style="width: 60px; margin-right: 10px;">Secret:</label>
        <a-input style="width: 320px;" v-model="authModalData.clientSecret" allow-clear readonly/>
      </div>
    </div>
  </a-modal>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import admNodeGroup from '@/api/adm/admNodeGroup'
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'
const crudRef = ref()

const { t } = useI18n()
const authModalVisible = ref(false);
const authModalData = ref({});
const showAuthModal = (groupID, clientID, clientSecret) => {
  authModalVisible.value = true
  authModalData.value.clientID = clientID
  authModalData.value.clientSecret = clientSecret
}
const numberOperation = (newValue, id, numberName) => {
  admNodeGroup.numberOperation({ id, numberName, numberValue: newValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}

const switchStatus = (statusValue, id, statusName) => {
  admNodeGroup.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}


const options = reactive({
  id: 'adm_node_group',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationColumnWidth: 320,
  formOption: {
    viewType: 'drawer',
    width: 600
  },
  api: admNodeGroup.getList,
  recycleApi: admNodeGroup.getRecycleList,
  add: {
    show: true,
    api: admNodeGroup.save,
    auth: ['adm:nodeGroup:save'],
    text: t("adm.add")
  },
  edit: {
    show: true,
    api: admNodeGroup.update,
    auth: ['adm:nodeGroup:update'],
    text: t("adm.edit")
  },
  delete: {
    show: true,
    api: admNodeGroup.deletes,
    auth: ['adm:nodeGroup:delete'],
    realApi: admNodeGroup.realDeletes,
    realAuth: ['adm:nodeGroup:realDeletes'],
    text: t("adm.delete")
  },
  recovery: {
    show: true,
    api: admNodeGroup.recoverys,
    auth: ['adm:nodeGroup:recovery'],
    text: t("adm.recovery")
  }
})

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
      message: "请输入"
    }
  },
  {
    title: t('adm.name'),
    dataIndex: "name",
    formType: "input",
    search: true,
    searchPlaceholder: t('adm.pleaseInput')+t('adm.name'),
    commonRules: {
      required: true,
      message: "请输入名称"
    },
    sortable: {
      sortDirections: [
        "ascend",
        "descend"
      ],
      sorter: true
    }
  },
  {
    title: t('adm.nodeENName'),
    dataIndex: "name_en",
    formType: "input",
    search: true,
    searchPlaceholder: t('adm.pleaseInput')+t('adm.nodeENName'),
    commonRules: {
      required: true,
      message: "请输入英文名称"
    },
    sortable: {
      sortDirections: [
        "ascend",
        "descend"
      ],
      sorter: true
    }
  },
  {
    title: t('adm.enable'),
    dataIndex: "enable",
    formType: "radio",
    search: true,
    searchPlaceholder: t('adm.pleaseChoose'),
    addDisplay: false,
    commonRules: {
      required: true,
      message: "请输入启用"
    },
    sortable: {
      sortDirections: [
        "ascend",
        "descend"
      ],
      sorter: true
    },
    dict: {
      data: [
        {
          label: t('adm.yes'),
          value: "1"
        },
        {
          label: t('adm.no'),
          value: "0"
        }
      ],
      translation: true
    }
  },
  {
    title: t('adm.weight'),
    dataIndex: "weight",
    formType: "input-number",
    addDisplay: false,
    commonRules: {
      required: true,
      message: "请输入排序权重"
    },
    sortable: {
      sortDirections: [
        "ascend",
        "descend"
      ],
      sorter: true
    },
    min: 0,
    max: 1000,
    step: 1,
  },
  {
    title: t('adm.nodeTotal'),
    dataIndex: "node_total",
    formType: "static-text",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "Client ID",
    dataIndex: "client_id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: "Client Secret",
    dataIndex: "client_secret",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: t('adm.ext'),
    dataIndex: "ext",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: t("adm.createTime"),
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  },
  {
    title: t("adm.updateTime"),
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  },
  {
    title: t("adm.deleteTime"),
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  }
])

</script>
<script> export default { name: 'adm:nodeGroup' } </script>