from django.db import models


# нужно ли вообще хранить шаблон в БД?
class Template(models.Model):
    name = models.CharField(max_length=45)
    description = models.CharField(max_length=255)

    min_rate_desc = models.CharField(max_length=150, default='Очень недоволен')
    max_rate_desc = models.CharField(max_length=150, default='Очень доволен')
    thanks_text = models.CharField(max_length=255, default='Благодарим Вас за предоставленную информацию')
    main_color = models.CharField(max_length=7)
    thanks_color = models.CharField(max_length=7)
    bg_color = models.CharField(max_length=7)
    thanks_bg_color = models.CharField(max_length=7)
    position = models.CharField(max_length=30, default='center')
    size = models.CharField(max_length=30, default='desktop')
    # questions - FK


class Project(models.Model):
    name = models.CharField(max_length=45, unique=True)
    description = models.CharField(max_length=255)
    # questions_lists - FK


class QuestionsList(models.Model):
    title = models.CharField(max_length=45)
    description = models.CharField(max_length=150, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='questions_lists')
    # questions - FK


class Question(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=255)

    min_rate_desc = models.CharField(max_length=150, default='Очень недоволен')
    max_rate_desc = models.CharField(max_length=150, default='Очень доволен')
    thanks_text = models.CharField(max_length=255, default='Благодарим Вас за предоставленную информацию')
    main_color = models.CharField(max_length=7, null=True, blank=True)
    thanks_color = models.CharField(max_length=7, null=True, blank=True)
    bg_color = models.CharField(max_length=7, null=True, blank=True)
    thanks_bg_color = models.CharField(max_length=7, null=True, blank=True)
    position = models.CharField(max_length=30, null=True, blank=True)
    size = models.CharField(max_length=30, null=True, blank=True)

    questions_list = models.ForeignKey(QuestionsList, on_delete=models.CASCADE, related_name='questions')
    template = models.ForeignKey(Template, on_delete=models.CASCADE,
                                 related_name='questions')  # надо подумать про каскадное удаление тут
    # answers - FK

    # метод-свойство для определения результатов голосования.
    # Выдаёт среднее арифметическое всех оценок из answers
    @property
    def rating(self):
        rating = self.answers.aggregate(rate=models.Avg('rating'))['rate']
        return round(rating, 1) if rating else 0


class Answer(models.Model):
    rating = models.IntegerField(default=0)
    wishes = models.TextField(null=True, blank=True)
    data_time = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')

