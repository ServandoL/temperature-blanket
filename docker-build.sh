#!/bin/zsh
docker build -t temperature-blanket-ui .
docker run --name temperature-blanket-ui -d temperature-blanket-ui
