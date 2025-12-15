FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--reload"]


# for production
# CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]



# when working with nginx access admin page and DRF through this 
# http://localhost/admin/login/?next=/admin/
# http://localhost/api/authors/