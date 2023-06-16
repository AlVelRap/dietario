FROM node:19

# ENV NODE_ENV=production

# RUN mkdir -p /home/app

WORKDIR /home/backend

# RUN npm install mysql
# COPY ["package.json", "package-lock.json*", "./"]
COPY package.json .
# RUN npm install --production
RUN npm install

COPY . .

# EXPOSE 3000

# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# CMD npm start

# Comando + ruta_abosulta al archivo
CMD ["npm", "start"]