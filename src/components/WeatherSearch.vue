<template>
  <v-form
    ref="form"
    class="d-flex flex-grow-1"
    @submit.prevent="handleSubmit"
  >
    <v-text-field
      v-model.trim="proxyValue"
      :rules="rules"
      :readonly="locked"
      outlined
      dense
    >
      <template #message="{ message }">
        {{ $vuetify.lang.t(message) }}
      </template>
    </v-text-field>

    <v-btn
      class="ml-6"
      type="submit"
      :disabled="locked"
    >{{ $vuetify.lang.t('$vuetify.weather.submit') }}</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'WeatherSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    valid: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: []
    }
  },
  computed: {
    proxyValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.validate()
      }
    }
  },
  watch: {
    value: {
      handler: function() {
        this.validate()
      }
    }
  },
  created () {
    this.rules = [
      x => (typeof x === 'string' && x.trim().length > 0) || '$vuetify.weather.searchRequired'
    ]
  },
  methods: {
    handleSubmit() {
      this.validate()
      this.$emit('submit', this.proxyValue)
    },
    validate() {
      this.$emit('update:valid', this.$refs.form.validate())
    }
  }
}
</script>
