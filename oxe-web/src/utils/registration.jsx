// eslint-disable-next-line import/prefer-default-export
export function getEcccRegistrationFieldValue(obj, ref) {
	switch (ref) {
	case "FORM-ECCC-001-Q101":
		return obj.attributes.title;
	case "FORM-ECCC-001-Q102":
		return obj.attributes.field_address.country_code;
	case "FORM-ECCC-001-Q103":
		return obj.attributes.field_address.locality;
	case "FORM-ECCC-001-Q104":
		return obj.attributes.field_address.address_line1;
	case "FORM-ECCC-001-Q105":
		return obj.attributes.field_iot_org_pic;
	case "FORM-ECCC-001-Q106":
		return obj.attributes.field_headquarter;
	case "FORM-ECCC-001-Q107":
		return obj.attributes.fiels_url;
	case "FORM-ECCC-001-Q108":
		return obj.attributes.field_phone_number;
	case "FORM-ECCC-001-Q109":
		return obj.attributes.field_general_contact_e_mail;
	case "FORM-ECCC-001-Q110":
		return obj.relationships.field_cluster_type;
	case "FORM-ECCC-001-Q111":
		return obj.attributes.field_subsidiaries_eu;
	case "FORM-ECCC-001-Q112":
		return obj.attributes.field_majority_shares_noneu;
	case "FORM-ECCC-001-Q113":
		return obj.attributes.field_article_136_compliance;
	case "FORM-ECCC-001-Q114":
		return obj.attributes.field_data_sharing_consent;
	case "FORM-ECCC-001-Q201":
		return obj.attributes.field_first_name;
	case "FORM-ECCC-001-Q202":
		return obj.attributes.field_family_name;
	case "FORM-ECCC-001-Q203":
		return obj.attributes.field_position;
	case "FORM-ECCC-001-Q204":
		return obj.attributes.field_representative_gender;
	case "FORM-ECCC-001-Q205":
		return obj.attributes.field_e_mail;
	case "FORM-ECCC-001-Q206":
		return obj.attributes.field_representative_phone_numbe;
	case "FORM-ECCC-001-Q207":
		return obj.attributes.field_representative_expertise;
	case "FORM-ECCC-001-Q301":
		return obj.relationships.field_field_of_activity;
	case "FORM-ECCC-001-Q302":
		return obj.attributes.field_field_of_activity_descr;
	case "FORM-ECCC-001-Q303":
		return obj.relationships.field_cluster_thematic_area;
	case "FORM-ECCC-001-Q304":
		return obj.attributes.field_goals_to_achieve;
	case "FORM-ECCC-001-Q305":
		return obj.attributes.field_goals_to_contribute;
	case "FORM-ECCC-001-Q401":
		return "TODO";
	case "FORM-ECCC-001-Q402":
		return "TODO";
	case "FORM-ECCC-001-Q501":
		return "<i>INFORMATION NOT STORED AT ECCC LEVEL</i>";
	default:
		return "ERROR: VALUE NOT FOUND";
	}
}
