import React from "react";
import "./PageDashboard.css";
import { getRequest } from "../../utils/request.jsx";
import { getOpenxecoEndpoint, getMiddlewareEndpoint } from "../../utils/env.jsx";
import Loading from "../box/Loading.jsx";
import Info from "../box/Info.jsx";
import Warning from "../box/Warning.jsx";

export default class PageDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oxeStatus: null,
			ecccStatus: null,
			middlewareStatus: null,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.user && this.props.user) {
			this.refreshUserInfo();
		}
	}

	refresh() {
		this.refreshEndpointStatus();
		this.props.refreshUserInfo();
	}

	refreshEndpointStatus() {
		this.setState({
			oxeStatus: null,
			ecccStatus: null,
			middlewareStatus: null,
		}, () => {
			this.requestOxeEndpoint();
			this.requestEcccEndpoint();
			this.requestMiddlewareEndpoint();
		});
	}

	requestOxeEndpoint() {
		const url = getOpenxecoEndpoint() + "healthz";

		getRequest.call(this, url, () => {
			this.setState({
				oxeStatus: "OK",
			});
		}, (response) => {
			this.setState({
				oxeStatus: response.statusText + ": " + url,
			});
		}, (error) => {
			this.setState({
				oxeStatus: error.message + ": " + url,
			});
		});
	}

	requestEcccEndpoint() {
		const url = getMiddlewareEndpoint() + "eccc/get_status";

		getRequest.call(this, url, (data) => {
			this.setState({
				ecccStatus: data,
			});
		}, (response) => {
			this.setState({
				ecccStatus: response.statusText + ": " + url,
			});
		}, (error) => {
			this.setState({
				ecccStatus: error.message + ": " + url,
			});
		});
	}

	requestMiddlewareEndpoint() {
		const url = getMiddlewareEndpoint() + "healthz";

		getRequest.call(this, url, () => {
			this.setState({
				middlewareStatus: "OK",
			});
		}, (response) => {
			this.setState({
				middlewareStatus: response.statusText + ": " + url,
			});
		}, (error) => {
			this.setState({
				middlewareStatus: error.message + ": " + url,
			});
		});
	}

	getStatusBox(stateVar, height) {
		if (!this.state[stateVar]) {
			return <Loading
				height={height}
			/>;
		}

		if (this.state[stateVar] === "OK") {
			return <Info
				content={this.state[stateVar]}
				height={height}
			/>;
		}

		return <Warning
			content={this.state[stateVar]}
			height={height}
		/>;
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageDashboard" className="page max-sized-page">
				<div className={"row"}>
					<div className="col-md-12">
						<h1>Dashboard</h1>
					</div>
				</div>

				<div className={"row"}>
					<div className="col-md-9">
						<h2>Endpoint status</h2>
					</div>

					<div className="col-md-3">
						<div className="top-right-buttons">
							<button
								className={"blue-background"}
								data-hover="Refresh"
								onClick={() => this.refreshEndpointStatus()}>
								<span><i className="fas fa-redo-alt"/></span>
							</button>
						</div>
					</div>

					<div className="col-md-4">
						<h3>openXeco API status</h3>

						{this.getStatusBox("oxeStatus", 150)}
					</div>

					<div className="col-md-4">
						<h3>Middleware API status</h3>

						{this.getStatusBox("middlewareStatus", 150)}
					</div>

					<div className="col-md-4">
						<h3>ECCC API status</h3>

						{this.getStatusBox("ecccStatus", 150)}
					</div>
				</div>

				<div className={"row"}>
					<div className="col-md-9">
						<h2>openXeco user configuration</h2>
					</div>

					<div className="col-md-3">
						<div className="top-right-buttons">
							<button
								className={"blue-background"}
								data-hover="Refresh"
								onClick={() => this.props.refreshUserInfo()}>
								<span><i className="fas fa-redo-alt"/></span>
							</button>
						</div>
					</div>

					<div className="col-md-6">
						<h3>Check user group</h3>

						{!this.props.userGroupAssignments
							&& <Loading
								height={150}
							/>
						}

						{this.props.userGroupAssignments
							&& typeof this.props.userGroupAssignments === "object"
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{this.props.userGroupAssignments
							&& typeof this.props.userGroupAssignments !== "object"
							&& <Warning
								content={this.props.userGroupAssignments}
								height={150}
							/>
						}
					</div>

					<div className="col-md-6">
						<h3>Check group rights</h3>

						{!this.props.userGroupRights
							&& <Loading
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& typeof this.props.userGroupRights === "object"
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& typeof this.props.userGroupRights !== "object"
							&& <Warning
								content={this.props.userGroupRights}
								height={150}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}
