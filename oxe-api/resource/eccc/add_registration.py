from flask_apispec import MethodResource
from flask_apispec import use_kwargs, doc
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from webargs import fields
import json

from decorator.catch_exception import catch_exception
from utils.request import post_request_eccc
from utils.request import get_request_eccc


class AddRegistration(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Add registration via the ECCC API',
         responses={
             "200": {},
         })
    @use_kwargs({
        'body': fields.Dict(),
    })
    @jwt_required
    @catch_exception
    def post(self, **kwargs):

        # Checking mandatory fields

        if "attributes" not in kwargs["body"]:
            return "", "400 'attributes' key not found in 'body' argument"
        if "relationships" not in kwargs["body"]:
            return "", "400 'relationships' key not found in 'body' argument"

        if "title" not in kwargs["body"]["attributes"]:
            return "", "400 'title' key not found in 'body.attributes' argument"
        if "field_iot_org_pic" not in kwargs["body"]["attributes"]:
            return "", "400 'field_iot_org_pic' key not found in 'body.attributes' argument"
        if "field_address" not in kwargs["body"]["attributes"]:
            return "", "400 'field_address' key not found in 'body.attributes' argument"
        if "country_code" not in kwargs["body"]["attributes"]["field_address"]:
            return "", "400 'country_code' key not found in 'body.attributes.field_address' argument"
        if "address_line1" not in kwargs["body"]["attributes"]["field_address"]:
            return "", "400 'address_line1' key not found in 'body.attributes.field_address' argument"

        # Checking if organisation with same registration number is not existing

        registrations = get_request_eccc("jsonapi/node/cluster")
        registrations = json.loads(registrations.content)["data"]

        try:
            filtered_registrations = [
                r for r in registrations
                if r["attributes"]["field_iot_org_pic"] == kwargs["body"]["attributes"]["field_iot_org_pic"]
            ]
        except Exception:
            return "", "500 Failed to parse the registrations from the ECCC endpoint"

        if len(filtered_registrations) > 0:
            return "", "400 Organisation already existing with this registration number"

        # Copying country in mandatory field

        eccc_countries = get_request_eccc("jsonapi/taxonomy_term/country")
        eccc_countries = json.loads(eccc_countries.content)["data"]

        try:
            filtered_countries = [
                c for c in eccc_countries
                if c["attributes"]["field_iso_code"] == kwargs["body"]["attributes"]["field_address"]["country_code"]
            ]
        except Exception:
            return "", "500 Failed to parse the countries from the ECCC endpoint"

        if len(filtered_countries) == 0:
            return "", "400 No country found with the provided country code"

        kwargs["body"]["relationships"]["field_country"] = {
            "data": {
                "type": "taxonomy_term--country",
                "id": filtered_countries[0].id
            }
        }

        # Body building

        kwargs["body"]["type"] = "node--cluster"

        body = {
            "data": kwargs["body"],
        }

        # Query ECCC endpoint

        r = post_request_eccc("jsonapi/node/cluster", body)

        if r.status_code != 200:
            return "", f"{r.status_code} ECCC API ERROR: {r.text}"

        return r.content, "200 "
