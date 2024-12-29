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
  <div class="w-full lg:w-3/12 ma-content-block rounded-sm ml-0 lg:ml-3 p-3 mt-3">
    <div class="flex">
      Links
    </div>
    <div class="block lg:grid lg:grid-cols-2 lg:gap-1 mt-3">
      <a-card class="rounded-sm text-center" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://www.admin.im')"
        >Admin.IM</a-button>
      </a-card>
      <a-card class="rounded-sm text-center mt-2 lg:mt-0" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://doc.admin.im')"
        >Documentation</a-button>
      </a-card>
      <a-card class="rounded-sm text-center mt-2" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://github.com/AdmUU/Admin.IM')"
        >Github</a-button>
      </a-card>
      <a-card class="rounded-sm text-center mt-2" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://gitee.com/AdmUU/Admin.IM')"
        >Gitee </a-button>
      </a-card>
      <a-card class="rounded-sm text-center mt-2" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://github.com/mineadmin/mineadmin')"
        >MineAdmin</a-button>
      </a-card>
      <a-card class="rounded-sm text-center mt-2" :body-style="{ padding: 0 }" :bordered="false">
        <a-button
          type="outline"
          class="w-4/5"
          @click="openPage('https://hyperf.io')"
        >Hyperf</a-button>
      </a-card>
    </div>
    <div class="w-11/12 mx-auto mt-3">
      <a-tag class="ml-0.5">Admin.IM v{{ admVersion }} release</a-tag>
      <a-tag class="ml-0.5">MineAdmin v{{ config.version }} release</a-tag>
    </div>
  </div>
</template>

<script setup>
  import config from '@/../package.json'
  
  const admVersion = import.meta.env.VITE_APP_VERSION;

  const openPage = (url = '') => {
    window.open(url)
  }
</script>