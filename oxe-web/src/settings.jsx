export const endpoints = {
	middleware: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""
		? "http://localhost:5002/"
		: "https://api-mid." + window.location.hostname.replace("www.", "").split(".").slice(1).join(".") + "/",
	openxeco: null,
	eccc: null,
};

export const openxeco = {};

export const formReference = "FORM-ECCC-001";

export const formQuestionReferences = [
	{ reference: "FORM-ECCC-001-Q101", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q102", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q103", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q104", type: "CHECKBOX" },
	{ reference: "FORM-ECCC-001-Q105", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q106", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q107", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q108", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q109", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q110", type: "CHECKBOX" },
	{ reference: "FORM-ECCC-001-Q111", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q112", type: "CHECKBOX" },
	{ reference: "FORM-ECCC-001-Q113", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q114", type: "CHECKBOX" },
	{ reference: "FORM-ECCC-001-Q115", type: "CHECKBOX" },

	{ reference: "FORM-ECCC-001-Q201", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q202", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q203", type: "OPTIONS", options: "M|F|O" },
	{ reference: "FORM-ECCC-001-Q204", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q205", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q206", type: "TEXT" },

	{ reference: "FORM-ECCC-001-Q301", type: "SELECT", options: null },
	{ reference: "FORM-ECCC-001-Q302", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q303", type: "SELECT", options: null },
	{ reference: "FORM-ECCC-001-Q304", type: "TEXT" },
	{ reference: "FORM-ECCC-001-Q305", type: "TEXT" },

	{ reference: "FORM-ECCC-001-Q401", type: "CHECKBOX" },
	{ reference: "FORM-ECCC-001-Q402", type: "CHECKBOX" },
];
