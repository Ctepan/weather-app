<template>
  <v-app>
    <v-main>
      <WeatherApp/>
    </v-main>
  </v-app>
</template>

<script>
import WeatherApp from '@/components/WeatherApp'

export default {
  name: 'App',
  components: {
    WeatherApp
  }
}
</script>
