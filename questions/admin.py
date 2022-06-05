from django.contrib import admin
from .models import *

class AnswerInline(admin.TabularInline):
    model = Answer


class QuestionsAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

admin.site.register(Question, QuestionsAdmin)

admin.site.register(Answer)
