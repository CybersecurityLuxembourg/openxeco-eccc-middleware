export const endpoints = {
	middleware: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""
		? "http://localhost:5002/"
		: "https://eccc-api." + window.location.hostname.replace("www.", "").split(".").slice(1).join(".") + "/",
	openxeco: null,
	eccc: null,
};

export const openxeco = {};

export const formReference = "FORM-ECCC-001";

export const formQuestions = [
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
		options: "Austria|Belgium|Bulgaria|Croatia|Republic of Cyprus|Czech Republic|Denmark|Estonia|Finland|France|Germany|Greece|Hungary|Ireland|Italy|Latvia|Lithuania|Luxembourg|Malta|Netherlands|Poland|Portugal|Romania|Slovakia|Slovenia|Spain|Sweden",
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
		type: "OPTIONS",
		value: "Gender",
		options: "M|F|O",
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
		type: "SELECT",
		value: "<p><b>Fields of Activity / Expertise</b></p><p>Your organizations expertise in the field of cybersecurity (according to Article 8 (3)</p>",
		options: null,
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
		type: "SELECT",
		value: "Expertise according to the Cybersecurity Taxonomy",
		options: null,
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
