import sys

from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from polls.serializers import *
import logging


# Создаём логгер
logger = logging.getLogger(__name__)


class TemplateViewset(viewsets.ModelViewSet):
    """Шаблоны"""
    queryset = Template.objects.all()
    serializer_class = {
        'create': TemplateCreateSerializer,
    }

    default_serializer = TemplateSerializer

    def get_serializer_class(self):
        return self.serializer_class.get(self.action, self.default_serializer)


class ProjectVewset(viewsets.ModelViewSet):
    """Проекты"""
    queryset = Project.objects.all()
    serializer_class = {
        'create': ProjectCreateSerializer,
    }

    default_serializer = ProjectSerializer

    def get_serializer_class(self):
        return self.serializer_class.get(self.action, self.default_serializer)


class QuestionsListViewset(viewsets.ModelViewSet):
    """Списки вопросов"""
    queryset = QuestionsList.objects.all()
    serializer_class = {
        'create': QuestionsListCreateSerializer,
    }

    default_serializer = QuestionsListSerializer

    def get_serializer_class(self):
        return self.serializer_class.get(self.action, self.default_serializer)


class QuestionViewset(viewsets.ModelViewSet):
    """Вопросы"""
    queryset = Question.objects.all()
    serializer_class = {
        'create': QuestionCreateSerializer,
    }

    default_serializer = QuestionSerializer

    def get_serializer_class(self):
        return self.serializer_class.get(self.action, self.default_serializer)

    @action(detail=True)
    def answers(self, request, pk=None):
        """Отображение ответов на конкретный вопрос"""
        queryset = Question.objects.all()  # берём базовый кверисет
        question = get_object_or_404(queryset, pk=pk)  # вытаскиваем конкретный вопрос
        answers = Answer.objects.filter(question=question)  # фильтруем ответы по этому вопросу
        serializer = AnswerSerializer(answers, many=True)  # прогоняем через сериалайзер ответов
        return Response(serializer.data)  # возвращаем их


class AnswersViewset(viewsets.ModelViewSet):
    """Ответы на вопросы"""
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
