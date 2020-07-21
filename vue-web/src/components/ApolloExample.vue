<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      ref="queryComponentRef"
      :query="require('../graphql/HelloWorld.gql')"
      :update="update"
      @updateQuery="onDoAgain"
    >
      <template slot-scope="{ result: { loading, error, data }, query }">
        <!-- Loading -->

        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <v-progress-linear
            height="15"
            :value="(currentQuestion+1)/totalNumberOfQuestions*100"
            rounded
          >{{currentQuestion+1}} / {{totalNumberOfQuestions}}</v-progress-linear>

          <div v-if="!isEnd">
            <SingleQuestion
              @doVote="doVote"
              :question="data.allQuestions.edges[currentQuestion].node"
              v-on:submit-answer="onSubmitAnswer"
            />
          </div>
          <div v-else>
            <Result :answers="submitedAnswers" v-on:do-again="onDoAgain(query)" />
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">Loading...</div>

        <v-container>
          <v-row align="center" align-content="center" justify="center">
            <v-col cols="12" lg="8">
              <v-alert
                v-model="alert"
                close-text="Close Alert"
                dark
                type="error"
                dismissible
              >Morate se ulogovati da biste lajkovali pitanje!</v-alert>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from "graphql-tag";
import SingleQuestion from "./SingleQuestion";
import Result from "./Result";

export default {
  data() {
    return {
      currentQuestion: 0,
      submitedAnswers: [],
      totalNumberOfQuestions: 10,
      isEnd: false,
      alert: false
    };
  },

  components: { SingleQuestion, Result },

  methods: {
    onSubmitAnswer: function(answerId, questionId) {
      if (this.currentQuestion >= this.totalNumberOfQuestions - 1) {
        this.isEnd = true;
      } else {
        this.currentQuestion++;
      }
      this.submitedAnswers.push({ choiceId: answerId, questionId: questionId });
    },

    update: function(data) {
      this.totalNumberOfQuestions = data.allQuestions.edges.length;
      return data;
    },

    onDoAgain: function(query) {
      this.currentQuestion = 0;
      this.submitedAnswers = [];
      this.isEnd = false;
      query.refetch();
    },

    doVote: function(id) {
      // console.log(id)

      this.$apollo
        .mutate({
          mutation: gql`
            mutation slaven3($votes: VoteMutationInput!) {
              vote(input: $votes) {
                message
              }
            }
          `,
          variables: {
            votes: {
              id: id
            }
          }
        })
        .then(data => {
          // console.log(data.data.vote.message);

          if (data.data.vote.message === "You are not logged in") {
            this.alert = true;
          }
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
          //   this.newTag = newTag;
        });
      this.$refs.queryComponentRef.getApolloQuery().refetch();
    }
  },

  mounted: function() {
    this.$refs.queryComponentRef.getApolloQuery().refetch();
  }
};
</script>