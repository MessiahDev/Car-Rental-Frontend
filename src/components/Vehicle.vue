<template>
    <v-container fluid>
      <!-- Título da página -->
      <h1>Veículos</h1>
  
      <!-- Formulário de cadastro de veículos -->
      <v-card>
        <v-card-title>Cadastrar Veículo</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createVehicle">
            <v-row cols="12">
              <v-col cols="4">
                <v-text-field v-model="newVehicle.name" label="Nome do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="newVehicle.model" label="Modelo do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select v-model="newVehicle.categoryId" :items="categories" item-value="id" item-text="name" label="Categoria do Veículo" outlined dense required></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn @click="showCategoryDialog = true" color="primary">
                  Gerenciar
                </v-btn>
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary">Cadastrar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  
      <!-- Lista de veículos -->
      <v-row>
        <v-col cols="12">
          <v-card-title>Lista de Veículos</v-card-title>
          <v-row>
            <v-col cols="12">
              <v-divider></v-divider>
              <v-row>
                <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12">
                  <v-card outlined>
                    <v-list-item>
                      <v-list-item-content>
                        <v-col><v-list-item-title>{{ vehicle.name }}</v-list-item-title></v-col>
                        <v-col><v-list-item-subtitle>Modelo: {{ vehicle.model }}</v-list-item-subtitle></v-col>
                        <v-col><v-list-item-subtitle>Categoria: {{ getCategoryName(vehicle.categoryId) }}</v-list-item-subtitle></v-col>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn @click="deleteVehicle(vehicle.id)" color="error">Excluir</v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  
      <!-- Diálogo para cadastrar categoria -->
      <v-dialog v-model="showCategoryDialog" max-width="500px">
        <v-card>
          <v-card-title>Cadastrar Categoria</v-card-title>
          <v-card-text>
            <!-- Formulário para cadastrar categoria -->
            <v-form @submit.prevent="createCategory">
              <v-row cols="12">
                <v-col cols="12">
                  <v-text-field v-model="newCategory.name" label="Nome da Categoria" outlined dense required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="newCategory.description" label="Descrição da Categoria" outlined dense></v-text-field>
                </v-col>
                <!-- Você pode adicionar mais campos conforme necessário -->
              </v-row>
              <v-btn type="submit" color="primary">Cadastrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { VehicleService } from '../services/vehicleServices';
  import { CategoryService } from '../services/categoryService';
  import  Category  from '../models/category';
  
  export default Vue.extend({
    name: 'Vehicles',
  
    data() {
      return {
        newVehicle: {
          name: '',
          model: '',
          categoryId: null,
        },
        vehicles: [] as any[],
        categories: [] as Category[],
        showCategoryDialog: false,
        newCategory: {
          name: '',
          description: '',
        },
      };
    },
  
    mounted() {
      this.fetchVehicles();
      this.fetchCategories();
    },
  
    methods: {
      async fetchVehicles() {
        try {
          const response = await VehicleService.getAllVehicles();
          this.vehicles = response.data;
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      },
  
      async fetchCategories() {
        try {
          const response = await CategoryService.getAllCategories();
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
  
      async createVehicle() {
        try {
          await VehicleService.createVehicle(this.newVehicle);
          this.newVehicle = { name: '', model: '', categoryId: null };
          this.fetchVehicles();
        } catch (error) {
          console.error('Error creating vehicle:', error);
        }
      },
  
      async deleteVehicle(id: number) {
        try {
          await VehicleService.deleteVehicle(id);
          this.fetchVehicles();
        } catch (error) {
          console.error('Error deleting vehicle:', error);
        }
      },
  
      getCategoryName(categoryId: number) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
      },
  
      async createCategory() {
        try {
          await CategoryService.createCategory(this.newCategory);
          this.newCategory = { name: '', description: '' };
          this.showCategoryDialog = false;
          this.fetchCategories();
        } catch (error) {
          console.error('Error creating category:', error);
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para esta página */
  </style>
  