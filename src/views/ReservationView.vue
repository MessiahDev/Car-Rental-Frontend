<template>
    <Reservation />
  </template>
  
  <script lang="ts">
    import Vue from 'vue'
    import Reservation from '../components/Reservation.vue'
  
    export default Vue.extend({
      name: 'reservations',
  
      components: {
        Reservation,
      },
    })
  </script>