<template>
  <div class="apollo-example">

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/HelloWorld.gql')"
      :update = "update"
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
                >{{currentQuestion+1}} / {{totalNumberOfQuestions}}
                </v-progress-linear>
          
          
          <div v-if="!isEnd">
            <SingleQuestion 
            :question="data.allQuestions.edges[currentQuestion].node"
            v-on:submit-answer="onSubmitAnswer"
            />
          </div>
          <div v-else>
            <Result 
            :answers="submitedAnswers"
            v-on:do-again="onDoAgain(query)"/>
          </div>

          
        </div>


        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import SingleQuestion from "./SingleQuestion"
import Result from "./Result"

export default {
  data () {
    return {
      currentQuestion: 0,
      submitedAnswers: [],
      totalNumberOfQuestions: 10,
      isEnd: false
    }
  },

  components: {SingleQuestion, Result},

  methods: {
    onSubmitAnswer: function (answerId, questionId) {
      if (this.currentQuestion >= this.totalNumberOfQuestions - 1){
        this.isEnd = true
      } else {
        this.currentQuestion++
      }
      this.submitedAnswers.push({choiceId:answerId, questionId:questionId})
    },

    update: function (data) {
      this.totalNumberOfQuestions = data.allQuestions.edges.length
      return data
    },

    onDoAgain: function (query) {
      this.currentQuestion = 0
      this.submitedAnswers = []
      this.isEnd = false
      query.refetch()
    }
  }
}
</script>