<template>
  <v-form v-model="valid">
    <v-container>
      <v-row align="center" align-content="center" justify="center">
        <v-col cols="12" lg="8">
          <v-text-field v-model="question" label="Pitanje" :rules="rules" required></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row
        v-for="(answer, index) in answers"
        :key="index"
        align="center"
        align-content="center"
        justify="center"
      >
        <v-col cols="12" lg="8">
          <v-text-field
            v-model="answers[index]"
            :label="'Odgovor ' + (index+1)"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="auto" offset-lg="2">
          <v-btn v-on:click="doAppend">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="auto" offset-lg="2">
          <v-btn color="primary" @click="submitNewQuestion">
            Posalji pitanje
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" offset-lg="2">
          <v-btn color="secondary" @click="$emit('updateQuery')">
            Vrati se na kviz
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => ({
    valid: true,
    question: "",
    answers: ["", ""],
    rules: [v => !!v || "Obavezno polje"]
  }),
  methods: {

    doAppend: function() {
      this.answers.push("");
    },

    submitNewQuestion: function() {
      
      if (!this.valid){
          console.log("Form is not valid")
          return
      }
    
      this.$apollo
        .mutate({
          mutation: gql`
            mutation slaven($answers: CreateQuestionMutationInput!) {
              createQuestion(input: $answers) {
                message
              }
            }
          `,
          variables: {
            answers: {
              questionText: this.question,
              choices: this.answers
            }
          }
        })
        .then(data => {
          // Result
        //   console.log(data);

          if (data.data.createQuestion.message !== "You are not logged in"){
              this.answers = ["", ""]
              this.question = ""
              this.valid = true
          }
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
        //   this.newTag = newTag;
        });
    }
  }
};
</script>