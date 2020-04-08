from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect
from django.http import HttpResponse
import glob
import os
import random

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

# Create your views here.
from .models import Question, Choice


def index(request):
    request.session['question_number'] = 1
    request.session['result'] = []
    return render(request, 'kviz/index.html', {})

def kviz(request):
    if(request.method == 'GET'):
        context = create_contex_for_kviz(request,"")
        return render(request, 'kviz/kviz.html', context)
    else:
        return redirect('kviz:kviz')

def result(request):
    if(request.method == 'GET'):
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
    else:
        return redirect('kviz:kviz')


def process(request):
    if(request.method == 'GET'):
        return redirect('kviz:kviz')
    elif(request.method == 'POST'):
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

