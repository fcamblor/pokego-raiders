FROM gradle:6.6.1-jdk11

COPY . /code
WORKDIR /code
VOLUME /output

CMD cd /code && ./gradlew build && cp build/libs/pokeraiders-api-*.jar /output/pokeraiders-api.jar
