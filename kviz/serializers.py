from rest_framework import serializers

from .models import Question, Choice

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['choice_text','votes']


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

class QuestionAuthSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField(read_only=True)
    votes = serializers.SerializerMethodField(read_only=True)
    choice_set = ChoiceSerializer(many=True)
    user_did_vote = serializers.SerializerMethodField(read_only=True)
    curr_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = ['creator','user_did_vote', 'curr_user', 'question_text', 'votes','choice_set']

    def get_creator(self, obj):
        return obj.creator.username

    def get_votes(self, obj):
        return obj.votes.count()

    def get_curr_user(self, obj):
        return self.context['request'].user.username

    def get_user_did_vote(self, obj):
        curr_user = self.context['request'].user
        liked_by = obj.votes.all()
        if curr_user in liked_by:
            return True
        return False

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

class ObjSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()

    def validate(self, data):
        qObj = Question.objects.filter(question_text=data['question'])
        if not qObj:
            raise serializers.ValidationError("That was not a valid question")
        choices = qObj.first().choice_set.all()
        
        textList = []
        for choice in choices:
            textList.append(choice.choice_text)

        if data['answer'] not in textList:
            raise serializers.ValidationError("Wrong answer on one of the questions")

        return data


class SubmitSerializer(serializers.Serializer):
    answer_list = ObjSerializer(many=True)

    # TODO validate that all questions are different

    def create(self, validated_data):
        for obj in validated_data['answer_list']:
            answObj = Choice.objects.get(choice_text=obj['answer'])
            answObj.votes +=1
            answObj.save()
        return ""
