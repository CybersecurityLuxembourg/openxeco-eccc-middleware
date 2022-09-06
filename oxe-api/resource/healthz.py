from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource

from decorator.catch_exception import catch_exception


class Healthz(MethodResource, Resource):

    @doc(tags=['status'],
         description='Get the status of the server',
         responses={
             "200": {},
         })
    @catch_exception
    def get(self):
        return "True", "200 "
