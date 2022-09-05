import React from "react";
import "./PageDashboard.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.getAnalytics = this.getAnalytics.bind(this);
		this.getEntities = this.getEntities.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);

		this.state = {
			analytics: null,
			entities: null,
			selectedMenu: null,
			tabs: [
				"community",
				"graph",
				"analytics",
				"recent_activities",
			],
		};
	}

	componentDidMount() {
		if (getUrlParameter("tab") !== null && this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}

		this.refresh();
	}

	componentDidUpdate() {
		if (this.state.selectedMenu !== getUrlParameter("tab")
			&& this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	refresh() {
		this.getAnalytics();
		this.getEntities();
	}

	getAnalytics() {
		this.setState({ analytics: null }, () => {
			getRequest.call(this, "public/get_public_analytics", (data) => {
				this.setState({
					analytics: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	getEntities() {
		this.setState({ entities: null }, () => {
			getRequest.call(this, "entity/get_entities", (data) => {
				this.setState({
					entities: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageDashboard" className="page max-sized-page">
				Hi!
			</div>
		);
	}
}
