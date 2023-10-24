import json
from utils.request import get_request_eccc


def manage_attributes(kwargs):
    kwargs = manage_country(kwargs)
    kwargs = manage_cluster_types(kwargs)
    kwargs = manage_cluster_thematic_areas(kwargs)
    kwargs = manage_fields_of_activity(kwargs)
    kwargs = manage_sectors(kwargs)
    kwargs = manage_technologies(kwargs)
    kwargs = manage_use_cases(kwargs)
    kwargs = manage_assurance_audit_certification(kwargs)
    kwargs = manage_cryptology(kwargs)
    kwargs = manage_data_security_and_privacy(kwargs)
    kwargs = manage_education_and_training(kwargs)
    kwargs = manage_human_aspects(kwargs)
    kwargs = manage_identity_and_access_management(kwargs)
    kwargs = manage_op_incident_handling_forensics(kwargs)
    kwargs = manage_legal_aspects(kwargs)
    kwargs = manage_network_and_distributed_systems(kwargs)
    kwargs = manage_security_management_and_governan(kwargs)
    kwargs = manage_security_measurements(kwargs)
    kwargs = manage_soft_and_hard_sec_engineering(kwargs)
    kwargs = manage_steganography_steganalysis_and_w(kwargs)
    kwargs = manage_theoretical_foundations(kwargs)
    kwargs = manage_trust_management_accountability(kwargs)

    return kwargs


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


def manage_cluster_types(kwargs):
    if "field_cluster_type" in kwargs["body"]["relationships"]:
        eccc_cluster_types = get_request_eccc("jsonapi/taxonomy_term/cluster_type")
        eccc_cluster_types = json.loads(eccc_cluster_types.content)["data"]

        try:
            eccc_cluster_types = {
                c["attributes"]["name"]: c["id"] for c in eccc_cluster_types
            }
        except Exception:
            return "", "500 Failed to parse the 'cluster_type' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_cluster_type"] = {
            "data": [{
                "type": "taxonomy_term--cluster_type",
                "id": eccc_cluster_types[o],
            }
                for o in kwargs["body"]["relationships"]["field_cluster_type"].split("|")
                if o in eccc_cluster_types
            ]
        }

    return kwargs


def manage_cluster_thematic_areas(kwargs):
    if "field_cluster_thematic_area" in kwargs["body"]["relationships"]:
        eccc_cluster_thematic_areas = get_request_eccc("jsonapi/taxonomy_term/cluster_thematic_area")
        eccc_cluster_thematic_areas = json.loads(eccc_cluster_thematic_areas.content)["data"]

        try:
            eccc_cluster_thematic_areas = {
                c["attributes"]["name"]: c["id"] for c in eccc_cluster_thematic_areas
            }
        except Exception:
            return "", "500 Failed to parse the 'cluster_thematic_area' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_cluster_thematic_area"] = {
            "data": [{
                "type": "taxonomy_term--cluster_thematic_area",
                "id": eccc_cluster_thematic_areas[o],
            }
                for o in kwargs["body"]["relationships"]["field_cluster_thematic_area"].split("|")
                if o in eccc_cluster_thematic_areas
            ]
        }

    return kwargs


def manage_fields_of_activity(kwargs):
    if "field_fields_of_activity" in kwargs["body"]["relationships"]:
        eccc_fields_of_activity = get_request_eccc("jsonapi/taxonomy_term/fields_of_activity")
        eccc_fields_of_activity = json.loads(eccc_fields_of_activity.content)["data"]

        try:
            eccc_fields_of_activity = {
                c["attributes"]["name"]: c["id"] for c in eccc_fields_of_activity
            }
        except Exception:
            return "", "500 Failed to parse the 'fields_of_activity' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_field_of_activity"] = {
            "data": [{
                "type": "taxonomy_term--fields_of_activity",
                "id": eccc_fields_of_activity[o],
            }
                for o in kwargs["body"]["relationships"]["field_fields_of_activity"].split("|")
                if o in eccc_fields_of_activity
            ]
        }

        del kwargs["body"]["relationships"]["field_fields_of_activity"]

    return kwargs


