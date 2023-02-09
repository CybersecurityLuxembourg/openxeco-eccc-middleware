import time
from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
import json
from flask_jwt_extended import jwt_required

from decorator.catch_exception import catch_exception
from utils.request import get_request_eccc
from config.config import ECCC_API_KEY


class GetRegistrations(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get registrations from the ECCC API',
         responses={
             "200": {},
             "500.a": {"description": "No user found linked to the API key"},
             "500.b": {"description": "Too many users found linked to the API key"},
             "500.c": {"description": "Error while parsing the ECCC user information"},
         })
    @jwt_required
    @catch_exception
    def get(self):

        r = get_request_eccc(
            "jsonapi/user/user",
            params={
                "filter[api_key][value]": ECCC_API_KEY,
                "timestamp": time.time(),
            }
        )

        users = json.loads(r.content)["data"]

        if len(users) == 0:
            return "", "500 No user found linked to the API key"

        if len(users) > 1:
            return "", "500 Too many users found linked to the API key"

        if "attributes" not in users[0] \
            or "drupal_internal__uid" not in users[0]["attributes"] \
            or users[0]["attributes"]["drupal_internal__uid"] is None:
            return "", "500 Error while parsing the ECCC user information"

        r = get_request_eccc(
            "jsonapi/node/cluster",
            params={
                "filter[uid.meta.drupal_internal__target_id]": users[0]["attributes"]["drupal_internal__uid"],
                "timestamp": time.time(),
            }
        )

        return json.loads(r.content), "200 "
