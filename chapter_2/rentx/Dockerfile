#imagem que será instalada, podemos ver mais aqui https://hub.docker.com/search
FROM node

#Workdir diretorio que queremos que nossas infos sejam contidas.
WORKDIR /usr/app

#Copiamos o package json e nao o nodemodules todo, assim o container vai ter que baixar as dependencias
COPY package.json ./

#para baixar as dependencias(poderia ser o Yarn? sim se a imagem tivesse ele)
RUN npm install --force

#Copia tudo que tem aqui para a pasta WORKDIR
COPY . ./

#Abre a porta 3333
EXPOSE 3333

#Roda o script de dev/ npm run dev
CMD ["npm","run","dev"]