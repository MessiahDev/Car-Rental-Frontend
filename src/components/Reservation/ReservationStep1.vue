<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="7" md="6" xs="6" lg="7" sm="6">
        <v-row v-if="e1 <= 1 || e1 == 2">
          <v-col cols="4">
            <v-text-field v-model="startDate" label="Data de retirada" type="date" dense clearable
              outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="endDate" label="Data de entrega" type="date" dense clearable outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12 col-md-6 col-xl-4" v-for="category in categories" :key="category.id">
            <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined>
              <v-col cols="12" style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;height: 3.5rem;">
                <div class="title-section font1 fontHelvetica">{{ category.group }} | {{ category.description }}</div>
              </v-col>
              <v-col>
                <v-carousel style="height: 170px;" :continuous="true" show-arrows-on-hover hide-delimiters
                  delimiter-icon="mdi-circle" cycle>
                  <v-carousel-item v-for="vehicle in category.vehicles" :key="vehicle.id">
                    <v-img :src="vehicle.image"></v-img>
                  </v-carousel-item>
                </v-carousel>
                <v-row>
                  <v-col  style="text-align: center;" class="font2 fontHelvetica">{{ formatVehicleList(category) }}</v-col>
                </v-row>
              </v-col>
              <v-col cols="12" style="text-align: center;">
                <v-col cols="12" style="text-align: center;" class="fontSmall fontHelvetica">Sua reserva garante um dos
                  modelos de carro acima, estando sujeito à disponibilidade da agência.</v-col>
                <v-col style="font-size: 13px">A partir de</v-col>
                <v-col class="ma-1 pa-0 fontHelvetica" style="font-size: 13px;">R$ <span
                    style="font-size: 20px;color: #f98038;">{{ money(category.price) }}</span>/dia</v-col>
                <v-col class="fontSmall fontHelvetica">*Proteções e taxa de aluguel (12%) não inclusas neste
                  valor.</v-col>
              </v-col>
              <v-row class="mx-4 my-2">
                <v-col><v-btn color="primary" style="width: 100%;height: 3rem"
                    @click="e1 = 2, selectedCategory = category, calculateDays(), sendCategory()">ESCOLHER
                    GRUPO</v-btn></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Category from '@/models/category';
//import { CategoryService } from '@/services/categoryService';
import categoriesAndVehiclesData from '../../dataBaseDemo/categoriesAndVehicles.json';

export default Vue.extend({
  name: 'ReservationStep1',
  data() {
    return {
      e1: 1,
      categories: [] as Category[],
      selectedCategory: new Category,
      groupChosen: false,
      startDate: new Date(),
      endDate: new Date(),
      days: 0,
      pTotalAvarias: false,
      pVidrosPneus: false,
      condutorAdcional: false,
      condutorJovem: false,
      limpezaGarantida: false,

    }
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    fetchCategories() {
      try {
        //const response = await CategoryService.getCategoriesAndVehicles();
        const response = categoriesAndVehiclesData
        this.categories = response;
        this.groupChosen = false;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    formatVehicleList(category: Category) {
      const vehicleModels = category.vehicles.slice(0, 3).map((v: { model: any; }) => v.model).join(', ');
      const orSimilar = category.vehicles.length > 0 ? ', ou similar*' : '';
      return vehicleModels + orSimilar;
    },

    calculateDays() {
      const date1 = new Date(this.startDate);
      const date2 = new Date(this.endDate);

      const differenceMs = Math.abs(date2.getTime() - date1.getTime());
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      this.days = differenceDays >= 1 ? differenceDays : 1;

      return this.days;
    },

    sendCategory() {
      this.$emit('sendCategory', this.selectedCategory, this.startDate, this.endDate, this.e1);
    },

    money(value: number) {
      return value.toFixed(2).replace(".", ",");
    },
  }
});
</script>

<style scoped>
.font1 {
  font-weight: bold;
  font-size: 0.9rem;
  color: #f98038;
  letter-spacing: 0.01rem;
  line-height: 1.2rem;
  text-align: center;
}

.font2 {
  font-weight: bold;
  font-size: 0.9rem;
  color: #4a4a4a;
  letter-spacing: 0.01rem;
  line-height: 1.2rem;
  margin-top: 3rem;
  height: 3rem;
}

.fontSmall {
  font-size: 12px;
  color: #4a4a4a;
  margin: 0px;
  padding: 0px;
}

.fontHelvetica {
  font-family: Helvetica, Helvetica, Arial, sans-serif;
}
</style>
