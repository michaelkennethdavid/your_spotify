cd client && docker build -f Dockerfile.production . -t kenndavid/your_spotify_client:latest ; cd -
cd server && docker build -f Dockerfile.production . -t kenndavid/your_spotify_server:latest ; cd -