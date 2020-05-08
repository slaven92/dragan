from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import glob
import os
import random
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

# Create your views here.
from .models import Question, Choice
from .serializers import QuestionSerializer, QuestionCreateSerializer

class IndexView(View):
    def get(self, request, *args, **kwargs):
        request.session['question_number'] = 1
        request.session['result'] = []
        return render(request, 'kviz/index.html', {})

class ResultView(View):
    def get(self, request, *args, **kwargs):
        num_of_questions = len(get_list_or_404(Question))
        if request.session['question_number'] == num_of_questions:
            # logic here
            images = IM_DIR+'*.jpeg'
            image_list = glob.glob(images)
            image_list_base = [ os.path.basename(p) for p in image_list ]
            image_list_names = [ os.path.splitext(p)[0] for p in image_list_base ]
            #======================
            result = random.choice(image_list_names)
            #===========
            context = { 'result': result,
                        'error' : '',
                        'user_results': request.session['result']}
            request.session['result'] = []
            request.session['question_number'] = 1
            return render(request, 'kviz/result.html', context)
        else:
            context = { 'result': [],
                        'error' : 'Prvo odradi kviz',
                        'user_results': []}
            return render(request, 'kviz/result.html', context)
    
    def post(self, request, *args, **kwargs):
        return redirect('kviz:kviz')

class ProcessView(View):
    def get(self, request, *args, **kwargs):
        return redirect('kviz:kviz')
    
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated and request.session['question_number']>1:
            return redirect('/accounts/login/?next=%s' % (request.path))
        else:
            try:
                ch = get_object_or_404(Choice, pk=request.POST['choice'])
            except (KeyError):
                context = create_contex_for_kviz(request, 'Nema preskakanja!')
                return render(request, 'kviz/kviz.html', context)
            else:
                num_of_questions = len(get_list_or_404(Question))
                request.session['result'].append(ch.choice_text)
                if request.session['question_number'] == num_of_questions:
                    request.session.modified = True
                    return redirect('kviz:result')
                request.session['question_number'] += 1
            return redirect('kviz:kviz')

class KvizView(View):
    template_name = "kviz/kviz.html"

    def get(self, request, *args, **kwargs):
        context = create_contex_for_kviz(request,"")
        return render(request, 'kviz/kviz.html', context)

    def post(self, request, *args, **kwargs):
        return redirect('kviz:kviz')

class SignupView(View):
    template_name = 'kviz/signup.html'

    def get(self, request, *args, **kwargs):
        form = UserCreationForm()
        return render(request, 'registration/signup.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('kviz:kviz')
        return render(request, 'registration/signup.html', {'form': form})

class AjaxView(View):
    # TODO change to post, change URL, you will get answer from request.post
    def get(self, request, *args, **kwargs):
        if request.is_ajax(): #request.is_ajax()
            if not 'question_number' in request.session:
                request.session['question_number'] = 1
                request.session['result'] = []
            #no authentication
            if not request.user.is_authenticated and request.session['question_number']>1:
                context = {}
                context['authorized'] = False
                return JsonResponse(context, status = 200)
            

            if not is_answer_valid(request):
                context = {}
                context['error'] = 'please submit correct answer'
                return JsonResponse(context, status = 200)

            
            if request.session['question_number'] == get_total_number()+1:
                context = {}
                context = calculate_result(request, context)
                request.session['question_number'] = 1
                request.session['result'] = []
                return JsonResponse(context, status = 200)

            #skip first question
            if request.session['question_number'] != 1:
                request.session['result'].append(request.GET['answer'])
            context = create_context_for_ajax(request)
            request.session['question_number'] += 1
            return JsonResponse(context, status = 200)
        else:
            return redirect('kviz:kviz')

class Kviz2View(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'kviz/ajax.html', {})

class ReactView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'kviz/react.html', {})

## helper functions
def create_contex_for_kviz(request, error):
    if not 'question_number' in request.session:
        request.session['question_number'] = 1
        request.session['result'] = []
    question_number = request.session['question_number']
    question_list = get_list_or_404(Question)
    question = get_object_or_404(Question, pk=question_number)
    percent = (100*question_number)//len(question_list)
    context = { 'question':question,
                'question_number':question_number,
                'total_number':len(question_list),
                'error': error,
                'percent':str(percent),}
    return context

def create_context_for_ajax(request):
    context = {}
    if not 'question_number' in request.session:
        request.session['question_number'] = 1
        request.session['result'] = []
    question_number = request.session['question_number']
    question = get_object_or_404(Question, pk=question_number)
    context['question'] = question.question_text
    choices = question.choice_set.all()
    context['answer'] = [choice.choice_text for choice in choices]
    context['total_number'] = len(get_list_or_404(Question))
    context['current_number'] = question_number
    context['authorized'] = True
    return context

def calculate_result(request, context):
    request.session.modified = True
    print(request.session['result'])
    images = IM_DIR+'*.jpeg'
    image_list = glob.glob(images)
    image_list_base = [ os.path.basename(p) for p in image_list ]
    image_list_names = [ os.path.splitext(p)[0] for p in image_list_base ]
    #======================
    result = random.choice(image_list_names)
    context['result'] = result
    return context

def is_answer_valid(request):
    if request.session['question_number'] == 1:
        return True
    
    question_number = request.session['question_number'] - 1
    question = get_object_or_404(Question, pk=question_number)
    choices = question.choice_set.all()
    choices = [choice.choice_text for choice in choices]
    
    if 'answer' not in request.GET:
        return False

    if request.GET['answer'] in choices:
        return True

    return False

def get_total_number():
    return len(get_list_or_404(Question))

class QuestionsList(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionDetail(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)