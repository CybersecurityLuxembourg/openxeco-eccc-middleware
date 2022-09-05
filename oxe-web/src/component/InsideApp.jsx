import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Menu from "./bar/Menu.jsx";
import Loading from "./box/Loading.jsx";
import PageDashboard from "./page/PageDashboard.jsx";
import { getOxeApiURL } from "../utils/env.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: window.location.pathname.replace(/\//, ""),
			settings: null,
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	componentDidMount() {
		this.refreshSettings();
	}

	refreshSettings(afterRefresh) {
		getRequest.call(this, getOxeApiURL() + "public/get_public_settings", (data) => {
			this.setState({
				settings: data,
			}, () => {
				if (afterRefresh) {
					afterRefresh();
				}
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		if (!this.state.settings) {
			return <Loading/>;
		}

		return (
			<div id="InsideApp" className={"fade-in"}>
				<Route render={(props) => <Menu
					selectedMenu={this.state.selectedMenu}
					changeMenu={(v) => this.changeState("selectedMenu", v)}
					disconnect={this.props.disconnect}
					cookies={this.props.cookies}
					settings={this.state.settings}
					{...props}
				/>}/>
				<div id="InsideApp-content">
					<Switch>
						<Route path="/home" render={(props) => <PageDashboard {...props} />}/>

						<Route path="/" render={(props) => <PageDashboard {...props} />}/>
					</Switch>
				</div>
			</div>
		);
	}
}
