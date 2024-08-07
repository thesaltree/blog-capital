COMPOSE_FILE := compose.yaml

.PHONY: all
all: up
DB_SERVICE := db
DB_NAME := main_db
DB_USER := user
DB_PASSWORD := password  # Set your development password here

# Start the application
.PHONY: up
up:
	docker-compose -f $(COMPOSE_FILE) up -d

# Stop the application
.PHONY: down
down:
	docker-compose -f $(COMPOSE_FILE) down

# Rebuild and start the application
.PHONY: build
build:
	docker-compose -f $(COMPOSE_FILE) up -d --build

# Show logs
.PHONY: logs
logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

# Clean up
.PHONY: clean
clean:
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans

# Run tests
.PHONY: test
test:
	@echo "Running tests..."
	# TODO: Add tests

# Access MySQL shell
.PHONY: db-shell
db-shell:
	docker-compose -f $(COMPOSE_FILE) exec $(DB_SERVICE) mysql -u$(DB_USER) -p$(DB_PASSWORD) $(DB_NAME)

# Help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make up         - Start the application"
	@echo "  make down       - Stop the application"
	@echo "  make build      - Rebuild and start the application"
	@echo "  make logs       - Show logs"
	@echo "  make clean      - Clean up containers and volumes"
	@echo "  make test       - Run tests"
	@echo "  make db-shell   - Access MySQL shell"