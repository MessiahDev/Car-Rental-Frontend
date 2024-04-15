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
        <ReservationStep1
          @sendCategory="receiveCategory"
        />
      </v-stepper-content>

      <v-stepper-content step="2">
        <ReservationStep2
          :selectedCategory="selectedCategory"
          :startDate="startDate"
          :endDate="endDate"
          :e1="Number(e1)"
        />
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
import Category from '@/models/category';
import ReservationStep1 from './ReservationStep1.vue';
import ReservationStep2 from './ReservationStep2.vue';

export default Vue.extend({
  name: 'reservations',

  data() {
    return {
      e1: 1,
      selectedCategory: new Category,
      groupChosen: false,
      startDate: new Date(),
      endDate: new Date(),
    };
  },

  components: {
    ReservationStep1,
    ReservationStep2,
  },

  computed: {
  },

  methods: {
    receiveCategory(categoria: Category, startDate: Date, endDate: Date, e1: number) {
      this.selectedCategory = categoria;
      this.e1 = e1;
      this.startDate = startDate;
      this.endDate = endDate;
    },
  },
});
</script>

<style scoped>
.fontHelvetica{
  font-family: Helvetica,Helvetica,Arial,sans-serif;
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
