<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-sheet
      class="pa-4"
      color="grey-lighten-4"
    >
      <v-avatar
        class="mb-4"
        color="#757575"
        size="64"
      ></v-avatar>

      <div>Usuário: Alex</div>
    </v-sheet>

    <v-divider></v-divider>

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

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" style="color: white;"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: white;">LocaFácil</v-toolbar-title>
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
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
    }
  }
});
</script>