def manage_sectors(kwargs):
    if "field_sectors" in kwargs["body"]["relationships"]:
        eccc_sectors = get_request_eccc("jsonapi/taxonomy_term/sectors")
        eccc_sectors = json.loads(eccc_sectors.content)["data"]

        try:
            eccc_sectors = {
                c["attributes"]["name"]: c["id"] for c in eccc_sectors
            }
        except Exception:
            return "", "500 Failed to parse the 'sectors' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_sectors"] = {
            "data": [{
                "type": "taxonomy_term--sectors",
                "id": eccc_sectors[o],
            }
                for o in kwargs["body"]["relationships"]["field_sectors"].split("|")
                if o in eccc_sectors
            ]
        }

    return kwargs


def manage_technologies(kwargs):
    if "field_technologies" in kwargs["body"]["relationships"]:
        eccc_technologies = get_request_eccc("jsonapi/taxonomy_term/technologies")
        eccc_technologies = json.loads(eccc_technologies.content)["data"]

        try:
            eccc_technologies = {
                c["attributes"]["name"]: c["id"] for c in eccc_technologies
            }
        except Exception:
            return "", "500 Failed to parse the 'technologies' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_technologies"] = {
            "data": [{
                "type": "taxonomy_term--technologies",
                "id": eccc_technologies[o],
            }
                for o in kwargs["body"]["relationships"]["field_technologies"].split("|")
                if o in eccc_technologies
            ]
        }

    return kwargs


def manage_use_cases(kwargs):
    if "field_use_cases" in kwargs["body"]["relationships"]:
        eccc_use_cases = get_request_eccc("jsonapi/taxonomy_term/use_cases")
        eccc_use_cases = json.loads(eccc_use_cases.content)["data"]

        try:
            eccc_use_cases = {
                c["attributes"]["name"]: c["id"] for c in eccc_use_cases
            }
        except Exception:
            return "", "500 Failed to parse the 'use_cases' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_use_cases"] = {
            "data": [{
                "type": "taxonomy_term--use_cases",
                "id": eccc_use_cases[o],
            }
                for o in kwargs["body"]["relationships"]["field_use_cases"].split("|")
                if o in eccc_use_cases
            ]
        }

    return kwargs


def manage_assurance_audit_certification(kwargs):
    if "field_assurance_audit_certification" in kwargs["body"]["relationships"]:
        eccc_assurance_audit_certification = get_request_eccc("jsonapi/taxonomy_term/assurance_audit_certification")
        eccc_assurance_audit_certification = json.loads(eccc_assurance_audit_certification.content)["data"]

        try:
            eccc_assurance_audit_certification = {
                c["attributes"]["name"]: c["id"] for c in eccc_assurance_audit_certification
            }
        except Exception:
            return "", "500 Failed to parse the 'assurance_audit_certification' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_assurance_audit_cert"] = {
            "data": [{
                "type": "taxonomy_term--assurance_audit_certification",
                "id": eccc_assurance_audit_certification[o],
            }
                for o in kwargs["body"]["relationships"]["field_assurance_audit_certification"].split("|")
                if o in eccc_assurance_audit_certification
            ]
        }

        del kwargs["body"]["relationships"]["field_assurance_audit_certification"]

    return kwargs


def manage_cryptology(kwargs):
    if "field_cryptology" in kwargs["body"]["relationships"]:
        eccc_cryptology = get_request_eccc("jsonapi/taxonomy_term/cryptology")
        eccc_cryptology = json.loads(eccc_cryptology.content)["data"]

        try:
            eccc_cryptology = {
                c["attributes"]["name"]: c["id"] for c in eccc_cryptology
            }
        except Exception:
            return "", "500 Failed to parse the 'cryptology' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_cryptology"] = {
            "data": [{
                "type": "taxonomy_term--cryptology",
                "id": eccc_cryptology[o],
            }
                for o in kwargs["body"]["relationships"]["field_cryptology"].split("|")
                if o in eccc_cryptology
            ]
        }

    return kwargs


