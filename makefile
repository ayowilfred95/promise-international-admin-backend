docker_run:
	docker run -p 8000:8000 -v "$(pwd):/app" -v /app/node_modules school-portal npm start
 
