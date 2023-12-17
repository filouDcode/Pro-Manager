FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
# RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# construit l'app pour la production en la minifiant
# RUN npm run build

# Expose the port the app runs in
EXPOSE 8080

# serve the app
# CMD [ "http-server", "dist" ]