def manage_data_security_and_privacy(kwargs):
    if "field_data_security_and_privacy" in kwargs["body"]["relationships"]:
        eccc_data_security_and_privacy = get_request_eccc("jsonapi/taxonomy_term/data_security_and_privacy")
        eccc_data_security_and_privacy = json.loads(eccc_data_security_and_privacy.content)["data"]

        try:
            eccc_data_security_and_privacy = {
                c["attributes"]["name"]: c["id"] for c in eccc_data_security_and_privacy
            }
        except Exception:
            return "", "500 Failed to parse the 'data_security_and_privacy' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_data_security_and_privacy"] = {
            "data": [{
                "type": "taxonomy_term--data_security_and_privacy",
                "id": eccc_data_security_and_privacy[o],
            }
                for o in kwargs["body"]["relationships"]["field_data_security_and_privacy"].split("|")
                if o in eccc_data_security_and_privacy
            ]
        }

    return kwargs


def manage_education_and_training(kwargs):
    if "field_education_and_training" in kwargs["body"]["relationships"]:
        eccc_education_and_training = get_request_eccc("jsonapi/taxonomy_term/education_and_training")
        eccc_education_and_training = json.loads(eccc_education_and_training.content)["data"]

        try:
            eccc_education_and_training = {
                c["attributes"]["name"]: c["id"] for c in eccc_education_and_training
            }
        except Exception:
            return "", "500 Failed to parse the 'education_and_training' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_education_and_training"] = {
            "data": [{
                "type": "taxonomy_term--education_and_training",
                "id": eccc_education_and_training[o],
            }
                for o in kwargs["body"]["relationships"]["field_education_and_training"].split("|")
                if o in eccc_education_and_training
            ]
        }

    return kwargs


def manage_human_aspects(kwargs):
    if "field_human_aspects" in kwargs["body"]["relationships"]:
        eccc_human_aspects = get_request_eccc("jsonapi/taxonomy_term/human_aspects")
        eccc_human_aspects = json.loads(eccc_human_aspects.content)["data"]

        try:
            eccc_human_aspects = {
                c["attributes"]["name"]: c["id"] for c in eccc_human_aspects
            }
        except Exception:
            return "", "500 Failed to parse the 'human_aspects' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_human_aspects"] = {
            "data": [{
                "type": "taxonomy_term--human_aspects",
                "id": eccc_human_aspects[o],
            }
                for o in kwargs["body"]["relationships"]["field_human_aspects"].split("|")
                if o in eccc_human_aspects
            ]
        }

    return kwargs


def manage_identity_and_access_management(kwargs):
    if "field_identity_and_access_management" in kwargs["body"]["relationships"]:
        eccc_identity_and_access_management = get_request_eccc("jsonapi/taxonomy_term/identity_and_access_management")
        eccc_identity_and_access_management = json.loads(eccc_identity_and_access_management.content)["data"]

        try:
            eccc_identity_and_access_management = {
                c["attributes"]["name"]: c["id"] for c in eccc_identity_and_access_management
            }
        except Exception:
            return "", "500 Failed to parse the 'identity_and_access_management' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_identity_and_access_mngmt"] = {
            "data": [{
                "type": "taxonomy_term--identity_and_access_management",
                "id": eccc_identity_and_access_management[o],
            }
                for o in kwargs["body"]["relationships"]["field_identity_and_access_management"].split("|")
                if o in eccc_identity_and_access_management
            ]
        }

        del kwargs["body"]["relationships"]["field_identity_and_access_management"]

    return kwargs


def manage_op_incident_handling_forensics(kwargs):
    if "field_op_incident_handling_forensics" in kwargs["body"]["relationships"]:
        eccc_op_incident_handling_forensics = get_request_eccc("jsonapi/taxonomy_term/op_incident_handling_forensics")
        eccc_op_incident_handling_forensics = json.loads(eccc_op_incident_handling_forensics.content)["data"]

        try:
            eccc_op_incident_handling_forensics = {
                c["attributes"]["name"]: c["id"] for c in eccc_op_incident_handling_forensics
            }
        except Exception:
            return "", "500 Failed to parse the 'op_incident_handling_forensics' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_operational_incident_handl"] = {
            "data": [{
                "type": "taxonomy_term--op_incident_handling_forensics",
                "id": eccc_op_incident_handling_forensics[o],
            }
                for o in kwargs["body"]["relationships"]["field_op_incident_handling_forensics"].split("|")
                if o in eccc_op_incident_handling_forensics
            ]
        }

        del kwargs["body"]["relationships"]["field_op_incident_handling_forensics"]

    return kwargs


