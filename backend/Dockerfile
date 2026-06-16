# Шаг 1: Сборка `.jar` файла с помощью Maven и Java 21 без тестов
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Шаг 2: Запуск готового Spring Boot приложения
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]