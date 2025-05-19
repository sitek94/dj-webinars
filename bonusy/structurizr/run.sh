#! /bin/bash

docker pull structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./e-commerce-simple:/usr/local/structurizr structurizr/lite
docker run -it --rm -p 8080:8080 -v ./e-commerce-complex:/usr/local/structurizr structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./official-examples/amazon-web-services:/usr/local/structurizr structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./official-examples/big-bank-plc:/usr/local/structurizr structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./official-examples/financial-risk-system:/usr/local/structurizr structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./official-examples/getting-started:/usr/local/structurizr structurizr/lite
# docker run -it --rm -p 8080:8080 -v ./official-examples/microservices:/usr/local/structurizr structurizr/lite
