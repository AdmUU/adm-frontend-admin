<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://gitee.com/xmo/mineadmin-vue
-->
<template>
  <a-form class="w-full md:w-full mt-3" :model="userInfo" @submit="modifyInfo">
    <a-form-item :label="t('adm.accountName')" label-col-flex="80px">
      <a-input disabled :default-value="userInfo.username" allow-clear />
    </a-form-item>
    <a-form-item :label="t('adm.nickName')" label-col-flex="80px">
      <a-input v-model="userInfo.nickname" allow-clear />
    </a-form-item>
    <a-form-item :label="t('adm.cellPhone')" label-col-flex="80px">
      <a-input v-model="userInfo.phone" allow-clear />
    </a-form-item>
    <a-form-item :label="t('adm.email')" label-col-flex="80px">
      <a-input v-model="userInfo.email" allow-clear />
    </a-form-item>
    <a-form-item :label="t('adm.personalSignature')" label-col-flex="80px">
      <a-textarea v-model="userInfo.signed" :max-length="255" class="h-28" show-word-limit allow-clear />
    </a-form-item>
    <a-form-item label-col-flex="80px">
      <a-button html-type="submit" type="primary">{{ $t('adm.save') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useUserStore } from '@/store'
  import { Message } from '@arco-design/web-vue'
  import user from '@/api/system/user'
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  const userStore = useUserStore()

  const userInfo = reactive({
    ...userStore.user
  })

  const modifyInfo = async (data) => {
    data.values.avatar = userStore.user.avatar
    const response = await user.updateInfo(data.values)
    if (response.success) {
      Message.success(response.message)
      userStore.user = data.values
      return
    }
  }
</script>
