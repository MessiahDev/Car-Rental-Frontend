<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(card, index) in cards" :key="index">
        <v-card class="pa-4" outlined>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
          <v-card-text class="text-h5">{{ card.value }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { VehicleService } from '../services/vehicleServices'
import Vehicle from '../models/vehicle'

export default Vue.extend({
  name: 'Dashboard',

  data() {
    return {
      cards: [
        { title: 'Total de Veículos', subtitle: 'Disponíveis', value: '' },
        { title: 'Total de Clientes', subtitle: 'Ativos', value: '50' },
        { title: 'Total de Reservas', subtitle: 'Ativas', value: '20' },
        { title: 'Total de Vendas', subtitle: 'Realizadas', value: '30' },
      ],

      vehicles: 0,
    };
  },
  mounted() {
    this.fetchVehicles();
  },

  methods: {
    async fetchVehicles() {
      try {
        const response = await VehicleService.getVehicleCount();
        this.vehicles = response.data;
        this.cards[0].value = this.vehicles.toString(); // Atualize o valor do card
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    },
    // Outros métodos para manipular os dados dos veículos...
  },
});
</script>

<style scoped>
.text-h5 {
  font-size: 1.25rem;
}
</style>
