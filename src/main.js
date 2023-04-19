import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
//按钮权限判断
import hasPermission from '@/permission/index'
Vue.prototype.hasPerm = hasPermission;
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import '@/icons' // icon
import '@/permission' // permission control
import resetForm from '@/utils/resetForm'
Vue.prototype.$resetForm = resetForm;

//信息提示框
import myconfirm from '@/utils/myconfirm'
Vue.prototype.$myconfirm = myconfirm;

//对象快速复制
import objCoppy from '@/utils/objCoppy'
Vue.prototype.$objCoppy = objCoppy;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
