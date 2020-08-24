from graphene import relay, ObjectType, Mutation, Field, ID, List
from graphene import Int, String, Boolean, InputObjectType
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoConnectionField
from graphql_relay import from_global_id

from django.contrib.auth.models import User
from .models import Question, Choice
from django.db.models import F
import os, glob, random
from graphene_django.debug import DjangoDebug


from promise import Promise
from promise.dataloader import DataLoader
from collections import defaultdict
from django.core.cache import cache

class ChoiceLoader(DataLoader):
    def batch_load_fn(self, question_keys):
        # Here we return a promise that will result on the
        # corresponding user for each key in keys

        choices = defaultdict(list)


        for choice in Choice.objects.filter(question_id__in=question_keys).iterator():
            choices[choice.question_id].append(choice)


        return Promise.resolve([choices.get(question_id, []) for question_id in question_keys])

choice_loader = ChoiceLoader()

class VotesLoader(DataLoader):
    def batch_load_fn(self, question_keys):
        # Here we return a promise that will result on the
        # corresponding user for each key in keys

        votes = defaultdict(list)

        
        for key in question_keys:
            for user in Question.objects.get(pk=key).votes.all():
                votes[key].append(user)
        
        print(votes)


        return Promise.resolve([votes.get(question_id, []) for question_id in question_keys])

vote_loader = VotesLoader()



DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')


class ChoiceNode(DjangoObjectType):
    """
    Choices of a related question
    """
    class Meta:
        model = Choice
        filter_fields = {
            'choice_text': ['exact', 'icontains', 'istartswith'],
            'question': ['exact'],
        }
        interfaces = (relay.Node, )

class UserNode(DjangoObjectType):
    """
    User node gives info about usernames
    """
    class Meta:
        model = User
        filter_fields = ['username']
        fields = ('username',)
        interfaces = (relay.Node, )


class QuestionNode(ObjectType):
    """
    Question Node gives information about questions
    """

    question_text = String()
    votes = DjangoConnectionField(UserNode)
    creator = Field(UserNode)
    choice_set = DjangoConnectionField(ChoiceNode)

    vote_count = Int()
    user_did_vote = Boolean()

    class Meta:
        interfaces = (relay.Node, )

    def resolve_vote_count(self, info):
        return vote_loader.load(self.id).then(lambda votes: len(votes))

    def resolve_votes(self, info):
        if not info.context.user.is_authenticated:
            return User.objects.none()

        return  vote_loader.load(self.id)

    def resolve_user_did_vote(self, info):
        if not info.context.user.is_authenticated:
            return False

        return vote_loader.load(self.id).then(lambda votes: info.context.user in votes )

    def resolve_choice_set(self, info):
        return choice_loader.load(self.id)

    def resolve_question_text(self, info):
        return self.question_text

    def resolve_creator(self, info):
        return self.creator

    @classmethod
    def get_node(cls, info, id):
        return Question.objects.get(pk=id)


class QuestionConnection(relay.Connection):
    class Meta:
        node = QuestionNode





class Query(ObjectType):
    question = relay.Node.Field(QuestionNode)
    all_questions = relay.ConnectionField(QuestionConnection)

    choice = relay.Node.Field(ChoiceNode)
    # all_choices = DjangoFilterConnectionField(ChoiceNode)

    # user = relay.Node.Field(UserNode)
    # all_users = DjangoFilterConnectionField(UserNode)

    is_logged_in = Boolean()

    def resolve_is_logged_in(self, info):
        return info.context.user.is_authenticated

    def resolve_all_questions(self, info):
        # questions = cache.get("questions")
        # if not questions:
        #     questions = Question.objects.all()
        #     cache.set("questions", questions)
        
        # return questions
        return Question.objects.all()


class VoteMutation(relay.ClientIDMutation):

    class Input:
        id = String()

    question = Field(QuestionNode)
    message = String()
    debug = Field(DjangoDebug, name='_debug')

    @classmethod
    def mutate_and_get_payload(self, root, info, id):

        if not info.context.user.is_authenticated:
            message = "You are not logged in"
            return VoteMutation(question=None, message=message)

        question = Question.objects.get(pk=from_global_id(id)[1])

        votes = question.votes.all()

        if votes.filter(pk=info.context.user.pk).exists():
            message = "Removed Vote"
            question.votes.remove(info.context.user.pk)
        else:
            message = "Voted"
            question.votes.add(info.context.user.pk)

        return VoteMutation(question=question, message=message)

# ------- mutation
class CreateQuestionMutation(relay.ClientIDMutation):
    class Input:
        question_text = String(required=True)
        choices = List(String,required=True)

    question = Field(QuestionNode)
    message = String()

    @classmethod
    def mutate_and_get_payload(self, root, info, question_text, choices):

        if not info.context.user.is_authenticated:
            message = "You are not logged in"
            return CreateQuestionMutation(question=None, message=message)

        question = Question.objects.create(question_text=question_text, creator = info.context.user)


        for choice in choices:
            Choice.objects.create(question=question, choice_text=choice)

        question.save()
        message = "OK"
        return VoteMutation(question=question, message=message)

class AnswerSubmitInputType(InputObjectType):
        question_id = String(required=True)
        choice_id = String(required=True)


class SubmitAnswersMutation(relay.ClientIDMutation):
    class Input:
        answer_list = List(AnswerSubmitInputType, required=True)

    message = String()

    @classmethod
    def mutate_and_get_payload(self, root, info, answer_list):

        for answer in answer_list:
            ans = Question.objects.get(pk=from_global_id(answer.question_id)[1]).choice_set.get(pk=from_global_id(answer.choice_id)[1])
            ans.votes = F('votes') + 1
            ans.save()

        images = IM_DIR+'*.jpeg'
        image_list = glob.glob(images)
        image_list_base = [ os.path.basename(p) for p in image_list ]
        image_list_names = [ os.path.splitext(p)[0] for p in image_list_base ]
        image_list_names.remove("blur")
        result = random.choice(image_list_names)
        return VoteMutation(message=result)

class Mutation(ObjectType):
    vote = VoteMutation.Field()
    create_question = CreateQuestionMutation.Field()
    submit_answers = SubmitAnswersMutation.Field()