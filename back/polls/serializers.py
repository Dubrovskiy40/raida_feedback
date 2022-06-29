from rest_framework import serializers
from .models import *


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'questions_lists']


class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'name', 'description',
                  'min_rate_desc', 'max_rate_desc', 'thanks_text', 'main_color',
                  'thanks_color', 'bg_color', 'thanks_bg_color', 'position', 'size',
                  'questions', ]


class TemplateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'


class QuestionsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionsList
        fields = ['id', 'title', 'description', 'project', 'questions']


class QuestionsListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionsList
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'title', 'description',
                  'min_rate_desc', 'max_rate_desc', 'thanks_text', 'main_color',
                  'thanks_color', 'bg_color', 'thanks_bg_color', 'position', 'size',
                  'questions_list', 'template', 'rating', 'answers', ]


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['rating', 'wishes', 'data_time', 'question']
