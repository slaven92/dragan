<template>
    <ApolloMutation
    :mutation="require('../graphql/SubmitAnswerMutation.gql')"
    :variables = "{
        answerss
    }"
    @done="onDone"
    >
    <template v-slot="{ mutate, loading, error }">
        <div v-if="finished">
            <v-card class="mx-auto" max-width="400">
                <v-img :src="result"></v-img>
                <v-card-title>Dragan</v-card-title>
                <v-card-actions>
                    <v-btn v-on:click="$emit('do-again')"> Odradi ponovo </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else-if="loading">
            Loading
        </div>
        <div v-else>
            Loading {{mutate()}}
        </div>

        <p v-if="error">An error occurred: {{ error }}</p>
    </template>
    </ApolloMutation>
</template>

<script>
export default {
    data() {
        return {
            finished : false,
            base : "static/kviz/",
            result : "",
        }
    },
    props: {
        answers: Array,
    },
    computed: {
        answerss: function () {
            return {
                "answerList": this.answers
            }
        }
    },
    methods: {
        onDone: function (data) {
            this.finished = true
            this.result = "/" + this.base + data.data.submitAnswers.message + ".jpeg"
        }
    },
    mounted: function (){
        this.$apollo.mutate()
    }
}
</script>
