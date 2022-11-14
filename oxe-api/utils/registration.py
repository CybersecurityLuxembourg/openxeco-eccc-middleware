import json
from utils.request import get_request_eccc


@staticmethod
def manage_country(kwargs):
    eccc_countries = get_request_eccc("jsonapi/taxonomy_term/country")
    eccc_countries = json.loads(eccc_countries.content)["data"]

    try:
        filtered_countries = [
            c for c in eccc_countries
            if c["attributes"]["name"] == kwargs["body"]["attributes"]["field_address"]["country_code"]
        ]
    except Exception:
        return "", "500 Failed to parse the countries from the ECCC endpoint"

    if len(filtered_countries) == 0:
        return "", "400 No country found with the provided country code"

    kwargs["body"]["attributes"]["field_address"]["country_code"] = \
        filtered_countries[0]["attributes"]["field_iso_code"]

    kwargs["body"]["relationships"]["field_country"] = {
        "data": {
            "type": "taxonomy_term--country",
            "id": filtered_countries[0]["id"]
        }
    }

    return kwargs


@staticmethod
def manage_cluster_types(kwargs):
    if "field_cluster_type" in kwargs["body"]["relationships"]:
        eccc_cluster_types = get_request_eccc("jsonapi/taxonomy_term/cluster_type")
        eccc_cluster_types = json.loads(eccc_cluster_types.content)["data"]

        try:
            eccc_cluster_types = {
                c["attributes"]["name"]: c["id"] for c in eccc_cluster_types["data"]
            }
        except Exception:
            return "", "500 Failed to parse the 'cluster_type' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_cluster_type"] = [{
                "data": {
                    "type": "taxonomy_term--cluster_type",
                    "id": eccc_cluster_types[o],
                }
            } for o in kwargs["body"]["relationships"]["field_cluster_type"].split("|")
            if o in eccc_cluster_types
        ]

    return kwargs


@staticmethod
def manage_cluster_thematic_areas(kwargs):
    if "field_cluster_thematic_area" in kwargs["body"]["relationships"]:
        eccc_cluster_thematic_areas = get_request_eccc("jsonapi/taxonomy_term/cluster_thematic_area")
        eccc_cluster_thematic_areas = json.loads(eccc_cluster_thematic_areas.content)["data"]

        try:
            eccc_cluster_thematic_areas = {
                c["attributes"]["name"]: c["id"] for c in eccc_cluster_thematic_areas["data"]
            }
        except Exception:
            return "", "500 Failed to parse the 'cluster_thematic_area' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_cluster_thematic_area"] = [{
            "data": {
                "type": "taxonomy_term--cluster_thematic_area",
                "id": eccc_cluster_thematic_areas[o],
            }
        } for o in kwargs["body"]["relationships"]["field_cluster_thematic_area"].split("|")
            if o in eccc_cluster_thematic_areas
        ]

    return kwargs


@staticmethod
def manage_fields_of_activity(kwargs):
    if "field_fields_of_activity" in kwargs["body"]["relationships"]:
        eccc_fields_of_activity = get_request_eccc("jsonapi/taxonomy_term/fields_of_activity")
        eccc_fields_of_activity = json.loads(eccc_fields_of_activity.content)["data"]

        try:
            eccc_fields_of_activity = {
                c["attributes"]["name"]: c["id"] for c in eccc_fields_of_activity["data"]
            }
        except Exception:
            return "", "500 Failed to parse the 'fields_of_activity' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_fields_of_activity"] = [{
                "data": {
                    "type": "taxonomy_term--fields_of_activity",
                    "id": eccc_fields_of_activity[o],
                }
            } for o in kwargs["body"]["relationships"]["field_fields_of_activity"].split("|")
            if o in eccc_fields_of_activity
        ]

    return kwargs
