from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.http import HttpResponse
import glob
import os
import random

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IM_DIR = os.path.join(DIR, 'kviz/static/kviz/')

# Create your views here.
from .models import Question


def index(request):
    return render(request, 'kviz/index.html', {})

def kviz(request):
    try:
        if(request.method == 'GET'):
            request.session['question_number'] = 1
            request.session['result'] = []
        elif(request.method == 'POST'):
            request.session['result'].append(request.POST['choice'])
            request.session['question_number'] += 1
    except (KeyError):
        question_number = request.session.get('question_number', 1)
        question_list = get_list_or_404(Question)
        question = get_object_or_404(Question, pk=question_number)
        context = { 'question':question,
                    'question_number':question_number,
                    'total_number':len(question_list),
                    'error': 'Nema preskakanja'}
        return render(request, 'kviz/kviz.html', context)
    else:
        print(request.session['result'])
        question_number = request.session.get('question_number', 1)
        question_list = get_list_or_404(Question)
        question = get_object_or_404(Question, pk=question_number)
        context = { 'question':question,
                    'question_number':question_number,
                    'total_number':len(question_list),
                    'error':''}
        return render(request, 'kviz/kviz.html', context)

def result(request):
    if(request.method == 'GET'):
        error = 'odradi kviz prvo'
        result = ''
    elif(request.method == 'POST'):
        error = ''
        request.session['result'].append(request.POST['choice'])
        
        # logic here
        images = IM_DIR+'*.jpeg'
        image_list = glob.glob(images)
        image_list_base = [ os.path.basename(p) for p in image_list ]
        image_list_names = [ os.path.splitext(p)[0] for p in image_list_base ]
        #======================
        result = random.choice(image_list_names)

        #===========
    context = { 'result': result,
                'error' : error}
    print(request.session['result'])
    return render(request, 'kviz/result.html', context)