import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueYouTubeEmbed from 'vue-youtube-embed'
import VuePrism from 'vue-prism'
import 'prismjs/themes/prism.css'
Vue.use(VuePrism)
Vue.use(Vuetify, {
	theme: {
		primary: '#2fbdbd'
	}
});
Vue.use(Vuesax);
Vue.use(BootstrapVue);
Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
