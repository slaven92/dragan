from rest_framework import serializers

from .models import Question, Choice

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['choice_text']


class QuestionSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField(read_only=True)
    votes = serializers.SerializerMethodField(read_only=True)
    choice_set = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['creator', 'question_text', 'votes','choice_set']

    def get_creator(self, obj):
        return obj.creator.username

    def get_votes(self, obj):
        return obj.votes.count()

class QuestionCreateSerializer(serializers.ModelSerializer):
    choice_set = ChoiceSerializer(many=True)
    
    class Meta:
        model = Question
        fields = ['question_text','choice_set']
    
    def create(self, validated_data):
        choices = validated_data.pop('choice_set')
        question = Question.objects.create(**validated_data)
        for choice in choices:
            Choice.objects.create(question=question, **choice)
        return question