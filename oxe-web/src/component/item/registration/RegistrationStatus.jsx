import React from "react";
import "./RegistrationStatus.css";
import { NotificationManager as nm } from "react-notifications";
import { postRequest } from "../../../utils/request.jsx";
import { buildRegistrationBody, getStatusLabel } from "../../../utils/registration.jsx";
import Log from "../Log.jsx";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";
import Message from "../../box/Message.jsx";
import DialogConfirmation from "../../dialog/DialogConfirmation.jsx";
import { getMiddlewareEndpoint, getOpenxecoEndpoint } from "../../../utils/env.jsx";

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

		postRequest.call(this, getMiddlewareEndpoint() + "eccc/add_registration", params, (data) => {
			nm.info("The registration has been pushed");

			const params2 = {
				user_id: this.props.userId,
				form_question_id: this.props.formQuestions
					.filter((q) => q.reference === "FORM-ECCC-001-Q000")
					.map((q) => q.id).pop(),
				value: data.data.id,
			};

			postRequest.call(this, getOpenxecoEndpoint() + "form/add_form_answer", params2, () => {
				if (this.props.afterUpload) {
					this.props.afterUpload();
				}
				nm.info("The registration ID has been updated on openXeco");
			}, (response) => {
				nm.warning("An error occured while updating the openXeco registration. Please check the logs below");
				const l = this.state.logs;
				l["Log " + new Date().toISOString()] = response.statusText;
				this.setState({
					logs: l,
				});
			}, (error) => {
				nm.error(error.message);
			});
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

	updateRegistrationStatus(status) {
		if (this.props.ecccObject && this.props.ecccObject.id) {
			const params = {
				id: this.props.ecccObject.id,
				status,
			};

			postRequest.call(this, getMiddlewareEndpoint() + "eccc/update_registration_status", params, () => {
				if (this.props.afterUpload) {
					this.props.afterUpload();
				}
				nm.info("The status of the registration has been updated");
			}, (response) => {
				nm.warning("An error occured. Please check the logs below");
				const l = this.state.logs;
				l["Log " + new Date().toISOString()] = response.statusText;
				console.log(response.statusText);
				this.setState({
					logs: l,
				});
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			nm.warning("No ECCC object found");
		}
	}

	getNextStatus() {
		return this.props.ecccObject.attributes.moderation_state === "draft"
			? "ready_for_publication"
			: "draft";
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

						{this.props.syncStatus === "Uploaded - synchronized"
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

				<div className={"row"}>
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
						&& this.props.syncStatus !== "Uploaded - synchronized"
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
					{this.props.calculateFormCompletion() === 100 && this.props.ecccObject
						&& <div className="col-md-6">
							<h3>Change the registration status</h3>

							<Info
								content={<div>
									Change the status at the ECCC level:&nbsp;&nbsp;
									<DialogConfirmation
										text={"Are you sure you want to update the status of the registration?"}
										trigger={
											<button>
												<i className="fas fa-pencil-alt"/>&nbsp;
													Set to &quot;{getStatusLabel(this.getNextStatus())}&quot;
											</button>
										}
										afterConfirmation={() => this.updateRegistrationStatus(
											this.getNextStatus(),
										)}
									/>
								</div>}
								height={150}
							/>
						</div>
					}
				</div>

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
