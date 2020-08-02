<template>
  <div class="apollo-example">

    <div v-if="$apollo.loading">Loading...</div>

    <div v-else>

        <v-progress-linear
          height="15"
          :value="(currentQuestion+1)/totalNumberOfQuestions*100"
          rounded
        >{{currentQuestion+1}} / {{totalNumberOfQuestions}}</v-progress-linear>


        <div v-if="!isEnd">
          <SingleQuestion
            @doVote="doVote"
            :question="allQuestions.edges[currentQuestion].node"
            @submit-answer="onSubmitAnswer"
          />
        </div>
        <div v-else>
          <Result :answers="submitedAnswers" @do-again="onDoAgain(query)" />
        </div>


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
    
    </div>

  </div>
</template>

<script>
import gql from "graphql-tag";
import SingleQuestion from "./SingleQuestion";
import Result from "./Result";

export default {
  apollo: {
    allQuestions: require('../graphql/HelloWorld.gql'),
    isLoggedIn: gql`query{
      isLoggedIn
    }
    `,
  },

  data() {
    return {
      currentQuestion: 0,
      submitedAnswers: [],
      isEnd: false,
      alert: false,
      allQuestions: [],
    };
  },

  components: { SingleQuestion, Result },

  computed: {
      totalNumberOfQuestions: function (){
        return this.allQuestions.edges.length
      }
  },

  methods: {
    onSubmitAnswer: function (answerId, questionId) {
      if (this.currentQuestion >= this.totalNumberOfQuestions - 1) {
        this.isEnd = true;
      } else {
        this.currentQuestion++;
      }
      this.submitedAnswers.push({ choiceId: answerId, questionId: questionId });
    },

    onDoAgain: function () {
      this.currentQuestion = 0;
      this.isEnd = false;


      this.submitedAnswers.forEach(obj => {
        let questionId = obj.questionId
        let answerId = obj.choiceId

        let filtered_question = this.allQuestions.edges.find(obj=>{
          return obj.node.id === questionId
        })

        let filtered_answer = filtered_question.node.choiceSet.edges.find(obj=>{
          return obj.node.id === answerId
        })

        filtered_answer.node.votes++
      });


      this.submitedAnswers = []
    },

    doVote: function (id) {
      if(!this.isLoggedIn){
        this.alert = true;
        return
      }

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
              id: id,
            },
          },
        })
        .then((data) => {
          // console.log(data.data.vote.message);

          if (data.data.vote.message === "You are not logged in") {
            this.alert = true;
            return
          }

        let filtered_question = this.allQuestions.edges.find(obj=>{
          return obj.node.id === id
        })

        if (filtered_question.node.userDidVote)
            filtered_question.node.voteCount--
        else 
          filtered_question.node.voteCount++

        filtered_question.node.userDidVote  = !filtered_question.node.userDidVote

        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
          //   this.newTag = newTag;
        });
    },
  },
};
</script>


