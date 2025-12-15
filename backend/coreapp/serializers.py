from rest_framework import serializers
from .models import Author, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    created_at = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)

    class Meta:
        model = Book
        fields = [
            "id", "title", "description",
            "published_year", "price",
            "author", "author_name", "created_at"
        ]
