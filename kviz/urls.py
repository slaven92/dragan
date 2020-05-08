from django.urls import path

from . import views

app_name = 'kviz'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('kviz/', views.KvizView.as_view(), name='kviz'),
    path('result/', views.ResultView.as_view(), name='result'),
    path('process/', views.ProcessView.as_view(), name='process'),
    path('signup/', views.SignupView.as_view(), name = 'signup'),
    path('ajax/', views.AjaxView.as_view(), name='ajax'),
    path('kviz2/', views.Kviz2View.as_view(), name='kviz2',),
    path('kviz3/', views.ReactView.as_view(), name='react'),
    path('api/questions/',views.QuestionsList.as_view()),
    path('api/questions/<int:pk>/', views.QuestionDetail.as_view()),
    path('api/create/', views.QuestionCreate.as_view())
]