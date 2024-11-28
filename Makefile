up:
	@docker compose up

down:
	@docker compose down

build:
	@docker compose build

bash:
	@docker exec -it $(shell docker compose ps -q server) bash

psql:
	@docker exec -it $(shell docker compose ps -q postgres) psql -U postgres -d postgres
	