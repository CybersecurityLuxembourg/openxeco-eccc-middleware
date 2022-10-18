from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from decorator.catch_exception import catch_exception
from utils.request import get_request_eccc


class GetStatus(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get status of the ECCC API',
         responses={
             "200": {},
         })
    @jwt_required
    @catch_exception
    def get(self):

        message = "OK"

        try:
            r = get_request_eccc("jsonapi/taxonomy_term/activities_of_interest")

            if r.status_code != 200:
                message = f"The ECCC API returned code {r.status_code}"
        except Exception:
            message = "The ECCC API seems unreachable. Please review the configuration of the middleware API " \
                      "or the network access"

        return message, "200 "
