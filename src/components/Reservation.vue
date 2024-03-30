<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="7">
        <v-row>
          <v-col class="col-12 col-md-6 col-xl-4" v-for="category in categories" :key="category.id">
            <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined rounded="30">
              <v-col cols="12" style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;">
                <div class="title-section" style="text-align: center;">{{ category.group }} | {{ category.description }}</div>
              </v-col>
              <v-col>
                <v-carousel style="height: 170px;" :continuous="true" show-arrows-on-hover hide-delimiter-background delimiter-icon="mdi-circle" cycle>
                  <v-carousel-item v-for="vehicle in category.vehicles" :key="vehicle.id">
                    <v-img :src="vehicle.image"></v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col cols="12" style="text-align: center;">
                <v-col cols="12" style="text-align: center;">Sua reserva garante um dos modelos de carro acima, estando sujeito à disponibilidade da agência.</v-col>
                <v-col>A partir de</v-col>
                <!-- Adicione a lógica para calcular o preço do veículo -->
                <v-col class="price-value">R$ /dia</v-col>
                <v-col>*Proteções e taxa de aluguel (12%) não inclusas neste valor.</v-col>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { CategoryService } from '../services/categoryService';
import Category from '../models/category';

export default Vue.extend({
  name: 'reservations',

  data() {
    return {
      categories: [] as Category[],
    };
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    async fetchCategories() {
      try {
        const response = await CategoryService.getCategoriesAndVehicles();
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
});
</script>

<style scoped>
</style>
