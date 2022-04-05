<template>
  <v-app>
    <v-app-bar
      app
      dark>
      <div class="d-flex align-center mr-2"> Natthanun </div>
      <v-btn
        to="/tutorials"
        class="mr-2">
        Tutorials
      </v-btn>
      <v-btn to="/add" > Add </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
