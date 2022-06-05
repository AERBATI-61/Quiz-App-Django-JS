from django.db import models
from quizes.models import Quiz

class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.text)


    def get_answer(self):
        return self.answer_set.all()



class Answer(models.Model):
    text                     = models.CharField(max_length=200)
    question                 = models.ForeignKey(Question, on_delete=models.CASCADE)
    correct                  = models.BooleanField(default=False)

    def __str__(self):
        return f'' \
               f'Question: {self.question.text},' \
               f' Anwser: {self.text},' \
               f'Correct: {self.correct}'


    def get_answer(self):
        pass