import React from "react";
import "./RegistrationStatus.css";
import { NotificationManager as nm } from "react-notifications";
import { postRequest } from "../../../utils/request.jsx";
import { buildRegistrationBody } from "../../../utils/registration.jsx";
import Log from "../Log.jsx";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";
import Message from "../../box/Message.jsx";
import DialogConfirmation from "../../dialog/DialogConfirmation.jsx";
import { getMiddlewareEndpoint } from "../../../utils/env.jsx";

export default class RegistrationStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logs: {},
		};
	}

	pushRegistration() {
		const params = {
			body: buildRegistrationBody(this.props.formQuestions, this.props.formAnswers),
		};

		postRequest.call(this, getMiddlewareEndpoint() + "eccc/add_registration", params, () => {
			if (this.props.afterUpload) {
				this.props.afterUpload();
			}
			nm.info("The registration has been pushed");
		}, (response) => {
			nm.warning("An error occured. Please check the logs below");
			const l = this.state.logs;
			l["Log " + new Date().toISOString()] = response.statusText;
			this.setState({
				logs: l,
			});
		}, (error) => {
			nm.error(error.message);
		});
	}

	updateRegistration() {
		const params = {
			body: buildRegistrationBody(this.props.formQuestions, this.props.formAnswers),
		};

		postRequest.call(this, getMiddlewareEndpoint() + "eccc/update_registration", params, () => {
			if (this.props.afterUpload) {
				this.props.afterUpload();
			}
			nm.info("The registration has been updated");
		}, (response) => {
			nm.warning("An error occured. Please check the logs below");
			const l = this.state.logs;
			l["Log " + new Date().toISOString()] = response.statusText;
			this.setState({
				logs: l,
			});
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="RegistrationStatus">
				<div className={"row"}>
					<div className="col-md-12">
						<h2>Status</h2>
					</div>

					<div className="col-md-6">
						<h3>Form completion</h3>

						{this.props.calculateFormCompletion() === 100
							? <Info
								content={"This form is complete"}
								height={150}
							/>
							: <Warning
								content={"Form completed at " + this.props.calculateFormCompletion() + "%"}
								height={150}
							/>
						}
					</div>

					<div className="col-md-6">
						<h3>Synchronization status</h3>

						{this.props.syncStatus === "Synchronized"
							? <Info
								content={this.props.syncStatus}
								height={150}
							/>
							: <Warning
								content={this.props.syncStatus}
								height={150}
							/>
						}
					</div>
				</div>

				{this.props.syncStatus !== "Synchronized"
					&& <div className={"row"}>
						<div className="col-md-12">
							<h2>Action</h2>
						</div>

						{this.props.calculateFormCompletion() !== 100
							&& <div className="col-md-12">
								<Message
									content={"No action available as the form is not complete"}
									height={150}
								/>
							</div>
						}

						{this.props.calculateFormCompletion() === 100 && !this.props.ecccObject
							&& <div className="col-md-6">
								<h3>Create registration</h3>

								<Info
									content={<div>
										Push the registration at the ECCC level:&nbsp;&nbsp;
										<DialogConfirmation
											text={"Are you sure you want to push the registration?"}
											trigger={
												<button>
													<i className="fas fa-upload"/> Push...
												</button>
											}
											afterConfirmation={() => this.pushRegistration()}
										/>
									</div>}
									height={150}
								/>
							</div>
						}

						{this.props.calculateFormCompletion() === 100 && this.props.ecccObject
							&& <div className="col-md-6">
								<h3>Update registration</h3>

								<Info
									content={<div>
										Update the registration at the ECCC level:&nbsp;&nbsp;
										<DialogConfirmation
											text={"Are you sure you want to update the registration?"}
											trigger={
												<button>
													<i className="fas fa-upload"/> Update...
												</button>
											}
											afterConfirmation={() => this.updateRegistration()}
										/>
									</div>}
									height={150}
								/>
							</div>
						}
					</div>
				}

				{Object.keys(this.state.logs).length > 0
					&& <div className={"row"}>
						<div className="col-md-12">
							<h2>Logs</h2>
						</div>

						<div className="col-md-12" key={"l"}>
							{Object.keys(this.state.logs).map((l) => (
								<Log
									key={l}
									name={l}
									content={this.state.logs[l]}
								/>
							))}
						</div>
					</div>
				}
			</div>
		);
	}
}
