# Use official Python image
FROM python:3.12-slim

# Set working dir
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Expose port
EXPOSE 8000

# Use Gunicorn on Render
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
