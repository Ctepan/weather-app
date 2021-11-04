<template>
  <v-select
    class="locale-select"
    :items="locales"
    :value="value"
    hide-details
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'LocaleSelect',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      locales: [
        {
          text: 'Русский',
          value: 'ru'
        },
        {
          text: 'English',
          value: 'en'
        }
      ]
    }
  }
}
</script>

<style scoped>
.locale-select {
  max-width: 200px;
}
</style>
