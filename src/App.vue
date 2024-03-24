<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" link  @click="navigate(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false,
    items: [
      { text: 'Home', icon: 'mdi-home', route: '/' },
      { text: 'Veículos', icon: 'mdi-car', route: '/vehicles' },
      { text: 'Clientes', icon: 'mdi-account', route: '/customers' },
      { text: 'Reservas', icon: 'mdi-calendar', route: '/reservations' },
      { text: 'Vendas', icon: 'mdi-cash', route: '/sales' }
    ]
  }),

  methods: {
    navigate(route: string) {
      // Verifica se a rota que está tentando navegar é diferente da rota atual
      if (this.$route.path !== route) {
        // Navega para a rota selecionada
        this.$router.push(route);
      }
    }
  }
});
</script>

