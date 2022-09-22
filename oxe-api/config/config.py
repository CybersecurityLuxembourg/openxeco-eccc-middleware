"""
This file not meant to be modified to configure a local nor a production instance.
To configure the instance, please consider:
    - editing a ".env" file at the root of the "oxe-api" directory
    - passing the environment variables via "-e" flag if you use a docker container
"""
import os
from dotenv import load_dotenv


load_dotenv()


def _getenv(key, default=None, mandatory=True):
    if mandatory:
        if key in os.environ or default is not None:
            return os.getenv(key, default)
        raise KeyError("environment variable '%s' not set" % key)
    return os.getenv(key, default)


ENVIRONMENT             = _getenv('ENVIRONMENT',            default='dev')
PORT                    = _getenv('PORT',                   default='5002')

OPENXECO_API_ENDPOINT   = _getenv('OPENXECO_API_ENDPOINT',  mandatory=True)

ECCC_API_ENDPOINT       = _getenv('ECCC_API_ENDPOINT',      mandatory=True)
ECCC_API_KEY            = _getenv('ECCC_API_KEY',           mandatory=True)
ECCC_HTTP_AUTH_LOGIN    = _getenv('ECCC_HTTP_AUTH_LOGIN',   mandatory=False, default=None)
ECCC_HTTP_AUTH_PASS     = _getenv('ECCC_HTTP_AUTH_PASS',    mandatory=False, default=None)

HTTP_PROXY              = _getenv('HTTP_PROXY',             mandatory=False)

CORS_DOMAINS            = _getenv('CORS_DOMAINS',
                                  mandatory=ENVIRONMENT != "dev",
                                  default="localhost:\\d*" if ENVIRONMENT == "dev" else None)

# remove extra spaces, remove empty items
domains = filter(len, map(str.strip, CORS_DOMAINS.split(",")))
# pylint: disable=unnecessary-lambda
CORS_ORIGINS = list(map(lambda d: r'((http|https)://)?(.*\.)?{}'.format(d), domains))
