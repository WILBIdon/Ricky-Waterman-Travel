FROM nginx:alpine

# Copy static assets into nginx
COPY . /usr/share/nginx/html/

# Expose port 80 (Railway will route traffic here)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
