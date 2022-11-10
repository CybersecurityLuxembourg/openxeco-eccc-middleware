from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
import json
from flask_jwt_extended import jwt_required

from decorator.catch_exception import catch_exception
from utils.request import get_request_eccc


class GetTaxonomies(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get taxonomies from the ECCC API',
         responses={
             "200": {},
         })
    @jwt_required
    @catch_exception
    def get(self):

        data = {}

        taxonomies = [
            "country",
            "cluster_type",
            "cluster_thematic_area",
            "field_of_activity"
        ]

        for t in taxonomies:
            r = get_request_eccc(f"taxonomy_term/{t}")
            r = json.loads(r.content)

            data[t] = [a["attributes"]["name"] for a in r.data]

        return data, "200 "
