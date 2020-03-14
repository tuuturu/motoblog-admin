import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import posts from '@/feature/posts/store'
import trips from '@/feature/trips/store'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		posts,
		trips
	}
})
