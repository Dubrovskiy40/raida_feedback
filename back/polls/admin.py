from django.contrib import admin

from .models import Project
from .models import QuestionsList
from .models import Template
from .models import Question
from .models import Answer

admin.site.register(Project)
admin.site.register(QuestionsList)
admin.site.register(Template)
admin.site.register(Question)
admin.site.register(Answer)
