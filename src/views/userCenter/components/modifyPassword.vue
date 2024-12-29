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
  <a-form class="w-full md:w-full mt-3" :model="password" @submit="modifyPassword">
    <a-form-item
      :label="t('adm.oldPassword')"
      field="oldPassword"
      label-col-flex="120px"
      :rules="[{ required: true, message: t('adm.oldPasswordRequired')}]"
    >
      <a-input-password
        v-model="password.oldPassword"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item
      :label="t('adm.newPassword')"
      field="newPassword"
      label-col-flex="120px"
      :rules="[{ required: true, message: t('adm.newPasswordRequired')}]"
    >
      <a-input-password
        v-model="password.newPassword"
        @input="checkSafe"
        @clear="() => passwordSafePercent = 0"
        autocomplete="off"
        allow-clear
      />
    </a-form-item>
    <a-form-item :label="t('adm.passwordSecurity')" label-col-flex="120px">
      <a-progress
        :steps="3"
        status="success"
        :percent="passwordSafePercent"
        animation
        :show-text="false"
      />
    </a-form-item>
    <a-form-item
      :label="t('adm.confirmPassword')"
      field="newPassword_confirmation"
      label-col-flex="120px"
      :rules="[{ required: true, message: t('adm.confirmPasswordRequired') }]"
    >
      <a-input-password
        allow-clear
        v-model="password.newPassword_confirmation"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label-col-flex="120px">
      <a-button html-type="submit" type="primary">{{ $t('adm.save') }}</a-button>
    </a-form-item>
  </a-form>

  <a-modal v-model:visible="visible" @ok="resetLogin">
    <template #title>{{ $t('adm.hint') }}</template>
    {{ $t('adm.passwordChangeSuccess') }}
  </a-modal>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import user from '@/api/system/user'
  import tool from '@/utils/tool'
  import { useRouter } from 'vue-router'
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  const router = useRouter()
  const password = reactive({
    oldPassword: '',
    newPassword: '',
    newPassword_confirmation: ''
  })

  const visible = ref(false)
  const passwordSafePercent = ref(0)

  const resetLogin = () => {

    router.push({name:'login'})
  }

  const modifyPassword = async (data) => {
    if (! data.errors) {
      if (data.values.newPassword !== data.values.newPassword_confirmation) {
        Message.error(t('adm.confirmPasswordNotMatch'))
        return
      }
      const response = await user.modifyPassword(data.values)
      if (response.success) {
        tool.local.clear()
        visible.value = true
      } else {
        Message.error(response.message)
      }
    }
  }

  const checkSafe = (password) => {
    if (password.length < 1) {
      passwordSafePercent.value = 0
      return
    }

    if (! (password.length >= 6) ) {
      passwordSafePercent.value = 0
      return
    }

    passwordSafePercent.value = 0.1

    if (/\d/.test(password)) {
      passwordSafePercent.value += 0.1
    }

    if (/[a-z]/.test(password)) {
      passwordSafePercent.value += 0.1
    }

    if (/[A-Z]/.test(password)) {
      passwordSafePercent.value += 0.3
    }

    if (/[`~!@#$%^&*()_+<>?:"{},./;'[\]]/.test(password)) {
      passwordSafePercent.value += 0.4
    }
  }
</script>
