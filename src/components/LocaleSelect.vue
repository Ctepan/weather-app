<template>
  <v-select
    :items="locales"
    :value="value"
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

</style>
