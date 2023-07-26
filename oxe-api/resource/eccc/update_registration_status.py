from flask_apispec import MethodResource
from flask_apispec import use_kwargs, doc
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from webargs import fields
import json

from decorator.catch_exception import catch_exception
from utils.request import patch_request_eccc


class UpdateRegistrationStatus(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Update registration via the ECCC API',
         responses={
             "200": {},
         })
    @use_kwargs({
        'id': fields.Str(required=True),
        'status': fields.Str(required=True, validate=lambda x: x in ['draft', 'ready_for_publication']),
    })
    @jwt_required
    @catch_exception
    def post(self, **kwargs):

        body = {
            "data": {
                "id": kwargs['id'],
                "type": "node--cluster",
                "attributes": {
                    "moderation_state": kwargs['status'],
                }
            },
        }

        r = patch_request_eccc(f"jsonapi/node/cluster/{kwargs['id']}", json.dumps(body))

        if r.status_code != 200:
            return "", f"{r.status_code} ECCC API ERROR: {r.text}"

        return json.loads(r.content), "200 "
