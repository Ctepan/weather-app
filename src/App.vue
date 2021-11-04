<template>
  <v-app>
    <v-app-bar
      color="primary"
      app
      dark
    >
      <div class="text-h4">WeatherApp</div>
      <v-spacer/>
      <LocaleSelect v-model="$vuetify.lang.current"/>
    </v-app-bar>
    <v-main>
      <WeatherApp/>
    </v-main>
  </v-app>
</template>

<script>
import WeatherApp from '@/components/WeatherApp'
import LocaleSelect from './components/LocaleSelect'

export default {
  name: 'App',
  components: {
    LocaleSelect,
    WeatherApp
  }
}
</script>
