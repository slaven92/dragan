from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.http import HttpResponse
import glob
import os
import random

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

# Create your views here.
from .models import Question, Choice


def index(request):
    return render(request, 'kviz/index.html', {})

def kviz(request):
    try:
        if(request.method == 'GET'):
            request.session['question_number'] = 1
            request.session['result'] = []
        elif(request.method == 'POST'):
            ch = get_object_or_404(Choice, pk=request.POST['choice'])
            request.session['result'].append(ch.choice_text)
            request.session['question_number'] += 1
    except (KeyError):
        context = create_contex_for_kviz(request, 'Nema preskakanja!')
        return render(request, 'kviz/kviz.html', context)
    else:
        context = create_contex_for_kviz(request,"")
        return render(request, 'kviz/kviz.html', context)

def result(request):
    if(request.method == 'GET'):
        error = 'odradi kviz prvo'
        result = ''
    elif(request.method == 'POST'):
        try:
            request.session['result'].append(request.POST['choice'])
        except (KeyError):
            context = create_contex_for_kviz(request, 'Nema preskakanja!')
            return render(request, 'kviz/kviz.html', context)
        else:
            error = ''

            
            # logic here
            images = IM_DIR+'*.jpeg'
            image_list = glob.glob(images)
            image_list_base = [ os.path.basename(p) for p in image_list ]
            image_list_names = [ os.path.splitext(p)[0] for p in image_list_base ]
            #======================
            result = random.choice(image_list_names)

            #===========
    context = { 'result': result,
                'error' : error,
                'user_results': request.session['result']}
    return render(request, 'kviz/result.html', context)

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
