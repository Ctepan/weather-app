<template>
  <v-card class="pa-4">
    <div class="headline">
      <span class="text-h4">{{ place }} {{ temp.value }}°C</span>,
      {{ state }}
    </div>
    <div class="secondary--text mt-1">
      {{ $vuetify.lang.t('$vuetify.weather.temperatureFeels') }} {{ temp.feels }}°C,
      {{ $vuetify.lang.t('$vuetify.weather.min') }} {{ temp.min }}°C,
      {{ $vuetify.lang.t('$vuetify.weather.max') }} {{ temp.max }}°C
    </div>

    <div class="d-flex flex-wrap mt-2">
      <div class="mr-2">{{ $vuetify.lang.t('$vuetify.weather.pressure') }} {{ pressure }}{{ $vuetify.lang.t('$vuetify.weather.hpa') }}</div>
      <v-divider class="mr-2" vertical/>
      <div class="mr-2">{{ $vuetify.lang.t('$vuetify.weather.humidity') }} {{ humidity }}%</div>
      <v-divider class="mr-2" vertical/>
      <div>
        {{ $vuetify.lang.t('$vuetify.weather.wind') }}
        {{ wind.value }}{{ $vuetify.lang.t('$vuetify.weather.windUnit') }}
        {{ windDirection }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'WeatherInfo',
  props: {
    place: {
      type: String,
      required: true
    },
    temp: {
      type: Object,
      required: true
    },
    pressure: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    wind: {
      type: Object,
      required: true
    }
  },
  computed: {
    windDirection() {
      const deg = this.wind.direction

      if (deg > 337.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.N')
      }
      if (deg > 292.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.NW')
      }
      if (deg > 247.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.W')
      }
      if (deg > 202.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.SW')
      }
      if (deg > 157.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.S')
      }
      if (deg > 122.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.SE')
      }
      if (deg > 67.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.E')
      }
      if (deg > 22.5) {
        return this.$vuetify.lang.t('$vuetify.weather.windDirection.NE')
      }

      return this.$vuetify.lang.t('$vuetify.weather.windDirection.N')
    }
  }
}
</script>
