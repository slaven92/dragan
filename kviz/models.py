from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
# Create your models here.



class Question(models.Model):
    question_text = models.CharField(max_length=200)
    votes = models.ManyToManyField(User, related_name='votes', blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, sender=User)