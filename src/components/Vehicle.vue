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
              <v-col cols="3">
                <v-text-field v-model="newVehicle.name" label="Nome do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="newVehicle.model" label="Modelo do Veículo" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select v-model="newVehicle.status" :items="getVeicleStatusOptions" label="Status do Veículo" outlined dense required></v-select>
              </v-col>
              <v-col cols="3">
                <v-select v-model="newVehicle.categoryId" :items="categories" item-value="id" item-text="name" label="Categoria do Veículo" outlined dense required></v-select>
              </v-col>
              <v-col>
                <v-btn type="submit" color="primary">Cadastrar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <!-- Lista de veículos -->
      <v-row>
          <v-col cols="12">
              <v-card-title>Lista de Veículos</v-card-title>
              <v-row>
                  <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12">
                      <v-card outlined class="mb-0">
                          <v-list-item>
                              <v-list-item-content>
                                  <v-col cols="2"><v-list-item-title>{{ vehicle.name }}</v-list-item-title></v-col>
                                  <v-col cols="2"><v-list-item-title>Modelo: {{ vehicle.model }}</v-list-item-title></v-col>
                                  <v-col cols="2"><v-list-item-title>Categoria: {{ getCategoryName(vehicle.categoryId) }}</v-list-item-title></v-col>
                                  <v-col cols="4"><v-list-item-title>
                                    <span class="status-label">Status: </span>
                                    <span :class="getStatusColor(vehicle.status)">{{ vehicle.status }}</span></v-list-item-title></v-col>
                                  <v-col>
                                    <v-btn @click="updateVehicle(vehicle)" color="primary">Editar</v-btn>
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

      getStatusColor(status: string) {
        switch (status) {
          case 'Disponível':
            return 'disponivel';
          case 'Alugado':
            return 'alugado';
          case 'Em Manutenção':
            return 'em-manutencao';
          case 'Fora de Serviço':
            return 'fora-de-servico';
          case 'Reservado':
            return 'reservado';
          case 'Esperando Manutenção':
            return 'esperando-manutencao';
          case 'Em Uso Pessoal':
            return 'em-uso-pessoal';
          case 'Em Reparo':
            return 'em-reparo';
          case 'Roubado':
            return 'roubado';
          default:
            return '';
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
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
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
  .disponivel { color: green; }
  .alugado { color: blue; }
  .em-manutencao { color: orange; }
  .fora-de-servico { color: red; }
  .reservado { color: purple; }
  .esperando-manutencao { color: orange; }
  .em-uso-pessoal { color: blue; }
  .em-reparo { color: orange; }
  .roubado { color: red; }
</style>
