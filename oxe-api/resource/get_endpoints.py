from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource

from decorator.catch_exception import catch_exception
from config.config import OPENXECO_API_ENDPOINT, ECCC_API_ENDPOINT


class GetEndpoints(MethodResource, Resource):

    @doc(tags=[],
         description='Get endpoints of openXeco API and ECCC API',
         responses={
             "200": {},
         })
    @catch_exception
    def get(self):

        data = {
            "openxeco": OPENXECO_API_ENDPOINT,
            "eccc": ECCC_API_ENDPOINT,
        }

        return data, "200 "
