# chat/urls.py
from django.urls import path

from . import views

# urlpatterns = [
#     path('', views.index, name='index'),
#     path('<str:room_name>/', views.room, name='room'),
# ]

urlpatterns = [
    # path('', views.home_view, name='home'),
    path('', views.HomeView.as_view(), name='home'),
    # path('create/', views.CreateGame.as_view(), name='create'),
    # path('join/', views.JoinGame.as_view(), name='join'),
    # path('send/', views.SendMove.as_view(), name='send'),
    # path('recieve/', views.RecieveMove.as_view(), name='recieve'),
    path('og/', views.OGView.as_view(), name="og"),
    path('og/setup/', views.OGSetupView.as_view(), name='setup'),
    path('og/game/', views.OGGameView.as_view(), name='game'),
]