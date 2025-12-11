from django.urls import path
from .views import (
    AuthorListCreateAPIView, AuthorDetailAPIView, BookListCreateAPIView, 
    FetchAuthorInfoAPIView
)


urlpatterns = [
    path("authors/", AuthorListCreateAPIView.as_view(), name='authors'),
    path("author/<int:pk>/", AuthorDetailAPIView.as_view(), name='author-details'),
    path("books/", BookListCreateAPIView.as_view(), name='books'),
    path("authors/<int:author_id>/wiki-info/", FetchAuthorInfoAPIView.as_view()),
]