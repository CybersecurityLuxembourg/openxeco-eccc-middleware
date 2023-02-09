#!/bin/bash

exec gunicorn --preload --reload --chdir /usr/app --workers 1 --bind 0.0.0.0:5002 --log-level debug app:app