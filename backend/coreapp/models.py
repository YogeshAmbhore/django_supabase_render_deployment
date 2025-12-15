from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    birth_year = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'Authors'

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    published_year = models.IntegerField(null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'Books'

    def __str__(self):
        return self.title