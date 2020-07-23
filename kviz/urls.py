from django.urls import path
from django.views.decorators.cache import cache_page


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
    path('kviz4/', views.VueView.as_view(), name='vue'),
    path('api/questions/',cache_page(60*10)(views.QuestionsList.as_view())),
    path('api/questions/<int:pk>/', views.QuestionDetail.as_view()),
    path('api/create/', views.QuestionCreate.as_view()),
    path('api/submit/', views.SubmitView.as_view()),
    path('api/toggle-vote/', views.ToggleVoteButton.as_view()),
]