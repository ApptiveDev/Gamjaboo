FROM gradle:jdk17-alpine AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test


FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/build/libs/*jar server.jar
CMD ["java", "-jar","./server.jar"]
