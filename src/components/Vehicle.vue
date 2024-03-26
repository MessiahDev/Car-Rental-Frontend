  <template>
    <v-container fluid>

      <h1>Veículos</h1>

      <v-card>
        <v-card-title>Cadastrar Veículo</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createVehicle">
            <v-row cols="12">
              <v-col cols="3">
                <v-text-field v-model="newVehicle.name" label="Nome do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="newVehicle.model" label="Modelo do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select density="comfortable" v-model="newVehicle.status" :items="getVeicleStatusOptions" label="Status do Veículo" outlined dense required></v-select>
              </v-col>
              <v-col cols="2">
                <v-select density="comfortable" v-model="newVehicle.categoryId" :items="categories" item-value="id" item-text="name" label="Categoria do Veículo" outlined dense required></v-select>
              </v-col>
              <v-col cols="2" style="color: white;">
                <v-btn type="submit" color="primary">Cadastrar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <!-- Lista de veículos -->
      <v-row>
        <v-col cols="12">
          <v-card-title class="mb-0 pb-0">Lista de Veículos</v-card-title>
          <v-row>
            <v-col cols="12">
              <v-card outlined class="my-0 py-0">
                <v-list-item>
                  <v-list-item-content class="my-0 py-0">
                    <v-col cols="2" class="my-0 py-0"><v-chip color="white" style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Nome</v-chip></v-col>
                    <v-col cols="2" class="my-0 py-0"><v-chip color="white" style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Modelo</v-chip></v-col>
                    <v-col cols="2" class="my-0 py-0"><v-chip color="white" style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Categoria</v-chip></v-col>
                    <v-col cols="4" class="my-0 py-0"><v-chip color="white" style="min-width: 90px; justify-content: center; align-items: center; font-weight: bold;">Status</v-chip></v-col>
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
                    <v-col cols="4" v-if="vehicle.status == 'Disponível'" class="my-0 py-0"><v-chip color="green" style="color: white; width: 90px; justify-content: center; align-items: center;">Disponível</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Alugado'" class="my-0 py-0"><v-chip size="32px" color="blue" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Alugado</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Em Manutenção'" class="my-0 py-0"><v-chip size="32px" color="orange" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Em Manutenção</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Fora de Serviço'" class="my-0 py-0"><v-chip size="32px" color="red" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Fora de Serviço</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Reservado'" class="my-0 py-0"><v-chip size="32px" color="purple" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Reservado</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Esperando Manutenção'" class="my-0 py-0"><v-chip size="32px" color="orange" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Esperando Manutenção</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Em Uso Pessoal'" class="my-0 py-0"><v-chip size="32px" color="blue" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Em Uso Pessoal</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Em Reparo'" class="my-0 py-0"><v-chip size="32px" color="orange" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Em Reparo</v-chip></v-col>
                    <v-col cols="4" v-if="vehicle.status == 'Roubado'" class="my-0 py-0"><v-chip size="32px" color="red" style="color: white; min-width: 90px; justify-content: center; align-items: center;">Roubado</v-chip></v-col>
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
                              <v-text-field v-model="editVehicle.model" label="Modelo do Veículo" outlined dense required></v-text-field>
                          </v-col>
                          <v-col cols="3">
                              <v-select v-model="editVehicle.status" :items="getVeicleStatusOptions" item-value="value" item-text="text" label="Categoria do Veículo" outlined dense required></v-select>
                          </v-col>                          
                          <v-col cols="3">
                              <v-select v-model="editVehicle.categoryId" :items="categories" item-value="id" item-text="name" label="Categoria do Veículo" outlined dense required></v-select>
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

  export default Vue.extend({
    name: 'Vehicles',

    data() {
      return {
        newVehicle: {
          name: '',
          model: '',
          status: '',
          categoryId: null as null | number,
        },
        vehicles: [] as any[],
        categories: [] as Category[],
        showCategoryDialog: false,
        newCategory: {
          name: ''
        },

        getVeicleStatusOptions: [
          'Disponível',
          'Alugado',
          'Em Manutenção',
          'Fora de Serviço',
          'Reservado',
          'Esperando Manutenção',
          'Em Uso Pessoal',
          'Em Reparo',
          'Roubado'
        ],
        
        showEditDialog: false,
        editVehicle: {} as any,
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

      updateVehicle(vehicle: any) {
        this.editVehicle = { ...vehicle };
        this.showEditDialog = true;
      },

      async saveUpdatedVehicle() {
        try {
          await VehicleService.updateVehicle(this.editVehicle.id, this.editVehicle);
          this.showEditDialog = false;
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
          const selectedCategory = this.categories.find(option => option.id === this.newVehicle.categoryId);

          if (!selectedCategory) {
            console.error('Error: Selected category not found.');
            return;
          }

          const category = selectedCategory;

          await VehicleService.createVehicle({
            name: this.newVehicle.name,
            model: this.newVehicle.model,
            categoryId: category.id,
            status: this.newVehicle.status, // Enviando o status selecionado ao criar o veículo
          });

          this.newVehicle = { name: '', model: '',  status: '', categoryId: null }; // Limpando os campos após a criação
          this.fetchVehicles();
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
        return category ? category.name : '';
      },

      async createCategory() {
        try {
          await CategoryService.createCategory(this.newCategory);
          this.newCategory = { name: '' };
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
</style>
