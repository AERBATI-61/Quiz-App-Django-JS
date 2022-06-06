from django.urls import path

from .views import *

app_name = 'quizes'

urlpatterns = [
    path('', QuizListView.as_view(), name='quiz-list'),
    path('<pk>/', quizView, name='quiz-view'),
    path('<pk>/data/', quizDataView, name='quiz-data-view'),
    path('<pk>/save/', save_quiz_view, name='quiz-save-view'),
]