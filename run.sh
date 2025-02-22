#!/bin/bash
exec nginx -g 'daemon off;'
exec node /usr/share/app/index.js
