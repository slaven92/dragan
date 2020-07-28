from graphene import relay, ObjectType, Mutation, Field, ID, List
from graphene import Int, String, Boolean, InputObjectType
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay import from_global_id

from django.contrib.auth.models import User
from .models import Question, Choice
from django.db.models import F
import os, glob, random
from graphene_django.debug import DjangoDebug


# from promise import Promise
# from promise.dataloader import DataLoader
# from collections import defaultdict

# class ChoiceLoader(DataLoader):
#     def batch_load_fn(self, question_keys):
#         # Here we return a promise that will result on the
#         # corresponding user for each key in keys

#         choices = defaultdict(list)


#         for choice in Choice.objects.filter(question_id__in=question_keys).iterator():
#             choices[choice.question_id].append(choice)
        
#         print(choices)


#         return Promise.resolve([choices.get(question_id, []) for question_id in question_keys])

# choice_loader = ChoiceLoader()

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

class QuestionNode(DjangoObjectType):
    """
    Question Node gives information about questions
    """

    vote_count = Int()
    user_did_vote = Boolean()

    class Meta:
        model = Question
        filter_fields = ['question_text']
        interfaces = (relay.Node, )

    def resolve_vote_count(self, info):
        return self.votes.count()

    def resolve_votes(self, info):
        if not info.context.user.is_authenticated:
            return User.objects.none()
        
        return self.votes.all()

    def resolve_user_did_vote(self, info):
        if not info.context.user.is_authenticated:
            return False

        return self.votes.filter(pk=info.context.user.id).exists()

    # def resolve_choice_set(self, info):
    #     return choice_loader.load(self.id)


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

class Query(ObjectType):
    question = relay.Node.Field(QuestionNode)
    all_questions = DjangoFilterConnectionField(QuestionNode)

    choice = relay.Node.Field(ChoiceNode)
    # all_choices = DjangoFilterConnectionField(ChoiceNode)

    # user = relay.Node.Field(UserNode)
    # all_users = DjangoFilterConnectionField(UserNode)

    is_logged_in = Boolean()

    def resolve_is_logged_in(parent, info):
        return info.context.user.is_authenticated


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






# class QuestionType(DjangoObjectType):
#     class Meta:
#         model = Question

# class ChoiceType(DjangoObjectType):
#     class Meta:
#         model = Choice


# class Query(graphene.ObjectType):
#     all_questions = graphene.List(QuestionType)
#     all_choices = graphene.List(ChoiceType)
#     question = graphene.Field(QuestionType, id=graphene.Int())
#     choice = graphene.Field(ChoiceType, id=graphene.Int())


#     def resolve_question(self, info, *args, **kwargs):
#         id = kwargs.get("id")

#         if id is not None:
#             return Question.objects.get(pk=id)

#         return None

#     def resolve_choice(self, info, *args, **kwargs):
#         id = kwargs.get("id")
#         name = kwargs.get("name")

#         if id is not None:
#             return Choice.objects.get(pk=id)

#         return None



#     def resolve_all_questions(self, info, *args, **kwargs):
#         return Question.objects.all()

#     def resolve_all_choices(self, info, *args, **kwargs):
#         return Choice.objects.select_related('question').all()

# schema = graphene.Schema(query=Query)