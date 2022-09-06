import React from "react";
import "./PageDashboard.css";
import { getRequest } from "../../utils/request.jsx";
import { getOxeApiURL, getEcccApiURL, getMiddlewareApiURL } from "../../utils/env.jsx";
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
		getRequest.call(this, getOxeApiURL() + "healthz", () => {
			this.setState({
				oxeStatus: "OK",
			});
		}, (response) => {
			this.setState({
				oxeStatus: response.statusText,
			});
		}, (error) => {
			this.setState({
				oxeStatus: error.message,
			});
		});
	}

	requestEcccEndpoint() {
		getRequest.call(this, getEcccApiURL() + "public/get_public_node_information?", () => {
			this.setState({
				ecccStatus: "OK",
			});
		}, (response) => {
			this.setState({
				ecccStatus: response.statusText,
			});
		}, (error) => {
			this.setState({
				ecccStatus: error.message,
			});
		});
	}

	requestMiddlewareEndpoint() {
		getRequest.call(this, getMiddlewareApiURL() + "healthz", () => {
			this.setState({
				middlewareStatus: "OK",
			});
		}, (response) => {
			this.setState({
				middlewareStatus: response.statusText,
			});
		}, (error) => {
			this.setState({
				middlewareStatus: error.message,
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
