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

          <v-list-item @click="doLoginOrLogout">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-if="isLoggedIn">Odjavi se</v-list-item-title>
            <v-list-item-title v-else>Prijavi se</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isLoggedIn" @click="goToAddQuestion">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dodaj pitanje</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>




    <v-main>
      <AddQuestion v-if="addQuestion" @updateQuery="doUpdateQuestion"/>
      <ApolloExample v-else ref="qq"/>
    </v-main>


  </v-app>
</template>

<script>
import gql from 'graphql-tag'
import ApolloExample from './components/ApolloExample';
import AddQuestion from './components/AddQuestion';

export default {
  name: 'App',

  components: {
    ApolloExample,
    AddQuestion,
  },

  data: () => ({
    drawer: false,
    isLoggedIn: false,
    addQuestion: false,
  }),

  apollo:{
    isLoggedIn: gql`query {
      isLoggedIn
    }`,
  },
  methods: { 
    doLoginOrLogout:function (){

      // const basePath = "http://127.0.0.1:8000/"
      const basePath = "/"

      if (this.isLoggedIn) {
        window.location.href = basePath + "accounts/logout/"
      } else{
        window.location.href = basePath + "accounts/login/?next=" + basePath
      }
    },
    goToAddQuestion: function(){
      this.addQuestion = true
    },

    doUpdateQuestion:function () {
      // this.$apollo.queries.allQuestions.refetch()
      this.addQuestion = false
    }
  }

};
</script>
