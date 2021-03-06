"""feedback_test URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from polls import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.urlpatterns import format_suffix_patterns


# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'projects', views.ProjectVewset)
router.register(r'questions_lists', views.QuestionsListViewset)
router.register(r'questions', views.QuestionViewset)
router.register(r'answers', views.AnswersViewset)
router.register(r'templates', views.TemplateViewset)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    # OpenAPI 3 documentation with Swagger UI
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(template_name="swagger-ui.html", url_name="schema"), name="swagger-ui",),

]

# urlpatterns = format_suffix_patterns(urlpatterns)
