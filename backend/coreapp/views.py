from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Author, Book
from .serializers import AuthorSerializer, BookSerializer
import traceback
import logging
from rest_framework.exceptions import ValidationError, NotFound
import requests

logger = logging.getLogger(__name__)


class AuthorListCreateAPIView(APIView):
    def get(self, request):
        try:
            logger.info("Fetching all authors")
            authors = Author.objects.filter(is_active=True).order_by("id")
            if not authors:
                return Response(
                    {
                        "success": False,
                        "message": "No author data found.",
                        "data": []
                    },
                    status=status.HTTP_204_NO_CONTENT
                )
            
            data = AuthorSerializer(authors, many=True).data
            return Response(
                {
                    "success": True,
                    "message": "Authors data fetched successfully.",
                    "data": data
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            traceback_info = traceback.format_exc()
            print(traceback_info)
            logger.error(f"Error occured: {str(e)}")
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": []
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        

    def post(self, request):
        try:
            logger.info("Creating author")
            serializer = AuthorSerializer(data=request.data)
            if serializer.is_valid():
                author = serializer.save()
                logger.info(f"Author created successfully: {author.id}")

                return Response(
                    {
                        "success": True,
                        "message": "Author created successfully",
                        "data": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            
            logger.warning(f"Validation failed: {serializer.errors}")
            return Response(
                {
                    "success": False,
                    "message": serializer.errors,
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
        except ValidationError as e:
            logger.error(f"ValidationError occurred: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class AuthorDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            logger.info("Fetching indivial author data.")
            author = Author.objects.filter(id=pk, is_active=True).first()

            if author is None:
                logger.warning(f"Author with id={pk} not found or inactive.")
                return Response(
                    {
                        "success": False,
                        "message": "Author not found.",
                        "data": {}
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            data = AuthorSerializer(author).data
            books = Book.objects.filter(author=pk, is_active=True)
            data["books"] = []
            
            if books is not None:
                for book in books:
                    data["books"].append(
                        {
                            "id": book.title,
                            "published_year": book.published_year,
                            "price": book.price
                        }
                    )
                    
            return Response(
                {
                    "success": True,
                    "message": "Author details fetched successfully.",
                    "data": data
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            logger.error(f"Error occured: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request, pk):
        try:
            logger.info("Fetching indivial author data.")
            author = Author.objects.filter(id=pk, is_active=True).first()
            if author is None:
                logger.warning(f"Author with id={pk} not found or inactive.")
                return Response(
                    {
                        "success": False,
                        "message": "Author not found.",
                        "data": {}
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = AuthorSerializer(author, data=request.data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Author updated successfully: {author.id}")
                return Response(
                    {
                        "success": True,
                        "message": "Author updated successfully",
                        "data": serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            
            logger.warning(f"Validation failed: {serializer.errors}")
            return Response(
                {
                    "success": False,
                    "message": serializer.errors,
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            logger.error(f"Error occured: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, pk):
        try:
            author = Author.objects.filter(id=pk, is_active=True).first()
            if author is None:
                logger.warning(f"Author with id={pk} not found or inactive.")
                return Response(
                    {
                        "success": False,
                        "message": "Author not found.",
                        "data": {}
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            
            author.is_active=False
            author.save()
            logger.info(f"Author with id={pk} deactivated successfully.")
            return Response(
                {
                    "success": True,
                    "message": "Author deactivated successfully.",
                    "data": {}
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(f"Error occured: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class BookListCreateAPIView(APIView):
    def get(self, request):
        try:
            logger.info("Fetching all books")
            books = Book.objects.filter(is_active=True)
            if not books:
                return Response(
                    {
                        "success": False,
                        "message": "No books data found.",
                        "data": []
                    },
                    status=status.HTTP_204_NO_CONTENT
                )
            
            data = BookSerializer(books, many=True).data
            return Response(
                {
                    "success": True,
                    "message": "books data fetched successfully.",
                    "data": data
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            traceback_info = traceback.format_exc()
            print(traceback_info)
            logger.error(f"Error occured: {str(e)}")
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": []
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        

    def post(self, request):
        try:
            logger.info("Creating book")
            serializer = BookSerializer(data=request.data)
            if serializer.is_valid():
                book = serializer.save()
                logger.info(f"book data created successfully: {book.id}")
                return Response(
                    {
                        "success": True,
                        "message": "book data created successfully",
                        "data": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            
            logger.warning(f"Validation failed: {serializer.errors}")
            return Response(
                {
                    "success": False,
                    "message": serializer.errors,
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
        except ValidationError as e:
            logger.error(f"ValidationError occurred: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        

class FetchAuthorInfoAPIView(APIView):
    def get(self, request, author_id):
        try:
            logger.info(f"Fetching Wikipedia info for author id={author_id}")
            author = Author.objects.filter(id=author_id, is_active=True).first() 
            if author is None:
                logger.warning(f"Author with id={author_id} not found or inactive.")
                return Response(
                    {
                        "success": False,
                        "message": "Author not found.",
                        "data": {}
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            page_title = author.name.strip()
            page_title = page_title.replace(" ", "_")
            page_title = page_title.replace(".", "")

            url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title}"
            logger.info(f"Requesting URL: {url}")
            headers = {
                "User-Agent": "MyDjangoApp/1.0 (admin@example.com)"
            }
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                logger.warning(f"No Wikipedia info found for {author.name}")
                return Response(
                    {
                        "success": False,
                        "message": "No Wikipedia info found.",
                        "data": {}
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            data = response.json()
            result = {
                "author": author.name,
                "bio": data.get("extract"),
                "page_url": data.get("content_urls", {}).get("desktop", {}).get("page")
            }

            logger.info(f"Wikipedia info fetched successfully for {author.name}")
            return Response(
                {
                    "success": True,
                    "message": "Wikipedia info fetched successfully.",
                    "data": result
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            traceback_info = traceback.format_exc()
            print(traceback_info)
            return Response(
                {
                    "success": False,
                    "message": str(e),
                    "data": {}
                },
                status=status.HTTP_400_BAD_REQUEST
            )
