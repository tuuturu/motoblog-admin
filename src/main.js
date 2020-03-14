import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import router from './router'
import store from './store'

import authMiddleware from '@/plugins/authMiddleware'

Vue.config.productionTip = false

Vue.use(authMiddleware)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
