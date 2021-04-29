import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader.vue'
import tooltip from '@/directives/tooltip.directive'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(titlePlugin)
Vue.component('paginate', Paginate)
Vue.component('loader', Loader)
Vue.directive('tooltip', tooltip)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)

firebase.initializeApp({
  apiKey: 'AIzaSyDw556daqV1BD3RvqLzgmSem87PsW_MW0w',
  authDomain: 'joes-crm.firebaseapp.com',
  projectId: 'joes-crm',
  storageBucket: 'joes-crm.appspot.com',
  messagingSenderId: '183959119676',
  appId: '1:183959119676:web:de7edefec4063fa5216039',
  measurementId: 'G-9K156MB6PR'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
