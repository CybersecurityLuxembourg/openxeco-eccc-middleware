#!/bin/bash

exec gunicorn --chdir /app --workers 1 --bind 0.0.0.0:5002 app:app