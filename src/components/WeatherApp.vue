<template>
  <div class="weather-app d-flex">
    <div class="weather-app__search flex-grow-1">
      <WeatherSearch
        v-model="searchQuery"
        :valid.sync="isQueryValid"
        :locked="isLoading"
        @submit="handleSubmit"
      />
      <WeatherInfoPreloader v-if="isLoading"/>
      <div v-else-if="weather === 'not_found'">
        {{ $vuetify.lang.t('$vuetify.weather.notFound') }}
      </div>
      <WeatherInfo
        v-else-if="weather"
        :place="weather.name"
        :temp="temperature"
        :wind="wind"
        :humidity="weather.main.humidity"
        :pressure="weather.main.pressure"
        :state="weather.weather[0].description"
      ></WeatherInfo>
    </div>
    <div class="weather-app__search-history flex-shrink-0 ml-5">
      <WeatherSearchHistory
        :search-items="searchHistory"
        :locked="isLoading"
        @input="handleSearchItemClick"
      />
    </div>
  </div>
</template>

<script>
import { Weather } from '@/services/weather'
import WeatherInfo from './WeatherInfo'
import WeatherSearch from './WeatherSearch'
import WeatherInfoPreloader from './WeatherInfoPreloader'
import WeatherSearchHistory from './WeatherSearchHistory'

export default {
  name: 'WeatherApp',
  components: {
    WeatherSearchHistory,
    WeatherInfoPreloader,
    WeatherInfo,
    WeatherSearch
  },
  data() {
    return {
      weather: null,
      isQueryValid: false,
      isLoading: false,
      searchQuery: '',
      searchHistory: []
    }
  },
  computed: {
    temperature() {
      return {
        value: this.weather.main.temp,
        min: this.weather.main.temp_min,
        max: this.weather.main.temp_max,
        feels: this.weather.main.feels_like
      }
    },
    wind() {
      return {
        value: this.weather.wind.speed,
        direction: this.weather.wind.deg
      }
    }
  },
  watch: {
    '$vuetify.lang.current'() {
      this.handleSubmit()
    }
  },
  created() {
    this.searchHistory = this.getSearchHistory()
  },
  methods: {
    async handleSubmit() {
      if (!this.isQueryValid) {
        return
      }

      this.isLoading = true
      await this.fetchWeather()
      this.isLoading = false
    },
    async fetchWeather() {
      this.weather = await Weather.get(this.searchQuery, { lang: this.$vuetify.lang.current })

      if (this.weather) {
        this.addToSearchHistory(this.searchQuery)
      }
    },
    handleSearchItemClick(value) {
      this.searchQuery = value
    },
    addToSearchHistory(searchQuery) {
      const searchItem = {
        query: searchQuery,
        date: new Date()
      }

      const oldSearchItemIdx = this.searchHistory.findIndex(x => x.query === searchQuery)

      if (oldSearchItemIdx !== -1) {
        this.searchHistory.splice(oldSearchItemIdx, 1)
      }

      this.searchHistory.unshift(searchItem)
      localStorage.setItem('weather_search_history', JSON.stringify(this.searchHistory))
    },
    getSearchHistory() {
      const localData = localStorage.getItem('weather_search_history')

      if (localData) {
        return JSON.parse(localData)
      }

      return []
    }
  }
}
</script>

<style scoped lang="scss">
.weather-app {
  max-height: 500px;

  &__search-history {
    width: 300px;
    overflow: auto;
  }
}
</style>
