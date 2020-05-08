from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.

from .models import Question, Choice, Profile

class ChoiceInline(admin.StackedInline):
    model = Choice

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]

class QuestionInLine(admin.StackedInline):
    model = Question

class UserAdmin(BaseUserAdmin):
    inlines = (QuestionInLine,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Profile)

