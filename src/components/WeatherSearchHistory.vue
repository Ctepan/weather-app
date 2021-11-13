<template>
  <v-list class="pa-0">
    <v-list-item
      :disabled="locked"
      v-for="searchItem in searchItems"
      :key="String(searchItem.date)"
      @click="$emit('input', searchItem.query)"
    >
      {{ searchItem.query }}
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'WeatherSearchHistory',
  props: {
    searchItems: {
      type: Array,
      default: () => []
    },
    locked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
