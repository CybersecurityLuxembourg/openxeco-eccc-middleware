from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
import json

from decorator.catch_exception import catch_exception
from utils.request import get_request_eccc


class GetRegistrations(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get registrations from the ECCC API',
         responses={
             "200": {},
         })
    @catch_exception
    def get(self):

        r = get_request_eccc("jsonapi/node/cluster")
        print(r.content)

        return json.loads(r.content), "200 "
