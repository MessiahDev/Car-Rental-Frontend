<template>
    <v-stepper v-model="e1" alt-labels>
      <v-container fluid>
        <v-row justify="center" class="mx-3">
          <v-col cols="6" xs="6" lg="7">
            <v-row v-if="e1 <= 1">
                <v-col cols="6">
                  <v-text-field v-model="startDate" label="Data de retirada" type="date" dense clearable outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="startTime" label="Hora" type="time" dense clearable outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="endDate" label="Data de entrega" type="date" dense clearable outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="endTime" label="Hora" type="time" dense clearable outlined></v-text-field>
                </v-col>
            </v-row>
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
            <v-col cols="7" md="6" xs="6" lg="7" sm="6">
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
                      <v-col class="ma-1 pa-0 fontHelvetica" style="font-size: 13px;">R$ <span style="font-size: 20px;color: #f98038;">{{ money(category.price) }}</span> /dia</v-col>
                      <v-col class="fontSmall fontHelvetica">*Proteções e taxa de aluguel (12%) não inclusas neste valor.</v-col>
                    </v-col>
                    <v-row class="mx-4 my-2">
                      <v-col><v-btn color="primary" style="width: 100%;height: 3rem" @click="e1 = 2,selectedCategory = category, clearAdditionalOptions()">ESCOLHER GRUPO</v-btn></v-col>
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
                      <v-card>
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="1" style="align-items: center;align-content: center;"><v-icon color="#f98038">mdi-shield-half-full</v-icon></v-col>
                          <v-col cols="8" align-self="center" class="pa-0 ma-0 fontProtecao fontHelvetica">Proteção Total Avarias</v-col>
                          <v-col cols="2" class="pa-0 ma-0 fontHelvética" style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$ 35,95 / dia</v-col>
                          <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox v-model="additionalOptions.pTotalAvarias"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Para você ter a tranquilidade total, vá de Proteção Total Avarias! Com esta proteção adicional a proteção do carro e ao seguro de terceiros quando contratado, você conta com a cobertura do carro, vidros e pneus, e ainda tem 100% de isenção dos custos pré fixados de limite de danos em caso de acidente.</v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-card>
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="1" style="align-items: center;align-content: center;"><v-icon color="#f98038">mdi-car-estate</v-icon></v-col>
                          <v-col cols="8" align-self="center" class="pa-0 ma-0 fontProtecao fontHelvetica">Proteção de Vidros Premium e Pneus</v-col>
                          <v-col cols="2" class="pa-0 ma-0 fontHelvética" style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$ 14,95 / dia</v-col>
                          <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox v-model="additionalOptions.pVidrosPneus"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Essa proteção te deixa seguro com relação a danos aos vidros laterais, para-brisas, vidro traseiro, retrovisores, faróis, lanternas e/ou pneus do veículo segurado. Dessa forma, se um desses itens sofrer avarias, você tem isenção e não paga nada. Não há cobertura para roubo ou furto bem como para terceiros.</v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-card>
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="1" style="align-items: center;align-content: center;"><v-icon color="#f98038">mdi-steering</v-icon></v-col>
                          <v-col cols="8" align-self="center" class="pa-0 ma-0 fontProtecao fontHelvetica">Condutor Adicional Ilimitado</v-col>
                          <v-col cols="2" class="pa-0 ma-0 fontHelvética" style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$ 19,95 / dia</v-col>
                          <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox v-model="additionalOptions.condutorAdcional"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Vai precisar que outros motoristas conduzam o veículo? Com o Condutor Adicional Ilimitado, outros condutores habilitados e indicados por você em seu contrato, podem aproveitar a experiência com você</v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-card>
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="1" style="align-items: center;align-content: center;"><v-icon color="#f98038">mdi-baby-buggy</v-icon></v-col>
                          <v-col cols="8" align-self="center" class="pa-0 ma-0 fontProtecao fontHelvetica">Condutor Jovem</v-col>
                          <v-col cols="2" class="pa-0 ma-0 fontHelvética" style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$ 34,95 / dia</v-col>
                          <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox v-model="additionalOptions.condutorJovem"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Se você tem entre 18 e 20 anos adicione para fazer sua reserva.</v-col>
                        </v-row>
                      </v-card>
                    </v-col>                    
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-card>
                        <v-row class="ma-0" style="border-radius: 10px;" outlined>
                          <v-col cols="1" style="align-items: center;align-content: center;"><v-icon color="#f98038">mdi-broom</v-icon></v-col>
                          <v-col cols="8" align-self="center" class="pa-0 ma-0 fontProtecao fontHelvetica">Limpeza Garantida</v-col>
                          <v-col cols="2" class="pa-0 ma-0 d-flex justify-center align-center fontHelvética" style="font-size: large;color: #f98038;">R$ 39,95</v-col>
                          <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox v-model="additionalOptions.limpezaGarantida"></v-checkbox></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                          <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Adquira a Limpeza Garantida para ter mais praticidade na sua locação, e não se preocupe em lavar o carro para a devolução. Mas lembre-se, em caso de sujeira excessiva poderá ser necessário realizar uma lavagem especial.</v-col>
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
                      <v-col class="ma-1 pa-0 fontHelvetica" style="font-size: 13px;">R$ <span style="font-size: 20px;color: #f98038;">{{ money(selectedCategory.price) }}</span> /dia</v-col>
                      <v-col class="fontSmall">*Proteções e taxa de aluguel (12%) não inclusas neste valor.</v-col>
                    </v-col>
                  </v-card>
                  <v-row class="cardPrice4 fontHelvética">
                    <v-col cols="8">
                      Diária {{ days }}x {{ money(selectedCategory.price) }}
                    </v-col>
                    <v-col cols="4" class="fontHelvetica">
                      {{ Number(totalDaysValue()).toMoeda(true) }}
                    </v-col>
                    <v-col cols="8" class="fontHelvetica">
                      Taxa de aluguel (12%)
                    </v-col>
                    <v-col cols="4">
                      {{ Number(tax).toMoeda(true) }}
                    </v-col>
                  </v-row>
                  <v-row class="cardPrice3">
                    <v-col cols="12" class="cardPrice2 fontHelvetica">
                      Valor Total Previsto
                    </v-col>
                    <v-col cols="12" class="cardPrice fontHelvetica">
                      {{ Number(calculatedPrice()).toMoeda(true) }}
                    </v-col>
                  </v-row>
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
      startDate: new Date(),
      endDate: new Date(),
      startTime: Date(),
      endTime: Date(),
      days: 0,
      tax: 0.12,

      additionalOptions: {
        pTotalAvarias: false,
        pVidrosPneus: false,
        condutorAdcional: false,
        condutorJovem: false,
        limpezaGarantida: false
      },
    };
  },

  mounted() {
    this.fetchCategories();
  },

  computed: {
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

    calculatedPrice() {
      this.tax = this.selectedCategory.price * 0.12;
      let value = this.selectedCategory.price + this.tax;
      
      const date1 = new Date(this.startDate);
      const date2 = new Date(this.endDate);
      
      const differenceMs = Math.abs(date2.getTime() - date1.getTime());
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      this.days = differenceDays >= 1 ? differenceDays : 1;
      value *= differenceDays >= 1 ? differenceDays : 1;
      
      if (this.additionalOptions.pTotalAvarias == true) value += (differenceDays >= 1 ? (35.95 * differenceDays) : 35.95);
      if (this.additionalOptions.pVidrosPneus == true) value += (differenceDays >= 1 ? (14.95 * differenceDays) : 14.95);
      if (this.additionalOptions.condutorAdcional == true) value += (differenceDays >= 1 ? (19.95 * differenceDays) : 19.95);
      if (this.additionalOptions.condutorJovem == true) value += (differenceDays >= 1 ? (34.95 * differenceDays) : 34.95);
      if (this.additionalOptions.limpezaGarantida == true) value += 39.95;

      return value.toFixed(2);
    },

    clearAdditionalOptions() {
      this.additionalOptions.pTotalAvarias = false,
      this.additionalOptions.pVidrosPneus = false,
      this.additionalOptions.condutorAdcional = false,
      this.additionalOptions.condutorJovem = false,
      this.additionalOptions.limpezaGarantida = false
    },

    totalDaysValue() {
      return this.days * this.selectedCategory.price;
    },

    money(value: number) {
      const money = value.toString();
      return money.replace(".",",");
    }
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
.cardPrice{
  text-align: right;
  align-content: center;
  font-weight: bold;
  font-size: xx-large;
  color: white;
  margin: 0px;
  padding: 0px;
}
.cardPrice2{
  text-align: right;
  align-content: right;
  color: white;
  margin: 0px;
  padding: 10px;
}
.cardPrice3{
  background: #f98038;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0px;
  padding: 10px;
  height: 8rem;
}
.cardPrice4{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #d6d6d6;
  color: #4a4a4a;
  margin: 0px;
  margin-top: 1rem;
  padding: 10px;
  height: 8rem;
}
</style>
