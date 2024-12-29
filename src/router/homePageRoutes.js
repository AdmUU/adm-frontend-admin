import i18n from '@/i18n';
const { t } = i18n.global;
const homePageRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: t('menus.dashboard'),
      icon: 'icon-dashboard',
      type: 'M',
      affix: true
    },
    component: () => import('@/views/dashboard/index.vue'),
  }, {
    name: 'userCenter',
    path: '/usercenter',
    meta: {
      title: t('menus.userCenter'),
      icon: 'icon-user',
      type: 'M',
    },
    component: () => import('@/views/userCenter/index.vue'),
  },
  //  {
  //   name: 'message',
  //   path: '/message',
  //   meta: {
  //     title: t('menus.message'),
  //     icon: 'icon-message',
  //     type: 'M',
  //   },
  //   component: () => import('@/views/userCenter/message.vue'),
  // }, 
]

export const homePage = {
  name: 'home',
  path: '/home',
  meta: { title: t('menus.dashboard'), icon: 'icon-home', hidden: false, type: 'M' }
}

export default homePageRoutes