dev:
	docker-compose up webserver backend redis mongo
dev2:
	docker-compose up redis_dev2 mongo_dev2
prod:
	docker-compose up -d webserver backend redis mongo
down:
	docker-compose down