<template>
  <Vehicles />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Vehicles from '../components/Vehicle.vue'

  export default Vue.extend({
    name: 'vehicles',

    components: {
        Vehicles,
    },
  })
</script>