import React from "react";
import Message from "../component/box/Message.jsx";

export function getFieldLocation() {
	return {
		"FORM-ECCC-001-Q000": "id",
		"FORM-ECCC-001-Q101": "attributes.title",
		"FORM-ECCC-001-Q101.2": "attributes.field_institution_name_in_nation",
		"FORM-ECCC-001-Q102": "attributes.field_address.country_code",
		"FORM-ECCC-001-Q103": "attributes.field_address.locality",
		"FORM-ECCC-001-Q104": "attributes.field_address.address_line1",
		"FORM-ECCC-001-Q105": "attributes.field_registration_number",
		"FORM-ECCC-001-Q106": "attributes.field_headquarter",
		"FORM-ECCC-001-Q107": "attributes.field_url.uri",
		"FORM-ECCC-001-Q108": "attributes.field_phone_number",
		"FORM-ECCC-001-Q109": "attributes.field_general_contact_e_mail",
		"FORM-ECCC-001-Q110": "relationships.field_cluster_type",
		"FORM-ECCC-001-Q111": "attributes.field_subsidiaries_eu",
		"FORM-ECCC-001-Q112": "attributes.field_majority_shares_noneu",
		"FORM-ECCC-001-Q113": "attributes.field_article_136_compliance",
		"FORM-ECCC-001-Q114": "attributes.field_data_sharing_consent",

		"FORM-ECCC-001-Q201": "attributes.field_first_name",
		"FORM-ECCC-001-Q202": "attributes.field_family_name",
		"FORM-ECCC-001-Q203": "attributes.field_position",
		"FORM-ECCC-001-Q204": "attributes.field_representative_gender",
		"FORM-ECCC-001-Q205": "attributes.field_e_mail",
		"FORM-ECCC-001-Q206": "attributes.field_representative_phone_numbe",
		"FORM-ECCC-001-Q207": "attributes.field_representative_expertise",

		"FORM-ECCC-001-Q301": "relationships.field_fields_of_activity",
		"FORM-ECCC-001-Q302": "attributes.field_field_of_activity_descr",
		"FORM-ECCC-001-Q303.1": "relationships.field_cluster_thematic_area",
		"FORM-ECCC-001-Q303.1.1": "relationships.field_assurance_audit_certification",
		"FORM-ECCC-001-Q303.1.2": "relationships.field_cryptology",
		"FORM-ECCC-001-Q303.1.3": "relationships.field_data_security_and_privacy",
		"FORM-ECCC-001-Q303.1.4": "relationships.field_education_and_training",
		"FORM-ECCC-001-Q303.1.5": "relationships.field_human_aspects",
		"FORM-ECCC-001-Q303.1.6": "relationships.field_identity_and_access_management",
		"FORM-ECCC-001-Q303.1.7": "relationships.field_op_incident_handling_forensics",
		"FORM-ECCC-001-Q303.1.8": "relationships.field_legal_aspects",
		"FORM-ECCC-001-Q303.1.9": "relationships.field_network_and_distributed_systems",
		"FORM-ECCC-001-Q303.1.10": "relationships.field_security_management_and_governan",
		"FORM-ECCC-001-Q303.1.11": "relationships.field_security_measurements",
		"FORM-ECCC-001-Q303.1.12": "relationships.field_soft_and_hard_sec_engineering",
		"FORM-ECCC-001-Q303.1.13": "relationships.field_steganography_steganalysis_and_w",
		"FORM-ECCC-001-Q303.1.14": "relationships.field_theoretical_foundations",
		"FORM-ECCC-001-Q303.1.15": "relationships.field_trust_management_accountability",
		"FORM-ECCC-001-Q303.2": "attributes.field_other_knowledge_domains",
		"FORM-ECCC-001-Q303.3": "relationships.field_sectors",
		"FORM-ECCC-001-Q303.4": "attributes.field_other_sectors",
		"FORM-ECCC-001-Q303.5": "relationships.field_technologies",
		"FORM-ECCC-001-Q303.6": "attributes.field_other_technologies",
		"FORM-ECCC-001-Q303.7": "relationships.field_use_cases",
		"FORM-ECCC-001-Q303.8": "attributes.field_other_use_cases",
		"FORM-ECCC-001-Q304": "attributes.field_goals_to_achieve",
		"FORM-ECCC-001-Q305": "attributes.field_goals_to_contribute",

		"FORM-ECCC-001-Q401": null,
		"FORM-ECCC-001-Q402": null,

		"FORM-ECCC-001-Q501": null,
	};
}

function getQuestionOfAnswer(questions, answer) {
	const qu = questions.filter((q) => q.id === answer.form_question_id);

	if (qu.length > 0) {
		return qu[0];
	}

	return null;
}

