from urllib3 import ProxyManager
from urllib import request
import requests

from config.config import HTTP_PROXY
from config.config import \
    OPENXECO_API_ENDPOINT, \
    ECCC_API_ENDPOINT, \
    ECCC_API_KEY, \
    ECCC_HTTP_AUTH_LOGIN, \
    ECCC_HTTP_AUTH_PASS


def get_request(target):
    if HTTP_PROXY is not None:
        http = ProxyManager(HTTP_PROXY)
        response = http.request('GET', target)
        return response.data
    response = request.urlopen(target)  # nosec
    return response.read()


def get_request_oxe(target, jwt=None):
    url = f"{OPENXECO_API_ENDPOINT}{target}{'?jwt=' + jwt if jwt else ''}"
    r = requests.get(
        url,
        allow_redirects=True,
    )
    return r


def post_request_oxe(target, data, jwt=None):
    url = f"{OPENXECO_API_ENDPOINT}{target}{'?jwt=' + jwt if jwt else ''}"
    r = requests.post(
        url,
        data=data,
        allow_redirects=True,
    )
    return r


def patch_request_oxe(target, data, jwt=None):
    url = f"{OPENXECO_API_ENDPOINT}{target}{'?jwt=' + jwt if jwt else ''}"
    r = requests.patch(
        url,
        data=data,
        allow_redirects=True,
    )
    return r


def get_request_eccc(target, with_api_key=True, with_http_auth=True, params={}):
    url = f"{ECCC_API_ENDPOINT}{target}"
    r = requests.get(
        url,
        params={**params, **({"api-key": ECCC_API_KEY} if with_api_key else {})},
        allow_redirects=True,
        auth=requests.auth.HTTPBasicAuth(ECCC_HTTP_AUTH_LOGIN, ECCC_HTTP_AUTH_PASS)
        if with_http_auth and ECCC_HTTP_AUTH_LOGIN is not None
        else None
    )
    return r


def post_request_eccc(target, data, with_api_key=True, with_http_auth=True):
    url = f"{ECCC_API_ENDPOINT}{target}{'?api-key=' + ECCC_API_KEY if with_api_key else ''}"
    r = requests.post(
        url,
        headers={
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
        },
        data=data,
        allow_redirects=True,
        auth=requests.auth.HTTPBasicAuth(ECCC_HTTP_AUTH_LOGIN, ECCC_HTTP_AUTH_PASS)
        if with_http_auth and ECCC_HTTP_AUTH_LOGIN is not None
        else None
    )
    return r


def patch_request_eccc(target, data, with_api_key=True, with_http_auth=True):
    url = f"{ECCC_API_ENDPOINT}{target}{'?api-key=' + ECCC_API_KEY if with_api_key else ''}"
    r = requests.patch(
        url,
        headers={
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
        },
        data=data,
        allow_redirects=True,
        auth=requests.auth.HTTPBasicAuth(ECCC_HTTP_AUTH_LOGIN, ECCC_HTTP_AUTH_PASS)
        if with_http_auth and ECCC_HTTP_AUTH_LOGIN is not None
        else None
    )
    return r
