from django.urls import path

from . import views

app_name = 'kviz'
urlpatterns = [
    path('', views.index, name='index'),
    path('kviz/', views.kviz, name='kviz'),
    path('result/', views.result, name='result'),
]