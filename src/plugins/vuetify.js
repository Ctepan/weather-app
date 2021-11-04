import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ru from '@/locales/ru'
import en from '@/locales/en'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ru, en },
    current: 'ru'
  }
})
