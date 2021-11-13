<template>
  <v-card class="pa-4">
    <div class="d-flex align-end">
        <v-skeleton-loader
          type="image"
          width="256"
          height="40"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="ml-2"
          type="image"
          width="200"
          height="29"
        />
    </div>
    <v-skeleton-loader
      class="mt-1"
      type="image"
      width="400"
      height="24"
    />
    <div class="d-flex mt-2">
      <v-skeleton-loader
        class="mr-4"
        type="image"
        width="120"
        height="24"
      />
      <v-skeleton-loader
        class="mr-4"
        type="image"
        width="120"
        height="24"
      />
      <v-skeleton-loader
        type="image"
        width="120"
        height="24"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'WeatherInfoPreloader'
}
</script>
