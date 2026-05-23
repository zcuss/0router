docker stop 0Router
docker rm 0Router
docker build -t 0Router .
docker run -d --name 0Router -p 20128:20128 --env-file .env -v 0Router-data:/app/data 0Router