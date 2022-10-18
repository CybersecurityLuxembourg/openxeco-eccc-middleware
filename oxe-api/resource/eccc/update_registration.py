from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from decorator.catch_exception import catch_exception
from utils.request import patch_request_eccc


class UpdateRegistration(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Update registration via the ECCC API',
         responses={
             "200": {},
         })
    @jwt_required
    @catch_exception
    def post(self):

        r = patch_request_eccc("jsonapi/node/cluster")

        return r.content, "200 "
