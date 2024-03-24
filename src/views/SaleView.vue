<template>
    <Sales />
  </template>
  
  <script lang="ts">
    import Vue from 'vue'
    import Sales from '../components/Sale.vue'
  
    export default Vue.extend({
      name: 'sales',
  
      components: {
        Sales,
      },
    })
  </script>