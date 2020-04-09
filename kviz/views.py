from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect
from django.http import HttpResponse
import glob
import os
import random
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

# Create your views here.
from .models import Question, Choice

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


## helper functions
def create_contex_for_kviz(request, error):
    question_number = request.session.get('question_number', 1)
    question_list = get_list_or_404(Question)
    question = get_object_or_404(Question, pk=question_number)
    percent = (100*question_number)//len(question_list)
    context = { 'question':question,
                'question_number':question_number,
                'total_number':len(question_list),
                'error': error,
                'percent':str(percent),}
    return context

