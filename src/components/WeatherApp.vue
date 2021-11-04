<template>
  <div class="weather-app d-flex pt-10 mx-auto">
    <div class="weather-app__search flex-grow-1">
      <v-form
        ref="form"
        class="d-flex flex-grow-1"
        @submit.prevent="handleSubmit"
      >
        <v-text-field
          v-model="searchQuery"
          outlined
          dense
          :rules="[requiredRule]"
          :validate-on-blur="false"
        ></v-text-field>

        <v-btn
          class="ml-6"
          type="submit"
        >Узнать погоду</v-btn>
      </v-form>
      {{ weather }}
    </div>
    <div class="weather-app__search-history flex-shrink-0 ml-5">
      <v-list class="pa-0">
        <v-list-item
          v-for="searchItem in searchHistory"
          :key="searchItem.date"
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

export default {
  name: 'WeatherApp',
  data() {
    return {
      requiredRule: x => (typeof x === 'string' && x.length > 0) || 'Введите город',
      weather: null,
      searchQuery: '',
      searchHistory: this.getSearchHistory()
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.weather = await Weather.get(this.searchQuery)
      this.addToSearchHistory(this.searchQuery)
    },
    handleSearchItemClick(value) {
      this.searchQuery = value
    },
    addToSearchHistory(searchQuery) {
      const searchItem = {
        query: searchQuery,
        date: new Date()
      }

      this.searchHistory.push(searchItem)
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
  width: 960px;

  &__search {

  }

  &__search-history {
    width: 300px;
  }
}
</style>
