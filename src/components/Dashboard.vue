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
    <v-divider class="border-opacity-100 my-16"></v-divider>
    <v-row>
      <v-col cols="6">
        <canvas id="pieChart" width="400" height="400"></canvas>
      </v-col>
      <v-col cols="6">
        <canvas id="barChart" width="400" height="400"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js/auto'
import vehicleData from '../dataBaseDemo/vehicleDB.json'

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
      barColors: [
        'rgba(255, 99, 132, 0.5)', // Rosa suave
        'rgba(255, 159, 64, 0.5)', // Laranja suave
        'rgba(75, 192, 192, 0.5)', // Verde água suave
        'rgba(153, 102, 255, 0.5)', // Roxo suave
        'rgba(255, 206, 86, 0.5)', // Amarelo suave
        'rgba(54, 162, 235, 0.5)', // Azul suave
        'rgba(231, 233, 237, 0.5)' // Cinza suave
      ],
    };
  },
  mounted() {
    this.fetchVehicles();
  },

  methods: {
    fetchVehicles() {
      try {
        const response = vehicleData.length;
        this.vehicles = response;
        this.cards[0].value = this.vehicles.toString();

        const pieChartCanvas = document.getElementById('pieChart');
        const barChartCanvas = document.getElementById('barChart');
        if (pieChartCanvas instanceof HTMLCanvasElement && barChartCanvas instanceof HTMLCanvasElement) {
          this.renderPieChart(pieChartCanvas);
          this.renderBarChart(barChartCanvas);
        } else {
          console.error('Erro: elemento pieChart ou barChart não encontrado no DOM.');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    },
    renderPieChart(canvas: HTMLCanvasElement) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Total de Veículos', 'Clientes Ativos', 'Reservas Ativas', 'Vendas Realizadas'],
            datasets: [{
              label: 'Dados',
              data: [this.cards[0].value, 50, 20, 30],
              backgroundColor: [
                'rgba(255, 159, 64)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 99, 132)',
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      } else {
        console.error('Erro ao obter contexto do canvas.');
      }
    },
    renderBarChart(canvas: HTMLCanvasElement) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const months = this.generateMonths();
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [{
              label: 'Vendas por Mês',
              data: [10, 20, 70, 40, 50],
              backgroundColor: this.barColors.slice(0, months.length),
              borderColor: this.barColors.slice(0, months.length).map(color => color.replace('0.5', '1')),
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        console.error('Erro ao obter contexto do canvas.');
      }
    },
    generateMonths() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const months = [];
      for (let i = 0; i <= currentMonth; i++) {
        const date = new Date(currentDate.getFullYear(), i, 1);
        months.push(date.toLocaleString('default', { month: 'long' }));
      }
      return months;
    },
  },
});
</script>

<style scoped>
.text-h5 {
  font-size: 1.25rem;
}
</style>
