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
            "fields_of_activity",
            "sectors",
            "technologies",
            "use_cases",
            "assurance_audit_certification",
            "cryptology",
            "data_security_and_privacy",
            "education_and_training",
            "human_aspects",
            "identity_and_access_management",
            "op_incident_handling_forensics",
            "legal_aspects",
            "network_and_distributed_systems",
            "security_management_and_governan",
            "security_measurements",
            "soft_and_hard_sec_engineering",
            "steganography_steganalysis_and_w",
            "theoretical_foundations",
            "trust_management_accountability",
        ]

        for t in taxonomies:
            r = get_request_eccc(f"jsonapi/taxonomy_term/{t}")
            r = json.loads(r.content)

            data[t] = {a["id"]: a["attributes"]["name"] for a in r["data"]}

        return data, "200 "