export function getFormReference() {
	return "FORM-ECCC-001";
}

export function getFormQuestions(taxonomies) {
	return [{
		reference: "FORM-ECCC-001-Q000",
		position: 0,
		type: "TEXT",
		value: "ID",
		mandatory: false,
		status: "INACTIVE",
	},
	{
		reference: "FORM-ECCC-001-Q101",
		position: 1,
		type: "TEXT",
		value: "<p><b>Your organisation</b></p><p>Name</p>",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q101.b",
		position: 2,
		type: "TEXT",
		value: "Name in English (if no translation, same value than previous field)",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q102",
		position: 3,
		type: "SELECT",
		value: "Address: Country",
		options: taxonomies && taxonomies.country ? Object.keys(taxonomies.country).map((e) => taxonomies.country[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q103",
		position: 4,
		type: "TEXT",
		value: "Address: Street address",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q104",
		position: 5,
		type: "TEXT",
		value: "Address: City",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q105",
		position: 6,
		type: "TEXT",
		value: "Company/organization registration number",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q106",
		position: 7,
		type: "TEXT",
		value: "Is this your organisation’s main seat / headquarter? (is your organisation a subsidiary of an organisation?)"
			+ "<br/><br/>"
			+ "If not, please provide the name and address of the main seat / headquarter",
	},
	{
		reference: "FORM-ECCC-001-Q107",
		position: 8,
		type: "TEXT",
		value: "Website",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q108",
		position: 9,
		type: "TEXT",
		value: "Phone number",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q109",
		position: 10,
		type: "TEXT",
		value: "Email",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q110",
		position: 11,
		type: "SELECT",
		value: "Organisation type",
		options: taxonomies && taxonomies.cluster_type ? Object.keys(taxonomies.cluster_type).map((e) => taxonomies.cluster_type[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q111",
		position: 12,
		type: "TEXT",
		value: "Does your organization have subsidiaries in other EU Member States (including EEA/EFTA countries)"
			+ "<br/><br/>"
			+ "If yes, please specify",
	},
	{
		reference: "FORM-ECCC-001-Q112",
		position: 13,
		type: "TEXT",
		value: "Do you hold majority shares of organizations located outside of the Member State (incl.  EEA/EFTA countries)?"
			+ "<br/><br/>"
			+ "If yes, please specify",
	},
	{
		reference: "FORM-ECCC-001-Q113",
		position: 14,
		type: "CHECKBOX",
		value: "Does your organization comply to the requirements described in Article 136 of the EU Financial Regulation?  (see Annex 3)",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q114",
		position: 15,
		type: "CHECKBOX",
		value: "Please review and accept the Confidentiality agreement",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q201",
		position: 16,
		type: "TEXT",
		value: "<p><b>Representative / Contact Person</b></p><p>First name</p>",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q202",
		position: 17,
		type: "TEXT",
		value: "Family name",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q203",
		position: 18,
		type: "TEXT",
		value: "Position",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q204",
		position: 19,
		type: "SELECT",
		value: "Gender",
		options: "male|female|na",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q205",
		position: 20,
		type: "TEXT",
		value: "Email",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q206",
		position: 21,
		type: "TEXT",
		value: "Phone number (personal)",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q207",
		position: 22,
		type: "TEXT",
		value: "Please specify the contact person’s expertise in the field of cybersecurity",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q301",
		position: 23,
		type: "OPTIONS",
		value: "<p><b>Fields of Activity / Expertise</b></p><p>Your organizations expertise in the field of cybersecurity (according to Article 8 (3)</p>",
		options: taxonomies && taxonomies.fields_of_activity ? Object.keys(taxonomies.fields_of_activity).map((e) => taxonomies.fields_of_activity[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q302",
		position: 24,
		type: "TEXTAREA",
		value: "Expertise - detail description",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303.1",
		position: 25,
		type: "OPTIONS",
		value: "Expertise according to the Cybersecurity Taxonomy",
		options: taxonomies && taxonomies.cluster_thematic_area ? Object.keys(taxonomies.cluster_thematic_area).map((e) => taxonomies.cluster_thematic_area[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303.2",
		position: 26,
		type: "TEXTAREA",
		value: "Other expertise",
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.1",
		position: 27,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Assurance, Audit, and Certification",
		options: taxonomies && taxonomies.assurance_audit_certification ? Object.keys(taxonomies.assurance_audit_certification).map((e) => taxonomies.assurance_audit_certification[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.2",
		position: 28,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Cryptology (Cryptography and Cryptanalysis)",
		options: taxonomies && taxonomies.cryptology ? Object.keys(taxonomies.cryptology).map((e) => taxonomies.cryptology[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.3",
		position: 29,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Data Security and Privacy",
		options: taxonomies && taxonomies.data_security_and_privacy ? Object.keys(taxonomies.data_security_and_privacy).map((e) => taxonomies.data_security_and_privacy[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.4",
		position: 30,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Education and Training",
		options: taxonomies && taxonomies.education_and_training ? Object.keys(taxonomies.education_and_training).map((e) => taxonomies.education_and_training[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.5",
		position: 31,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Human aspects",
		options: taxonomies && taxonomies.human_aspects ? Object.keys(taxonomies.human_aspects).map((e) => taxonomies.human_aspects[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.6",
		position: 32,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Identity Management",
		options: taxonomies && taxonomies.identity_and_access_management ? Object.keys(taxonomies.identity_and_access_management).map((e) => taxonomies.identity_and_access_management[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.7",
		position: 33,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Incident Handling and Digital Forensics",
		options: taxonomies && taxonomies.op_incident_handling_forensics ? Object.keys(taxonomies.op_incident_handling_forensics).map((e) => taxonomies.op_incident_handling_forensics[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.8",
		position: 34,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Legal aspects",
		options: taxonomies && taxonomies.legal_aspects ? Object.keys(taxonomies.legal_aspects).map((e) => taxonomies.legal_aspects[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.9",
		position: 35,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Network and Distributed Systems",
		options: taxonomies && taxonomies.network_and_distributed_systems ? Object.keys(taxonomies.network_and_distributed_systems).map((e) => taxonomies.network_and_distributed_systems[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.10",
		position: 36,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Security Management and Governance",
		options: taxonomies && taxonomies.security_management_and_governan ? Object.keys(taxonomies.security_management_and_governan).map((e) => taxonomies.security_management_and_governan[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.11",
		position: 37,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Security Measurements",
		options: taxonomies && taxonomies.security_measurements ? Object.keys(taxonomies.security_measurements).map((e) => taxonomies.security_measurements[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.12",
		position: 38,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Software and Hardware Security Engineering",
		options: taxonomies && taxonomies.soft_and_hard_sec_engineering ? Object.keys(taxonomies.soft_and_hard_sec_engineering).map((e) => taxonomies.soft_and_hard_sec_engineering[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.13",
		position: 39,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Steganography, Steganalysis and Watermarking",
		options: taxonomies && taxonomies.steganography_steganalysis_and_w ? Object.keys(taxonomies.steganography_steganalysis_and_w).map((e) => taxonomies.steganography_steganalysis_and_w[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.14",
		position: 40,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Theoretical Foundations",
		options: taxonomies && taxonomies.theoretical_foundations ? Object.keys(taxonomies.theoretical_foundations).map((e) => taxonomies.theoretical_foundations[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.1.15",
		position: 41,
		type: "OPTIONS",
		value: "Sub-domain of expertise according to the Cybersecurity Taxonomy - Trust Management and Accountability",
		options: taxonomies && taxonomies.trust_management_accountability ? Object.keys(taxonomies.trust_management_accountability).map((e) => taxonomies.trust_management_accountability[e]).join("|") : undefined,
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.3",
		position: 42,
		type: "OPTIONS",
		value: "Sectors according to the Cybersecurity Taxonomy",
		options: taxonomies && taxonomies.sectors ? Object.keys(taxonomies.sectors).map((e) => taxonomies.sectors[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303.4",
		position: 43,
		type: "TEXTAREA",
		value: "Other sectors",
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.5",
		position: 44,
		type: "OPTIONS",
		value: "Technologies according to the Cybersecurity Taxonomy",
		options: taxonomies && taxonomies.technologies ? Object.keys(taxonomies.technologies).map((e) => taxonomies.technologies[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303.6",
		position: 45,
		type: "TEXTAREA",
		value: "Other technologies",
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q303.7",
		position: 46,
		type: "OPTIONS",
		value: "Use cases according to the Cybersecurity Taxonomy",
		options: taxonomies && taxonomies.use_cases ? Object.keys(taxonomies.use_cases).map((e) => taxonomies.use_cases[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303.8",
		position: 47,
		type: "TEXTAREA",
		value: "Other use cases",
		mandatory: false,
	},
	{
		reference: "FORM-ECCC-001-Q304",
		position: 48,
		type: "TEXTAREA",
		value: "What do you seek to achieve by joining the community?",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q305",
		position: 49,
		type: "TEXTAREA",
		value: "How and in which goals and tasks of community can you contribute?",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q401",
		position: 50,
		type: "CHECKBOX",
		value: "<p><b>Disclaimer</b></p><p>Article 9 – Tasks of community</p>",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q402",
		position: 51,
		type: "CHECKBOX",
		value: "GDPR Conformity",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q501",
		position: 52,
		type: "CHECKBOX",
		value: "<p><b>Confirmation</b></p><p>I have finished filling the form and accept the answers to be reviewed by the NCC</p>",
		mandatory: true,
	},
	];
}

export function getEcccRegistrationFieldValue(question, ecccObject, taxonomies = {}) {
	let location = getFieldLocation()[question.reference];

	if (location) {
		// HARDCODED FIX
		// Discrepancy between ECCC object field and taxonomy name
		location = location.replace("attributes.field_address.country_code", "relationships.field_country");

		const path = location.split(".");
		let value = ecccObject;

		for (let i = 0; i < path.length; i++) {
			// HARDCODED FIX
			// Discrepancy between ECCC object field and taxonomy name
			path[i] = path[i].replace("field_fields_of_activity", "field_field_of_activity");
			path[i] = path[i].replace("field_op_incident_handling_forensics", "field_operational_incident_handl");
			path[i] = path[i].replace("field_assurance_audit_certification", "field_assurance_audit_cert");
			path[i] = path[i].replace("field_identity_and_access_management", "field_identity_and_access_mngmt");
			path[i] = path[i].replace("field_network_and_distributed_systems", "field_network_and_distributed_sy");
			path[i] = path[i].replace("field_security_management_and_governan", "field_security_management");
			path[i] = path[i].replace("field_soft_and_hard_sec_engineering", "field_security_engineering");
			path[i] = path[i].replace("field_steganography_steganalysis_and_w", "field_steganography_steganalysis");
			path[i] = path[i].replace("field_trust_management_accountability", "field_trust_management_and_accou");

			if (value[path[i]]) {
				value = value[path[i]];
			} else {
				return null;
			}
		}

		if (location.startsWith("relationships.")) {
			const t = taxonomies[location.split(".").slice(-1)[0].replace("field_", "")];

			if (t) {
				let values = (Array.isArray(value.data) ? value.data : [value.data]);

				if (values.length > 0) {
					values = values
						.map((v) => t[v.id])
						.sort()
						.join(", ");

					return values;
				}

				return null;
			}

			return <Message
				height={30}
				content={"No taxonomy found"}
			/>;
		}

		if (value.length === 0) {
			return null;
		}

		return (value + "").replaceAll("\n", "<br/>");
	}

	return null;
}

export function getOxeRegistrationFieldValue(question, answers) {
	const answer = answers.filter((a) => a.form_question_id === question.id);

	if (answer.length > 0) {
		if (answer[0].value) {
			if (getFieldLocation()[question.reference]
				&& getFieldLocation()[question.reference].startsWith("relationships.")) {
				return answer[0].value.split(/\|/).sort().join(", ");
			}

			if (["TRUE", "FALSE"].indexOf(answer[0].value) >= 0) {
				return answer[0].value.toLowerCase();
			}

			return answer[0].value.replaceAll("\n", "<br/>");
		}

		return answer[0].value;
	}

	return null;
}

export function getOxeRegistrationFieldId(question, answers) {
	const answer = answers.filter((a) => a.form_question_id === question.id);

	if (answer.length > 0) {
		return answer[0].id;
	}

	return null;
}

export function buildRegistrationBody(questions, answers) {
	const body = {
		type: "node--cluster",
		attributes: {
			field_address: {},
		},
		relationships: {},
	};

	for (let i = 0; i < answers.length; i++) {
		const question = getQuestionOfAnswer(questions, answers[i]);

		if (getFieldLocation()[question.reference]) {
			const path = getFieldLocation()[question.reference].split(".");
			let subBody = body;

			for (let y = 0; y < path.length; y++) {
				if (y < path.length - 1) {
					if (!(path[y] in subBody)) {
						subBody[path[y]] = {};
					}

					subBody = subBody[path[y]];
				} else if (question.type === "CHECKBOX") {
					subBody[path[y]] = answers[i].value === "TRUE";
				} else {
					subBody[path[y]] = answers[i].value;
				}
			}
		}
	}

	return body;
}

export function areValuesEqual(question, ecccObject, answers, taxonomies = {}) {
	if (!ecccObject) {
		return false;
	}

	const ecccValue = getEcccRegistrationFieldValue(question, ecccObject, taxonomies);
	const oxeValue = getOxeRegistrationFieldValue(question, answers);

	if (ecccValue === oxeValue) {
		return true;
	}

	return false;
}

export function getStatusLabel(label) {
	return {
		draft: "Draft",
		ready_for_publication: "Ready for publication",
		published: "Published",
	}[label];
}
