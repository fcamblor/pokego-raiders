#!/bin/sh

# Set the metadata server to the get projct id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
BUCKET=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/BUCKET" -H "Metadata-Flavor: Google")
RECAPTCHA_SECRET=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/RECAPTCHA_SECRET" -H "Metadata-Flavor: Google")
DATASOURCE_URL=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/DATASOURCE_URL" -H "Metadata-Flavor: Google")
PG_USER=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/PG_USER" -H "Metadata-Flavor: Google")
PG_PASSWORD=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/PG_PASSWORD" -H "Metadata-Flavor: Google")
BUCKET_PATH=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/attributes/BUCKET_PATH" -H "Metadata-Flavor: Google")

echo "Project ID: ${PROJECTID} Bucket: ${BUCKET}"

# Get the files we need
gsutil cp $BUCKET_PATH ./pokeraiders-api.jar

# Install dependencies
apt-get update
apt-get -y --force-yes install openjdk-11-jdk

# Make Java 8 default
update-alternatives --set java /usr/lib/jvm/java-11-openjdk-amd64/jre/bin/java

# Start server
java "-Dgoogle.recaptcha.secret=$RECAPTCHA_SECRET" "-Dspring.datasource.url=$DATASOURCE_URL" "-Dspring.datasource.username=$PG_USER" "-Dspring.datasource.password=$PG_PASSWORD" -jar pokeraiders-api.jar