def manage_legal_aspects(kwargs):
    if "field_legal_aspects" in kwargs["body"]["relationships"]:
        eccc_legal_aspects = get_request_eccc("jsonapi/taxonomy_term/legal_aspects")
        eccc_legal_aspects = json.loads(eccc_legal_aspects.content)["data"]

        try:
            eccc_legal_aspects = {
                c["attributes"]["name"]: c["id"] for c in eccc_legal_aspects
            }
        except Exception:
            return "", "500 Failed to parse the 'legal_aspects' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_legal_aspects"] = {
            "data": [{
                "type": "taxonomy_term--legal_aspects",
                "id": eccc_legal_aspects[o],
            }
                for o in kwargs["body"]["relationships"]["field_legal_aspects"].split("|")
                if o in eccc_legal_aspects
            ]
        }

    return kwargs


def manage_network_and_distributed_systems(kwargs):
    if "field_network_and_distributed_systems" in kwargs["body"]["relationships"]:
        eccc_network_and_distributed_systems = get_request_eccc("jsonapi/taxonomy_term/network_and_distributed_systems")
        eccc_network_and_distributed_systems = json.loads(eccc_network_and_distributed_systems.content)["data"]

        try:
            eccc_network_and_distributed_systems = {
                c["attributes"]["name"]: c["id"] for c in eccc_network_and_distributed_systems
            }
        except Exception:
            return "", "500 Failed to parse the 'network_and_distributed_systems' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_network_and_distributed_sy"] = {
            "data": [{
                "type": "taxonomy_term--network_and_distributed_systems",
                "id": eccc_network_and_distributed_systems[o],
            }
                for o in kwargs["body"]["relationships"]["field_network_and_distributed_systems"].split("|")
                if o in eccc_network_and_distributed_systems
            ]
        }

        del kwargs["body"]["relationships"]["field_network_and_distributed_systems"]

    return kwargs


def manage_security_management_and_governan(kwargs):
    if "field_security_management_and_governan" in kwargs["body"]["relationships"]:
        eccc_security_management_and_governan = get_request_eccc("jsonapi/taxonomy_term/security_management_and_governan")
        eccc_security_management_and_governan = json.loads(eccc_security_management_and_governan.content)["data"]

        try:
            eccc_security_management_and_governan = {
                c["attributes"]["name"]: c["id"] for c in eccc_security_management_and_governan
            }
        except Exception:
            return "", "500 Failed to parse the 'security_management_and_governan' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_security_management"] = {
            "data": [{
                "type": "taxonomy_term--security_management_and_governan",
                "id": eccc_security_management_and_governan[o],
            }
                for o in kwargs["body"]["relationships"]["field_security_management_and_governan"].split("|")
                if o in eccc_security_management_and_governan
            ]
        }

        del kwargs["body"]["relationships"]["field_security_management_and_governan"]

    return kwargs


def manage_security_measurements(kwargs):
    if "field_security_measurements" in kwargs["body"]["relationships"]:
        eccc_security_measurements = get_request_eccc("jsonapi/taxonomy_term/security_measurements")
        eccc_security_measurements = json.loads(eccc_security_measurements.content)["data"]

        try:
            eccc_security_measurements = {
                c["attributes"]["name"]: c["id"] for c in eccc_security_measurements
            }
        except Exception:
            return "", "500 Failed to parse the 'security_measurements' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_security_measurements"] = {
            "data": [{
                "type": "taxonomy_term--security_measurements",
                "id": eccc_security_measurements[o],
            }
                for o in kwargs["body"]["relationships"]["field_security_measurements"].split("|")
                if o in eccc_security_measurements
            ]
        }

    return kwargs


