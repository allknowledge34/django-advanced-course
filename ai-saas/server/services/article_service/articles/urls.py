from django.urls import path
from .views import ArticleGenerateView

urlpatterns = [
    path('generate/', ArticleGenerateView.as_view(), name='generate_article'),
]
