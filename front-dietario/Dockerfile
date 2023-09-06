FROM node:20-alpine as builder

# ARG PORT
# ARG DOMAIN

# ENV PORT=${PORT}
# ENV DOMAIN=${DOMAIN}

# instalar un simple servidor http para servir nuestro contenido estático
# RUN npm install -g http-server

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN npm run build

FROM nginx:alpine as production-build

# Añadimos el fichero de configuracion de nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Eliminamos el index previo
RUN rm -rf /usr/share/nginx/html/*

# copiamos el fichero del apartado anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]