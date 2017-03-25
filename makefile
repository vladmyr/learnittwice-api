# variables
FILEPATH_DEFAUTL=docker/docker-compose.yml
FILEPATH_PG_TEST=docker/docker-compose-pg-test.yml

# build & init
build-volumes:
	docker volume create --name=dockerlearnittwiceapi_postgres_data
	docker volume create --name=dockerlearnittwiceapi_postgres_test_data
	docker volume create --name=dockerlearnittwiceapi_postgres_neo4j_data
build:
	docker-compose -f $(FILEPATH_DEFAUTL) build
build-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) build

# containers' management
up:
	docker-compose -f $(FILEPATH_DEFAUTL) up -d
down:
	docker-compose -f $(FILEPATH_DEFAUTL) down
up-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) up -d
down-pg-test:
	docker-compose -f $(FILEPATH_PG_TEST) down

# accumulative
up-all:
	up up-pg-test
down-all:
	down down-pg-test