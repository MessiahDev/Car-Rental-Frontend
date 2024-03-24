<template>
  <Customers />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Customers from '../components/Customer.vue'

  export default Vue.extend({
    name: 'customers',

    components: {
      Customers,
    },
  })
</script>