def manage_soft_and_hard_sec_engineering(kwargs):
    if "field_soft_and_hard_sec_engineering" in kwargs["body"]["relationships"]:
        eccc_soft_and_hard_sec_engineering = get_request_eccc("jsonapi/taxonomy_term/soft_and_hard_sec_engineering")
        eccc_soft_and_hard_sec_engineering = json.loads(eccc_soft_and_hard_sec_engineering.content)["data"]

        try:
            eccc_soft_and_hard_sec_engineering = {
                c["attributes"]["name"]: c["id"] for c in eccc_soft_and_hard_sec_engineering
            }
        except Exception:
            return "", "500 Failed to parse the 'soft_and_hard_sec_engineering' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_security_engineering"] = {
            "data": [{
                "type": "taxonomy_term--soft_and_hard_sec_engineering",
                "id": eccc_soft_and_hard_sec_engineering[o],
            }
                for o in kwargs["body"]["relationships"]["field_soft_and_hard_sec_engineering"].split("|")
                if o in eccc_soft_and_hard_sec_engineering
            ]
        }

        del kwargs["body"]["relationships"]["field_soft_and_hard_sec_engineering"]

    return kwargs


def manage_steganography_steganalysis_and_w(kwargs):
    if "field_steganography_steganalysis_and_w" in kwargs["body"]["relationships"]:
        eccc_steganography_steganalysis_and_w = get_request_eccc("jsonapi/taxonomy_term/steganography_steganalysis_and_w")
        eccc_steganography_steganalysis_and_w = json.loads(eccc_steganography_steganalysis_and_w.content)["data"]

        try:
            eccc_steganography_steganalysis_and_w = {
                c["attributes"]["name"]: c["id"] for c in eccc_steganography_steganalysis_and_w
            }
        except Exception:
            return "", "500 Failed to parse the 'steganography_steganalysis_and_w' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_steganography_steganalysis"] = {
            "data": [{
                "type": "taxonomy_term--steganography_steganalysis_and_w",
                "id": eccc_steganography_steganalysis_and_w[o],
            }
                for o in kwargs["body"]["relationships"]["field_steganography_steganalysis_and_w"].split("|")
                if o in eccc_steganography_steganalysis_and_w
            ]
        }

        del kwargs["body"]["relationships"]["field_steganography_steganalysis_and_w"]

    return kwargs


def manage_theoretical_foundations(kwargs):
    if "field_theoretical_foundations" in kwargs["body"]["relationships"]:
        eccc_theoretical_foundations = get_request_eccc("jsonapi/taxonomy_term/theoretical_foundations")
        eccc_theoretical_foundations = json.loads(eccc_theoretical_foundations.content)["data"]

        try:
            eccc_theoretical_foundations = {
                c["attributes"]["name"]: c["id"] for c in eccc_theoretical_foundations
            }
        except Exception:
            return "", "500 Failed to parse the 'theoretical_foundations' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_theoretical_foundations"] = {
            "data": [{
                "type": "taxonomy_term--theoretical_foundations",
                "id": eccc_theoretical_foundations[o],
            }
                for o in kwargs["body"]["relationships"]["field_theoretical_foundations"].split("|")
                if o in eccc_theoretical_foundations
            ]
        }

    return kwargs


def manage_trust_management_accountability(kwargs):
    if "field_trust_management_accountability" in kwargs["body"]["relationships"]:
        eccc_trust_management_accountability = get_request_eccc("jsonapi/taxonomy_term/trust_management_accountability")
        eccc_trust_management_accountability = json.loads(eccc_trust_management_accountability.content)["data"]

        try:
            eccc_trust_management_accountability = {
                c["attributes"]["name"]: c["id"] for c in eccc_trust_management_accountability
            }
        except Exception:
            return "", "500 Failed to parse the 'trust_management_accountability' from the ECCC endpoint"

        kwargs["body"]["relationships"]["field_trust_management_and_accou"] = {
            "data": [{
                "type": "taxonomy_term--trust_management_accountability",
                "id": eccc_trust_management_accountability[o],
            }
                for o in kwargs["body"]["relationships"]["field_trust_management_accountability"].split("|")
                if o in eccc_trust_management_accountability
            ]
        }

        del kwargs["body"]["relationships"]["field_trust_management_accountability"]

    return kwargs