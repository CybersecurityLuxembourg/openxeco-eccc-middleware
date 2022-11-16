![logo](./static/cyberlux-logo.jpg?raw=true "CYBERSECURITY Luxembourg")

<table>
<tr>
  <td>API checks</td>
</tr>
<tr>
  <td>Container builder</td>
  <td><a href="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_docker.yml"><img src="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_docker.yml/badge.svg" /></a></td>
</tr>
<tr>
  <td>Bandit Workflow</td>
  <td><a href="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_pycqa-bandit.yml"><img src="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_pycqa-bandit.yml/badge.svg" /></a></td>
</tr>
<tr>
  <td>Prospector Workflow</td>
  <td><a href="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_pycqa-prospector.yml"><img src="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-api_pycqa-prospector.yml/badge.svg" /></a></td>
</tr>
</table>

<table>
<tr>
  <td>Web application</td>
</tr>
<tr>
  <td>Package builder</td>
  <td><a href="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-web_package.yml"><img src="https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/actions/workflows/oxe-web.yml/badge.svg" /></a></td>
</tr>
</table>

<table>
<tr>
  <td>Licence</td>
</tr>
<tr>
  <td>FOSSA</td>
  <td><a href="https://app.fossa.com/projects/git%2Bgithub.com%2FCybersecurityLuxembourg%2Fopenxeco-eccc-middleware?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FCybersecurityLuxembourg%2Fopenxeco-eccc-middleware.svg?type=shield"/></a></td>
</tr>
</table>

<table>
<tr>
  <td>Social networks</td>
</tr>
<tr>
  <td>Twitter</td>
  <td><a href="https://twitter.com/cyberluxembourg"><img src="https://img.shields.io/twitter/follow/cyberluxembourg.svg?style=social&label=Follow" /></a></td>
</tr>
</table>

# Set up an instance

## For development

To set up the dev environment, please see those sub-project README files:

- [oxe-api/README.md](oxe-api/README.md)
- [oxe-web/README.md](oxe-web/README.md)

## For testers

If you want to set up a local instance to test the project, please follow these instructions:

### Install docker

[Get Docker](https://docs.docker.com/get-docker/)

Linux:

```
$ sudo mkdir -p /etc/apt/keyrings/
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
$ sudo adduser <your-oxe-user> docker
$ newgrp docker
# If you want to verify your docker install run: docker run hello-world
```

### Install and run the openXeco containers and its dependencies

```
$ docker network create openxeco
$ docker build \
    -f openxeco-eccc-middleware-oxe-web/Dockerfile \
    -t oxe-web \
    --build-arg TARGET_DIR=openxeco-eccc-middleware-oxe-web \
    https://github.com/CybersecurityLuxembourg/openxeco-eccc-middleware/releases/latest/download/openxeco-eccc-middleware-oxe-web.tar.gz
$ docker run -d -p 3000:80 oxe-web
$ docker run -d -p 5000:5000 \
    --network openxeco \
    -e ENVIRONMENT=dev \
    -e JWT_SECRET_KEY=my_secret_developer_key \
    -e OPENXECO_API_ENDPOINT=http://localhost:5000/ \
    -e ECCC_API_ENDPOINT=http://eccc.example.com/ \
    -e ECCC_API_KEY=ECCC_EXAMPLE_KEY \
    ghcr.io/cybersecurityluxembourg/openxeco-eccc-middleware-oxe-api:latest
```

### Enjoy the solution

Access the user interface:
- http://localhost:3006

Access the API documentation:
- http://localhost:5002
