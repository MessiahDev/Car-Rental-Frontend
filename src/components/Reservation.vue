<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="7">
                <v-row justify="center">
                    <v-col class="col-12 col-md-6 col-xl-4 selecao-grupo-box ng-star-inserted" xs="12" v-for="(car, index) in cars" :key="index">
                    <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined rounded="30">
                        <v-col cols="12" style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;">
                        <div class="title-section" style="text-align: center;">{{ car.title }}</div>
                        </v-col>
                        <v-carousel class="px-6 mt-7" style="height: 200px;" hide-delimiters>
                        <v-carousel-item v-for="(image, i) in car.images" :key="i">
                            <img :src="image" alt="Car Image">
                        </v-carousel-item>
                        </v-carousel>
                        <div class="info-section">{{ car.info }}</div>
                        <div class="price-section">
                        <div>Sua reserva garante um dos modelos de carro acima, estando sujeito à disponibilidade da agência.</div>
                        <div class="price">A partir de</div>
                        <div class="price-value">R$ {{ car.price }}/dia</div>
                        <div>*Proteções e taxa de aluguel (12%) não inclusas neste valor.</div>
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    name: 'reservations',
  
    data() {
      return {
        cars: [
        {
            title: 'Fiat Mobi 1.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Compacto, econômico e ágil.',
            price: '175,95'
          },
          {
            title: 'Renault Kwid 1.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Espaçoso, confortável e seguro.',
            price: '185,95'
          },
          {
            title: 'Volkswagen Gol 1.6',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Robusto, confiável e versátil.',
            price: '195,95'
          },
          {
            title: 'Chevrolet Onix 1.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Confortável, tecnológico e econômico.',
            price: '205,95'
          },
          {
            title: 'Ford Ka 1.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Ágil, econômico e moderno.',
            price: '195,95'
          },
          {
            title: 'Hyundai HB20 1.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Design marcante e alta tecnologia.',
            price: '215,95'
          },
          {
            title: 'Toyota Corolla 2.0',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Conforto, segurança e sofisticação.',
            price: '265,95'
          },
          {
            title: 'Honda Civic 1.5 Turbo',
            images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
            info: 'Performance esportiva e tecnologia avançada.',
            price: '255,95'
          },
        ]
      };
    },
  });
  </script>
  
  <style scoped>
  </style>
  