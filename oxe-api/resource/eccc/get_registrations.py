import time
from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
import json
from flask_jwt_extended import jwt_required

from decorator.catch_exception import catch_exception
from utils.request import get_request_eccc


class GetRegistrations(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get registrations from the ECCC API',
         responses={
             "200": {},
             "500.a": {"description": "No user ID found linked to the API key"},
         })
    @jwt_required
    @catch_exception
    def get(self):

        r = get_request_eccc(
            "jsonapi",
            params={
                "timestamp": time.time(),
            }
        )

        try:
            user_id = json.loads(r.content)["meta"]["links"]["me"]["meta"]["id"]
        except KeyError:
            return "", "500 No user ID found linked to the API key"

        r = get_request_eccc(
            "jsonapi/node/cluster",
            params={
                "filter[uid.id][value]": user_id,
                "timestamp": time.time(),
            }
        )

        return json.loads(r.content), "200 "
