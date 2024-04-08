<template>
  <v-container fluid>
    <h1>Veículos</h1>

    <v-card>
      <v-card-title>Cadastrar Veículo</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createVehicle" enctype="multipart/form-data">
          <v-row cols="12">
            <v-col cols="2">
              <v-text-field v-model="newVehicle.name" label="Nome do Veículo" outlined clearable dense
                required></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="newVehicle.model" label="Modelo do Veículo" outlined clearable dense
                required></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select density="comfortable" v-model="newVehicle.categoryId" :items="categories" item-value="id"
                item-text="group" label="Categoria do Veículo" placeholder="Selecione" clearable outlined dense
                required></v-select>
            </v-col>
            <v-col cols="2" style="color: white;">
              <v-btn type="submit" color="primary">Cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-card-title class="mb-0 pb-0">Lista de Veículos</v-card-title>
        <v-row>
          <v-col cols="12">
            <v-card outlined class="my-0 py-0">
              <v-list-item>
                <v-list-item-content class="my-0 py-0">
                  <v-col cols="2" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Nome</v-chip></v-col>
                  <v-col cols="2" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Descrição</v-chip></v-col>
                  <v-col cols="2" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Categoria</v-chip></v-col>
                  <v-col cols="4" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Ações</v-chip></v-col>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" class="my-0 py-0">
            <v-card outlined class="my-0 py-0">
              <v-list-item>
                <v-list-item-content class="my-0 py-0">
                  <v-col cols="2" class="my-0 py-0"><span>{{ vehicle.name }}</span></v-col>
                  <v-col cols="2" class="my-0 py-0"><span>{{ vehicle.model }}</span></v-col>
                  <v-col cols="2" class="my-0 py-0"><span>{{ getCategoryName(vehicle.categoryId) }}</span></v-col>
                  <v-col class="my-0 py-0">
                    <v-btn outlined @click="updateVehicle(vehicle)" color="primary" class="mx-1">Editar</v-btn>
                    <v-btn @click="confirmDelete(vehicle.id)" color="error">Excluir</v-btn>
                  </v-col>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="showEditDialog" max-width="1000px" max-height="600px">
      <v-card>
        <v-card-title>Editar Veículo</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUpdatedVehicle">
            <v-row cols="12" class="ma-4">
              <v-col cols="3">
                <v-text-field v-model="editVehicle.name" label="Nome do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editVehicle.model" label="Modelo do Veículo" outlined dense
                  required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-autocomplete v-model="editVehicle.categoryId" :items="categories" item-value="id" item-text="group"
                  label="Categoria do Veículo" outlined dense clearable required></v-autocomplete>
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Swal from 'sweetalert2';
import { VehicleService } from '../services/vehicleServices';
import { CategoryService } from '../services/categoryService';
import Category from '../models/category';
import Vehicle from '../models/vehicle';

export default Vue.extend({
  name: 'Vehicles',

  data() {
    return {
      newVehicle: {
        name: '',
        model: '',
        categoryId: 0,
      },
      vehicles: [] as Vehicle[],
      categories: [] as Category[],
      showCategoryDialog: false,
      newCategory: {
        group: '',
        description: '',
      },

      showEditDialog: false,
      editVehicle: {} as Vehicle,
      selectedImage: null,
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

    async updateVehicle(vehicle: Vehicle) {
      this.editVehicle = { ...vehicle };
      this.showEditDialog = true;
    },

    async saveUpdatedVehicle() {
      try {
        await VehicleService.updateVehicle(this.editVehicle.id, this.editVehicle);
        this.showEditDialog = false;
        await Swal.fire('Sucesso!', 'Veículo atualizado com sucesso!', 'success');
        this.fetchVehicles();
      } catch (error) {
        console.error('Error updating vehicle:', error);
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
        if (this.newVehicle.name && this.newVehicle.model && this.newVehicle.categoryId) {

          const category = this.categories.find(option => option.id === this.newVehicle.categoryId);

          if (!category) {
            console.error('Error: Catrgoria selecionada não encontrada.');
            return;
          }

          const newVehicle: Vehicle = {
            id: 0,
            name: this.newVehicle.name,
            model: this.newVehicle.model,
            categoryId: category.id,
            customerId: 0,
            registerDate: new Date(),
            isActive: true
          };

          const response = await VehicleService.createVehicle(newVehicle);

          if (response.status === 201) {
            console.log('Veículo criado com sucesso:', response.data);
            this.newVehicle = { name: '', model: '', categoryId: 0 };
            this.fetchVehicles();
            await Swal.fire('Sucesso!', 'Veículo criado com sucesso!', 'success');
          } else {
            console.error('Erro ao criar veículo:', response.statusText);
          }
        }
        else {
          await Swal.fire('Aviso!', 'Todos os campos devem ser preenchidos!', 'warning');
          return true;
        }
      } catch (error) {
        console.error('Error creating vehicle:', error);
      }
    },

    async deleteVehicle(id: number) {
      try {
        await VehicleService.deleteVehicle(id);
        this.fetchVehicles();
        await Swal.fire('Sucesso!', 'Veículo excluído com sucesso!', 'success');
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    },

    async confirmDelete(id: number) {
      try {
        const confirmed = await Swal.fire({
          title: 'Tem certeza que deseja excluir este veículo?',
          text: 'Esta ação não poderá ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f44336',
          cancelButtonColor: '#f98038',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
          await this.deleteVehicle(id);
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    },

    getCategoryName(categoryId: number) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.group : '';
    },

    async createCategory() {
      try {
        const newCategory: Category = {
          id: 0,
          group: this.newCategory.group,
          description: this.newCategory.description,
          price: 0,
          totalPrice: 0,
          vehicles: []
        };

        await CategoryService.createCategory(newCategory);

        this.newCategory.group = '';
        this.newCategory.description = '';
        this.showCategoryDialog = false;
        this.fetchCategories();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },
  },
});
</script>

<style scoped></style>
