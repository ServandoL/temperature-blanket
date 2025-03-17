#!/bin/zsh
docker build -t temperature-blanket-ui .
docker run -p 9000:8080 --name temperature-blanket-ui -d temperature-blanket-ui
