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


ENVIRONMENT         = _getenv('ENVIRONMENT',    default='dev')
PORT                = _getenv('PORT',           default='5002')

HTTP_PROXY          = _getenv('HTTP_PROXY', mandatory=False)

CORS_DOMAINS        = _getenv('CORS_DOMAINS',
                              mandatory=ENVIRONMENT != "dev",
                              default="localhost:\\d*" if ENVIRONMENT == "dev" else None)

OPENXECO_API        = _getenv('OPENXECO_API',   default='http://localhost:5000')
ECCC_API            = _getenv('ECCC_API',       default='http://localhost:5000')

# remove extra spaces, remove empty items
domains = filter(len, map(str.strip, CORS_DOMAINS.split(",")))
# pylint: disable=unnecessary-lambda
CORS_ORIGINS = list(map(lambda d: r'((http|https)://)?(.*\.)?{}'.format(d), domains))
