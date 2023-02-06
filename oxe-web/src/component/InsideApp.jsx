import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Menu from "./bar/Menu.jsx";
import Loading from "./box/Loading.jsx";
import PageDashboard from "./page/PageDashboard.jsx";
import PageRegistration from "./page/PageRegistration.jsx";
import { getOpenxecoEndpoint } from "../utils/env.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: window.location.pathname.replace(/\//, ""),
			settings: null,
			userGroupAssignments: null,
			userGroupRights: null,
		};
	}

	componentDidMount() {
		this.refreshSettings();
		this.refreshUserInfo();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.user && this.props.user) {
			this.refreshUserInfo();
		}
	}

	refreshSettings(afterRefresh) {
		getRequest.call(this, getOpenxecoEndpoint() + "public/get_public_settings", (data) => {
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

	refreshUserInfo() {
		if (this.props.user) {
			this.setState({
				userGroupAssignments: null,
				userGroupRights: null,
			}, () => {
				getRequest.call(this, getOpenxecoEndpoint() + "user/get_user_group_assignments", (data) => {
					this.setState({
						userGroupAssignments: data.filter((a) => a.user_id === this.props.user.id).pop()
							|| "No group found for this user",
					}, () => {
						if (typeof this.state.userGroupAssignments === "object") {
							getRequest.call(this, getOpenxecoEndpoint() + "user/get_user_group_rights/"
								+ this.state.userGroupAssignments.group_id, (data2) => {
								this.setState({
									userGroupRights: data2,
								});
							}, (response) => {
								this.setState({
									userGroupRights: response.statusText,
								});
							}, (error) => {
								this.setState({
									userGroupRights: error.message,
								});
							});
						}
					});
				}, (response) => {
					this.setState({
						userGroupAssignments: response.statusText,
					});
				}, (error) => {
					this.setState({
						userGroupAssignments: error.message,
					});
				});
			});
		}
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		if (!this.state.settings || !getOpenxecoEndpoint()) {
			return <Loading/>;
		}

		return (
			<div id="InsideApp" className={"fade-in"}>
				<Route render={(props) => <Menu
					selectedMenu={this.state.selectedMenu}
					changeMenu={(v) => this.changeState("selectedMenu", v)}
					disconnect={this.props.disconnect}
					logout={this.props.logout}
					settings={this.state.settings}
					{...props}
				/>}/>
				<div id="InsideApp-content">
					<Switch>
						<Route path="/home" render={(props) => <PageDashboard
							user={this.props.user}
							userGroupAssignments={this.state.userGroupAssignments}
							userGroupRights={this.state.userGroupRights}
							refreshUserInfo={() => this.refreshUserInfo()}
							{...props}
						/>}/>
						<Route path="/registration" render={(props) => <PageRegistration
							user={this.props.user}
							userGroupAssignments={this.state.userGroupAssignments}
							userGroupRights={this.state.userGroupRights}
							refreshUserInfo={() => this.refreshUserInfo()}
							formReference={this.props.formReference}
							formQuestions={this.props.formQuestions}
							{...props}
						/>}/>

						<Route path="/" render={(props) => <PageDashboard
							user={this.props.user}
							userGroupAssignments={this.state.userGroupAssignments}
							userGroupRights={this.state.userGroupRights}
							refreshUserInfo={() => this.refreshUserInfo()}
							{...props}
						/>}/>
					</Switch>
				</div>
			</div>
		);
	}
}
