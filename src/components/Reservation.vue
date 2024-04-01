<template>
    <v-stepper v-model="e1" alt-labels>
      <v-container fluid>
        <v-row justify="center" class="mx-3">
          <v-col cols="6" xs="6" lg="7">
            <v-row>
              <v-col md="12">
                <v-stepper-header class="col-12" style="border-radius: 10px;">
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                    editable
                    class="fontHeader fontHelvetica"
                  >
                    Grupo de Carros
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                    :editable="groupChosen"
                    class="fontHeader fontHelvetica"
                  >
                    Tarifas e Adcionais
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    step="3"
                    :editable="groupChosen"
                    class="fontHeader fontHelvetica"
                  >
                    Concluir Reserva
                  </v-stepper-step>
                </v-stepper-header>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="7" md="6" xs="6" lg="7">
              <v-row>
                <v-col class="col-12 col-md-6 col-xl-4" v-for="category in categories" :key="category.id">
                  <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined>
                    <v-col cols="12" style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;height: 3.5rem;">
                      <div class="title-section font1 fontHelvetica">{{ category.group }} | {{ category.description }}</div>
                    </v-col>
                    <v-col>
                      <v-carousel style="height: 170px;" :continuous="true" show-arrows-on-hover hide-delimiter-background delimiter-icon="mdi-circle" cycle>
                        <v-carousel-item v-for="vehicle in category.vehicles" :key="vehicle.id">
                          <v-img :src="vehicle.image"></v-img>
                        </v-carousel-item>
                      </v-carousel>
                      <v-row>
                        <v-col style="text-align: center;" class="font2 fontHelvetica">{{ category.vehicles.slice(0, 3).map(v => v.model).join(', ') + (category.vehicles.length > 0 ? ', ou similar*' : '') }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" style="text-align: center;">
                      <v-col cols="12" style="text-align: center;" class="fontSmall fontHelvetica">Sua reserva garante um dos modelos de carro acima, estando sujeito à disponibilidade da agência.</v-col>
                      <v-col style="font-size: 13px">A partir de</v-col>
                      <v-col class="ma-1 pa-0 fontHelvetica" style="font-size: 13px;">R$ <span style="font-size: 20px;color: #f98038;">89,95</span> /dia</v-col>
                      <v-col class="fontSmall fontHelvetica">*Proteções e taxa de aluguel (12%) não inclusas neste valor.</v-col>
                    </v-col>
                    <v-row class="mx-4 my-2">
                      <v-col><v-btn color="primary" style="width: 100%;height: 3rem" @click="e1 = 2,selectedCategory = category">ESCOLHER GRUPO</v-btn></v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="7" md="6" xs="6" lg="7">
              <v-row>
                <v-col cols="8">
                  <v-row>
                    <v-col>
                      <v-card >
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="9" align-self="center" class="pa-2 ma-0 fontProtecao fontHelvetica">Proteção</v-col>
                          <v-col cols="2" class="pa-0 ma-0 fontHelvética" style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$ 35.95 / dia</v-col>
                          <v-col cols="1" class="pa-0 ma-0"><v-checkbox class="pa-0"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="10" align-self="center" class="pa-2 ma-0">Descrição</v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
                  
              <v-col class="col-12 col-md-6 col-xl-4">
                  <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined>
                    <v-col cols="12" style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;height: 3.5rem;">
                      <div class="title-section font1">{{ selectedCategory.group }} | {{ selectedCategory.description }}</div>
                    </v-col>
                    <v-col>
                      <v-carousel style="height: 170px;" :continuous="true" show-arrows-on-hover hide-delimiter-background delimiter-icon="mdi-circle" cycle>
                        <v-carousel-item v-for="vehicle in selectedCategory.vehicles" :key="vehicle.id">
                          <v-img :src="vehicle.image"></v-img>
                        </v-carousel-item>
                      </v-carousel>
                      <v-row>
                        <v-col style="text-align: center;" class="font2 fontHelvetica">{{ selectedCategory.vehicles.slice(0, 3).map(v => v.model).join(', ') + (selectedCategory.vehicles.length > 0 ? ', ou similar*' : '') }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" style="text-align: center;">
                      <v-col cols="12" style="text-align: center;" class="fontSmall">Sua reserva garante um dos modelos de carro acima, estando sujeito à disponibilidade da agência.</v-col>
                      <v-col style="font-size: 13px">A partir de</v-col>
                      <v-col class="ma-1 pa-0 fontHelvetica" style="font-size: 13px;">R$ <span style="font-size: 20px;color: #f98038;">89,95</span> /dia</v-col>
                      <v-col class="fontSmall">*Proteções e taxa de aluguel (12%) não inclusas neste valor.</v-col>
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import Vue from 'vue';
import { CategoryService } from '../services/categoryService';
import Category from '../models/category';

export default Vue.extend({
  name: 'reservations',

  data() {
    return {
      e1: 1,
      categories: [] as Category[],
      selectedCategory: new Category,
      groupChosen: false,
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
        this.groupChosen = false;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
});
</script>

<style scoped>
.font1{
  font-weight: bold;
  font-size: 0.9rem;
  color: #f98038;
  letter-spacing: 0.01rem;
  line-height: 1.2rem;
  text-align: center;
}
.font2{
  font-weight: bold;
  font-size: 0.9rem;
  color: #4a4a4a;
  letter-spacing: 0.01rem;
  line-height: 1.2rem;
  margin-top: 3rem;
  height: 3rem;
}
.fontHelvetica{
  font-family: Helvetica,Helvetica,Arial,sans-serif;
}
.fontSmall{
  font-size: 12px;
  color: #4a4a4a;
  margin: 0px;
  padding: 0px;
}
.fontHeader{
  font-size: 12px;
  color: #4a4a4a;
  text-align: center;
}
.fontProtecao{
  font-size: 1rem;
  font-weight: 700;
  color: #f98038;
  margin: 0;
}
</style>
