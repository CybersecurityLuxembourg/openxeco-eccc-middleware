import React from "react";
import Message from "../component/box/Message.jsx";

function getFieldLocation() {
	return {
		"FORM-ECCC-001-Q000": null,
		"FORM-ECCC-001-Q101": "attributes.title",
		"FORM-ECCC-001-Q102": "attributes.field_address.country_code",
		"FORM-ECCC-001-Q103": "attributes.field_address.locality",
		"FORM-ECCC-001-Q104": "attributes.field_address.address_line1",
		"FORM-ECCC-001-Q105": "attributes.field_registration_number ",
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
		"FORM-ECCC-001-Q303": "relationships.field_cluster_thematic_area",
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
		reference: "FORM-ECCC-001-Q102",
		position: 2,
		type: "SELECT",
		value: "Address: Country",
		options: taxonomies && taxonomies.country ? Object.keys(taxonomies.country).map((e) => taxonomies.country[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q103",
		position: 3,
		type: "TEXT",
		value: "Address: Street address",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q104",
		position: 4,
		type: "TEXT",
		value: "Address: City",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q105",
		position: 5,
		type: "TEXT",
		value: "Company/organization registration number",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q106",
		position: 6,
		type: "TEXT",
		value: "Is this your organisation’s main seat / headquarter? (is your organisation a subsidiary of an organisation?)"
			+ "<br/><br/>"
			+ "If not, please provide the name and address of the main seat / headquarter",
	},
	{
		reference: "FORM-ECCC-001-Q107",
		position: 7,
		type: "TEXT",
		value: "Website",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q108",
		position: 8,
		type: "TEXT",
		value: "Phone number",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q109",
		position: 9,
		type: "TEXT",
		value: "Email",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q110",
		position: 10,
		type: "TEXT",
		value: "Organisation type",
		options: taxonomies && taxonomies.cluster_type ? Object.keys(taxonomies.cluster_type).map((e) => taxonomies.cluster_type[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q111",
		position: 11,
		type: "TEXT",
		value: "Does your organization have subsidiaries in other EU Member States (including EEA/EFTA countries)"
			+ "<br/><br/>"
			+ "If yes, please specify",
	},
	{
		reference: "FORM-ECCC-001-Q112",
		position: 12,
		type: "TEXT",
		value: "Do you hold majority shares of organizations located outside of the Member State (incl.  EEA/EFTA countries)?"
			+ "<br/><br/>"
			+ "If yes, please specify",
	},
	{
		reference: "FORM-ECCC-001-Q113",
		position: 13,
		type: "CHECKBOX",
		value: "Does your organization comply to the requirements described in Article 136 of the EU Financial Regulation?  (see Annex 3)",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q114",
		position: 14,
		type: "CHECKBOX",
		value: "Please review and accept the Confidentiality agreement",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q201",
		position: 15,
		type: "TEXT",
		value: "<p><b>Representative / Contact Person</b></p><p>First name</p>",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q202",
		position: 16,
		type: "TEXT",
		value: "Family name",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q203",
		position: 17,
		type: "TEXT",
		value: "Position",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q204",
		position: 18,
		type: "SELECT",
		value: "Gender",
		options: "Male|Female|Prefer not to say",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q205",
		position: 19,
		type: "TEXT",
		value: "Email",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q206",
		position: 20,
		type: "TEXT",
		value: "Phone number (personal)",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q207",
		position: 21,
		type: "TEXT",
		value: "Please specify the contact person’s expertise in the field of cybersecurity",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q301",
		position: 22,
		type: "OPTIONS",
		value: "<p><b>Fields of Activity / Expertise</b></p><p>Your organizations expertise in the field of cybersecurity (according to Article 8 (3)</p>",
		options: taxonomies && taxonomies.fields_of_activity ? Object.keys(taxonomies.fields_of_activity).map((e) => taxonomies.fields_of_activity[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q302",
		position: 23,
		type: "TEXTAREA",
		value: "Expertise - detail description",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q303",
		position: 24,
		type: "OPTIONS",
		value: "Expertise according to the Cybersecurity Taxonomy",
		options: taxonomies && taxonomies.cluster_thematic_area ? Object.keys(taxonomies.cluster_thematic_area).map((e) => taxonomies.cluster_thematic_area[e]).join("|") : undefined,
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q304",
		position: 25,
		type: "TEXTAREA",
		value: "What do you seek to achieve by joining the community?",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q305",
		position: 26,
		type: "TEXTAREA",
		value: "How and in which goals and tasks of community can you contribute?",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q401",
		position: 27,
		type: "CHECKBOX",
		value: "<p><b>Disclaimer</b></p><p>Article 9 – Tasks of community</p>",
		mandatory: true,
	},
	{
		reference: "FORM-ECCC-001-Q402",
		position: 28,
		type: "CHECKBOX",
		value: "GDPR Conformity",
		mandatory: true,
	},

	{
		reference: "FORM-ECCC-001-Q501",
		position: 29,
		type: "CHECKBOX",
		value: "<p><b>Confirmation</b></p><p>I have finished filling the form and accept the answers to be reviewed by the NCC</p>",
		mandatory: true,
	},
	];
}

export function getEcccRegistrationFieldValue(question, ecccObject, taxonomies = {}) {
	const location = getFieldLocation()[question.reference];

	if (location) {
		const path = location.split(".");
		let value = ecccObject;

		for (let i = 0; i < path.length; i++) {
			if (value[path[i]]) {
				value = value[path[i]];
			} else {
				return null;
			}
		}

		if (location.startsWith("relationships.")) {
			const t = taxonomies[location.split(".").slice(-1)[0].split(".")];

			if (t) {
				return "C'est un objet avec une taxo";
			}

			return <Message
				height={30}
				content={"No taxonomy found"}
			/>;
		}

		return value;
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
