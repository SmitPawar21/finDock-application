# Step 1: Use OpenJDK as base image
FROM openjdk:22-jdk

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy the JAR file from target folder into container
COPY target/*.jar app.jar

# Step 4: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]