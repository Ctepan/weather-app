<template>
  <div class="weather-app d-flex pt-10">
    <div class="weather-app__search flex-grow-1">
      <WeatherSearch
        v-model="searchQuery"
        :valid.sync="isQueryValid"
        @submit="handleSubmit"
      />
      <div v-if="weather === 'not_found'">
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
      <v-list class="pa-0">
        <v-list-item
          v-for="searchItem in searchHistory"
          :key="String(searchItem.date)"
          @click="handleSearchItemClick(searchItem.query)"
        >
          {{ searchItem.query }}
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { Weather } from '@/services/weather'
import WeatherInfo from './WeatherInfo'
import WeatherSearch from './WeatherSearch'

export default {
  name: 'WeatherApp',
  components: {
    WeatherInfo,
    WeatherSearch
  },
  props: {
    lang: {
      type: String,
      default: 'ru'
    }
  },
  data() {
    return {
      weather: null,
      isQueryValid: false,
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
    lang() {
      this.handleSubmit()
    }
  },
  created() {
    this.searchHistory = this.getSearchHistory()
  },
  methods: {
    handleSubmit() {
      if (!this.isQueryValid) {
        return
      }

      this.fetchWeather()
    },
    async fetchWeather() {
      this.weather = await Weather.get(this.searchQuery, { lang: this.lang })

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
