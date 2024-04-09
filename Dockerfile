# Official Nginx image
FROM nginx:latest

# Copy your index.html file to the default Nginx HTML directory
COPY index.html /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

