#!bin/bash

# Prebuilding the client application
cd ./client-app/
npm run build
cp -R ~/client-app/build/* ~/server-api/

# Initializing the docker containers
cd ~/database/
docker pull knaralasetty/database:latest
docker run -d -p 5000:3306 --name db database:latest
docker start db
# The above docer container already has a shell script in it, "startup.sh"
# exec into that shell and run that script using "bash ./startup.sh"

# Get the ip address of the database container by running the below
# docker inspect <container id> | grep IPAddress | cat > ./new.txt
# cat ./new.txt
# Now add this address as the host address into the 
# dbConnect.js file in server-api folder

cd ~/server-api/
docker build -t ndsrv:latest .
docker run -it -v ${PWD}:/app -p 4000:4000 -e CHOKIDAR_USEPOLLING=true --name nd ndsrv:latest

# if you stop the node server, then you can just start it back up by
# running : docker start nd