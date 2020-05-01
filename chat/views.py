from django.shortcuts import render
from django.views import View

# Create your views here.
def index(request):
    return render(request, 'chat/html/battleship-welcome.html')


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })

class HomeView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/html/battleship-welcome.html', {})


class OGView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/html/battleship-welcome.html', {})

class OGSetupView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/html/battleship-setup.html', {})

class OGGameView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/html/battleship-game.html', {})
