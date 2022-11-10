export function getCookieOptions() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return { domain: "localhost", path: "/" };
	}
	return {
		secure: true,
		domain: "." + window.location.hostname.replace("www.", "").split(".").slice(1).join("."),
		path: "/",
	};
}

export function isInternetExplorer() {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}

export function getMiddlewareEndpoint() {
	return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""
		? "http://localhost:5002/"
		: "https://eccc-api." + window.location.hostname.replace("www.", "").split(".").slice(1).join(".") + "/";
}

export function getOpenxecoEndpoint() {
	return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""
		? "http://localhost:5000/"
		: "https://api." + window.location.hostname.replace("www.", "").split(".").slice(1).join(".") + "/";
}
