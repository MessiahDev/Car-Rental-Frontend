<template>
  <v-container fluid>

    <h1>Clientes</h1>

    <v-card>
      <v-card-title>Cadastrar Cliente</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createCustomer">
          <v-row cols="12">
            <v-col cols="3">
              <v-text-field v-model="newCustomer.name" label="Nome" outlined dense clearable required></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.email" label="E-mail" type="email" outlined dense clearable
                required></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.cellPhone" label="Telefone celular"
                v-mask="['(##) ####-####', '(##) #####-####']" type="phone" outlined dense clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.phone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']"
                type="phone" outlined dense clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.address" label="Endereço" outlined dense clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.dateOfBirth" label="Data de Nascimento" type="date" outlined dense
                clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.cpf" label="CPF/CNPJ" v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined dense clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.rg" label="RG" v-mask="'##.###.###-#'" outlined dense
                clearable></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newCustomer.drivingLicenseNumber" label="Número da CNH" outlined dense
                clearable></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Cadastrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-card-title class="mb-0 pb-0">Lista de Clientes</v-card-title>
        <v-row>
          <v-col cols="12">
            <v-card outlined class="my-0 py-0">
              <v-list-item>
                <v-list-item-content class="my-0 py-0">
                  <v-col cols="3" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 120px; justify-content: center; align-items: center; font-weight: bold;">Nome</v-chip></v-col>
                  <v-col cols="3" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 120px; justify-content: center; align-items: center; font-weight: bold;">E-mail</v-chip></v-col>
                  <v-col cols="3" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 120px; justify-content: center; align-items: center; font-weight: bold;">Telefone</v-chip></v-col>
                  <v-col cols="3" class="my-0 py-0"><v-chip color="white"
                      style="min-width: 120px; justify-content: center; align-items: center; font-weight: bold;">Ações</v-chip></v-col>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col v-for="customer in customers" :key="customer.id" cols="12" class="my-0 py-0">
            <v-card outlined class="my-0 py-0">
              <v-list-item>
                <v-list-item-content class="my-0 py-0">
                  <v-col cols="3" class="my-0 py-0"><span>{{ customer.name }}</span></v-col>
                  <v-col cols="3" class="my-0 py-0"><span>{{ customer.email }}</span></v-col>
                  <v-col cols="3" class="my-0 py-0"><span>{{ customer.phone }}</span></v-col>
                  <v-col cols="3" class="my-0 py-0">
                    <v-btn outlined @click="updateCustomer(customer)" color="primary" class="mx-1">Editar</v-btn>
                    <v-btn @click="confirmDelete(customer.id)" color="error">Excluir</v-btn>
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
        <v-card-title>Editar Cliente</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUpdatedCustomer">
            <v-row cols="12" class="ma-4">
              <v-col cols="3">
                <v-text-field v-model="editCustomer.name" label="Nome" outlined dense clearable required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.email" label="E-mail" outlined dense clearable
                  required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.cellPhone" label="Telefone Celular"
                  v-mask="['(##) ####-####', '(##) #####-####']" outlined dense clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.phone" label="Telefone"
                  v-mask="['(##) ####-####', '(##) #####-####']" outlined dense clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.address" label="Endereço" outlined dense clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.dateOfBirth" label="Data de Nascimento" type="date" outlined dense
                  clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.cpf" label="CPF/CNPJ"
                  v-mask="['###.###.###-##', '##.###.###/####-##']" outlined dense clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.rg" label="RG" v-mask="'##.###.###-#'" outlined dense
                  clearable></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="editCustomer.drivingLicenseNumber" label="Número da CNH" outlined dense
                  clearable></v-text-field>
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
//import { CustomerService } from '../services/customerService';
import Customer from '../models/customer';
import customerData from '../dataBaseDemo/customerDB.json';

export default Vue.extend({
  name: 'Customers',

  data() {
    return {
      newCustomer: new Customer(),
      customers: [] as Customer[],
      showEditDialog: false,
      editCustomer: {} as Customer,
    };
  },

  mounted() {
    this.fetchCustomers();
  },

  methods: {
    fetchCustomers() {
      try {
        //const response = await CustomerService.getAllCustomers();
        const response = customerData;
        this.customers = response;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },

    updateCustomer(customer: Customer) {
      this.editCustomer = { ...customer };
      this.showEditDialog = true;
    },

    async saveUpdatedCustomer() {
      try {
        //await CustomerService.updateCustomer(this.editCustomer.id, this.editCustomer);

        this.customers.splice(this.editCustomer.id, 1, this.editCustomer)
        this.showEditDialog = false;
        this.fetchCustomers();
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    },

    createCustomer() {
      try {
        //await CustomerService.createCustomer(this.newCustomer);
        this.customers.push(this.newCustomer)
        this.newCustomer = new Customer();
        this.fetchCustomers();
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    },

    deleteCustomer(id: number) {
      try {
        //await CustomerService.deleteCustomer(id);
        this.customers.splice(id, 1);
        this.fetchCustomers();
        Swal.fire('Sucesso!', 'Cliente excluído com sucesso!', 'success');
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },

    async confirmDelete(id: number) {
      try {
        const confirmed = await Swal.fire({
          title: 'Tem certeza que deseja excluir este cliente?',
          text: 'Esta ação não poderá ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f44336',
          cancelButtonColor: '#f98038',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
          await this.deleteCustomer(id);
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },
  },
});
</script>

<style scoped></style>