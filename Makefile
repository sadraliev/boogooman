.PHONY: test

dev:
	npm run start:dev

test:
	npm run test

watch:
	npm run test:watch

up:
	docker-compose up -d

local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up redis postgres -d

down: 
	docker-compose down -v

rebuild:
	docker-compose up --build  -d

rebuild-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml  up --build  -d