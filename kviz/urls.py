from django.urls import path

from . import views

app_name = 'kviz'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('kviz/', views.KvizView.as_view(), name='kviz'),
    path('result/', views.ResultView.as_view(), name='result'),
    path('process/', views.ProcessView.as_view(), name='process'),
]