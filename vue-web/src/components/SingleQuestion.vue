<template>
    <v-container>
        <v-row align="center" align-content="center" justify="center">
            <v-col cols="auto">
                <h1>
                    {{question.questionText}}
                </h1>
            </v-col>
        </v-row>

        <v-row align="center" align-content="center" justify="center">
            <v-col cols="12" lg="8">
                <div v-for="answer in question.choiceSet.edges" :key="answer.node.id">
                    <v-btn large block color="primary" v-on:click="$emit('submit-answer', answer.node.id, question.id)">
                        {{answer.node.choiceText}} 
                        <v-badge :content="answer.node.votes" inline>
                            <v-icon dark right>mdi-heart</v-icon>
                        </v-badge>
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col lg="4" offset-lg="2">
                <p>Pitao:{{question.creator.username}}</p>
            </v-col>
            <v-col lg="4" style="text-align:right;">
                <v-btn @click="$emit('doVote', question.id)" color="secondary">{{question.voteCount}}
                    <v-icon v-if="question.userDidVote" dark right>mdi-heart</v-icon>
                    <v-icon v-else dark right>mdi-heart-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        question: {
            id: String,
            questionText: String,
            creator: Object,
            voteCount: Number,
            userDidVote: Boolean
        },
    }
}
</script>