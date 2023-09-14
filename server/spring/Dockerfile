FROM openjdk:11
COPY build/libs/*-SNAPSHOT.jar tripick.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","tripick.jar"]