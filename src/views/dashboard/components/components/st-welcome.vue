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
  <div class="flex justify-between">
    <div class="ma-content-block rounded-sm flex justify-between w-full p-3">
      <div class="pl-0 flex inline-block">
        <a-avatar :size="75" class="hidden lg:inline-block">
          <img
            :src="
            (userStore.user && userStore.user.avatar)
            ? $tool.showFile(userStore.user.avatar)
            : $url + 'avatar.jpg'"
          />
        </a-avatar>
        <div class="pl-3 mt-2">
          <div class="content-block-title">
            {{ userStore.user.nickname || userStore.user.username }}，{{ $t("adm.welcome") }}！
          </div>
          <div class="leading-5 mt-2">
            <a-tag color="blue" bordered>{{ $t("adm.openSource") }}</a-tag>
            {{ $t("adm.welcomeTo") }}{{ app_title }}！ {{ $t("adm.welcomeMsg") }}
          </div>
        </div>
      </div>
      <div class="datetime ml-5 hidden md:block">
        <h2 class="text-3xl text-center">{{ time }}</h2>
        <p class="text-base">{{ day }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '@/store'
  import dayjs from 'dayjs'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const userStore = useUserStore()
  const visible = ref(false)

  const time = ref(null)
  const day = ref(null)

  onMounted(() => {
    showTime()
    setInterval(() => showTime(), 1000)
  })

  const showTime = () => {
    time.value = dayjs().format('HH:mm:ss')
    day.value  = dayjs().format('YYYY-MM-DD')
  }

  const app_title = import.meta.env.VITE_APP_TITLE
  
</script>

<style scoped>
.datetime {
  background: rgb(var(--primary-6));
  color: #fff;
  width: 160px;
  text-align: center;
  border-radius: 3px;
  padding: 5px 10px;
}
</style>