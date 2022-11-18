ARG PYTHON_VERSION=3.8-slim-buster
FROM python:$PYTHON_VERSION

ENV PYTHONUNBUFFERED=1

ARG ENVIRONMENT=production

ENV JWT_SECRET_KEY=k3y_t0_ch4ng3_2A845

WORKDIR /app

RUN pip install gunicorn[gevent]

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY decorator      /app/decorator
COPY resource       /app/resource
COPY utils          /app/utils

COPY routes.py      /app/
COPY app.py 		/app/app.py

COPY config         /app/config
COPY docker/entrypoint.sh /entrypoint.sh

EXPOSE 5002

ENTRYPOINT ["tail", "-f", "/dev/null"]