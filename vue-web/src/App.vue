<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
      hide-on-scroll
      absolute
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Saznaj koji si Dragan</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>



    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>




    <v-main>
      <ApolloExample/>
    </v-main>


  </v-app>
</template>

<script>
import ApolloExample from './components/ApolloExample';

export default {
  name: 'App',

  components: {
    ApolloExample,
  },

  data: () => ({
    drawer: false,
  }),
};
</script>
