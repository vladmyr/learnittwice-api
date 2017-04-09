# variables
FILEPATH_PG_TEST=docker/docker-compose-pg-test.yml
FILEPATH_NEO4J_TEST=docker/docker-compose-neo4j-test.yml

# build & init
build-volumes:
	docker volume create --name=dockerlearnittwiceapi_postgres_data
	docker volume create --name=dockerlearnittwiceapi_postgres_test_data
	docker volume create --name=dockerlearnittwiceapi_neo4j_data
	docker volume create --name=dockerlearnittwiceapi_neo4j_test_data
build:
	docker-compose build
build-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) build
build-n4j-test:
	docker-compose -f $(FILEPATH_NEO4J_TEST) build

# containers' management
up:
	docker-compose up -d
down:
	docker-compose down
up-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) up -d
down-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) down
up-n4j-test:
	docker-compose -f $(FILEPATH_NEO4J_TEST) up -d
down-n4j-test:
	docker-compose -f $(FILEPATH_NEO4J_TEST) down

# accumulative
up-all:
	up up-pg-test
down-all:
	down down-pg-test