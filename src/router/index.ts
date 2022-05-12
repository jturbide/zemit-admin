import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { NavigationGuardNext } from 'vue-router/types/router';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import ForgotPassword from '@/views/Auth/ForgotPassword.vue';
import ResetPassword from '@/views/Auth/ResetPassword.vue';
import Identity from '@/zemit/core/identity';
import ErrorView from '@/views/ErrorView.vue';
import HomeView from '@/views/Admin/HomeView.vue';
import DashboardView from '@/views/Admin/DashboardView.vue';

import UserList from '@/views/Admin/List/UserList.vue';
import RoleList from '@/views/Admin/List/RoleList.vue';
import GroupList from '@/views/Admin/List/GroupList.vue';
import TypeList from '@/views/Admin/List/TypeList.vue';
import LangList from '@/views/Admin/List/LangList.vue';
import SiteList from '@/views/Admin/List/SiteList.vue';

import TranslateList from '@/views/Admin/List/TranslateList.vue';
import TemplateList from '@/views/Admin/List/TemplateList.vue';
import SettingList from '@/views/Admin/List/SettingList.vue';
import EmailList from '@/views/Admin/List/EmailList.vue';
import FileList from '@/views/Admin/List/FileList.vue';
import LogList from '@/views/Admin/List/LogList.vue';
import AuditList from '@/views/Admin/List/AuditList.vue';
import MigrationList from '@/views/Admin/List/MigrationList.vue';
import BackupList from '@/views/Admin/List/BackupList.vue';

import UserForm from '@/views/Admin/Form/UserForm.vue';
import RoleForm from '@/views/Admin/Form/RoleForm.vue';
import LangForm from '@/views/Admin/Form/LangForm.vue';
import SiteForm from '@/views/Admin/Form/SiteForm.vue';

Vue.use(VueRouter);

export const privateGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!Identity.isLoggedIn()) {
    next({name: 'login'});
  }
  return next();
};

export const publicGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (Identity.isLoggedIn()) {
    return next({name: 'dashboard'});
  }
  return next();
};

const routes: Array<RouteConfig> = [
  { path: '*', redirect: '/error' },
  { path: '/error', component: ErrorView },

  { path: '/login', name: 'login', component: Login, beforeEnter: publicGuard },
  { path: '/register', name: 'register', component: Register, beforeEnter: publicGuard },
  { path: '/password/forgot', name: 'forgotPassword', component: ForgotPassword, beforeEnter: publicGuard },
  { path: '/password/reset/:token', name: 'resetPassword', component: ResetPassword, beforeEnter: publicGuard },

  { path: '/', name: 'Home', component: HomeView, beforeEnter: privateGuard },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, beforeEnter: privateGuard },

  // List Views
  { path: '/user/list', name: 'UserList', component: UserList, beforeEnter: privateGuard },
  { path: '/role/list', name: 'RoleList', component: RoleList, beforeEnter: privateGuard },
  { path: '/group/list', name: 'GroupList', component: GroupList, beforeEnter: privateGuard },
  { path: '/type/list', name: 'TypeList', component: TypeList, beforeEnter: privateGuard },
  { path: '/lang/list', name: 'LangList', component: LangList, beforeEnter: privateGuard },
  { path: '/site/list', name: 'SiteList', component: SiteList, beforeEnter: privateGuard },
  { path: '/translate/list', name: 'TranslateList', component: TranslateList, beforeEnter: privateGuard },
  { path: '/template/list', name: 'TemplateList', component: TemplateList, beforeEnter: privateGuard },
  { path: '/setting/list', name: 'SettingList', component: SettingList, beforeEnter: privateGuard },
  { path: '/email/list', name: 'EmailList', component: EmailList, beforeEnter: privateGuard },
  { path: '/file/list', name: 'FileList', component: FileList, beforeEnter: privateGuard },
  { path: '/log/list', name: 'LogList', component: LogList, beforeEnter: privateGuard },
  { path: '/audit/list', name: 'AuditList', component: AuditList, beforeEnter: privateGuard },
  { path: '/backup/list', name: 'BackupList', component: BackupList, beforeEnter: privateGuard },
  { path: '/migration/list', name: 'MigrationList', component: MigrationList, beforeEnter: privateGuard },

  // Form Views
  { path: '/user/:id?', name: 'UserForm', component: UserForm, beforeEnter: privateGuard },
  { path: '/role/:id?', name: 'RoleForm', component: RoleForm, beforeEnter: privateGuard },
  { path: '/lang/:id?', name: 'LangForm', component: LangForm, beforeEnter: privateGuard },
  { path: '/site/:id?', name: 'SiteForm', component: SiteForm, beforeEnter: privateGuard },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
