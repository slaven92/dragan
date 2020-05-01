# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import ChannelFull

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    
    # sudo docker run -p 6379:6379 -d redis:5
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        player = text_data_json['player']
        is_set = text_data_json['is_set']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'player' : player,
                'is_set' : is_set,
                'sender_channel_name': self.channel_name,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        player = event['player']
        is_set = event['is_set']

        # Send message to WebSocket
        if self.channel_name != event['sender_channel_name']:
            await self.send(text_data=json.dumps({
                'message': message,
                'player' : player,
                'is_set' : is_set,
            }))