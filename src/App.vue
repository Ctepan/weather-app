<template>
  <v-app class="app">
    <v-app-bar
      color="primary"
      app
      dark
    >
      <div class="text-h4">WeatherApp</div>
      <v-spacer/>
      <LocaleSelect v-model="$vuetify.lang.current"/>
    </v-app-bar>
    <v-main class="app__main mx-auto">
      <WeatherApp class="pt-10"/>
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

<style lang="scss">
.app {
  &__main {
    width: 960px;
  }
}
</style>
