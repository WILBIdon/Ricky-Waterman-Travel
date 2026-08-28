FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy static site files
COPY . /usr/share/nginx/html/

# Railway assigns a dynamic port via $PORT env variable
# nginx:alpine docker image uses envsubst to replace $PORT in templates automatically
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
