import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/style/common.scss';

Vue.config.productionTip = false
Vue.prototype.siteid = 6;

import { Toast } from 'vant';

new Vue({
    router,
    Toast,
    store,
    render: h => h(App)
}).$mount('#app')
