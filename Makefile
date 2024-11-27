up:
	@docker compose up

down:
	@docker compose down

build:
	@docker compose build

bash:
	@docker exec -it app-server-1 bash

psql:
	@docker exec app-postgres-1 psql postgres postgres