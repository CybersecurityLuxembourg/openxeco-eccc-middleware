from flask import Flask, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec

import socket
import sys

from config import config  # pylint: disable=wrong-import-position

# Init Flask and set config
app = Flask(__name__)

app.config["ERROR_404_HELP"] = False

app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
app.config["JWT_TOKEN_LOCATION"] = ['headers', 'cookies', 'query_string']
app.config["JWT_COOKIE_SECURE"] = config.ENVIRONMENT != "dev"
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
app.config["CORS_ORIGINS"] = config.CORS_ORIGINS if config.CORS_ORIGINS else []

app.config['PROPAGATE_EXCEPTIONS'] = config.ENVIRONMENT == "dev"

app.config['APISPEC_SWAGGER_URL'] = '/doc/json'
app.config['APISPEC_SWAGGER_UI_URL'] = '/doc'
app.config['APISPEC_SPEC'] = APISpec(
    title='openXeco ECCC middleware',
    version='v0.1',
    plugins=[MarshmallowPlugin()],
    openapi_version='2.0.0'
)

# Add additional plugins
cors = CORS(app)
jwt = JWTManager(app)
docs = FlaskApiSpec(app)

# Init and set the resources for Flask
api = Api(app)


@app.route('/<generic>')
def undefined_route(_):
    return '', 404


@app.route('/')
def root_route():
    return redirect("/doc", code=302)


def check_port():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(3)
    result = sock.connect_ex(('127.0.0.1', int(config.PORT)))
    if result == 0:
        sys.exit(f"Port {config.PORT} is used, maybe you are already running a docker container?")


if __name__ in ('app', '__main__'):
    # check_port()

    from routes import set_routes
    set_routes({"api": api, "docs": docs})

    app.debug = config.ENVIRONMENT == "dev"
    if __name__ == "__main__":
        app.run(port=int(config.PORT))
