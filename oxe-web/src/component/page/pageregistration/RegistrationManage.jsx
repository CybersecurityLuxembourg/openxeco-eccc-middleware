import React from "react";
import "./RegistrationManage.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../../utils/url.jsx";
import { getRequest } from "../../../utils/request.jsx";
import { areValuesEqual, getFieldLocation, getStatusLabel } from "../../../utils/registration.jsx";
import { getOpenxecoEndpoint, getMiddlewareEndpoint } from "../../../utils/env.jsx";
import Registration from "../../item/Registration.jsx";
import User from "../../item/User.jsx";
import Loading from "../../box/Loading.jsx";
import Table from "../../table/Table.jsx";
import DialogHintEcccStatus from "../../dialog/dialoghint/DialogHintEcccStatus.jsx";
import DialogHintSynchStatus from "../../dialog/dialoghint/DialogHintSynchStatus.jsx";

export default class RegistrationManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formAnswers: null,
			users: null,
			ecccRegistrations: null,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.form !== this.props.form) {
			this.refresh();
		}
	}

	refresh() {
		this.fetchAnswers();
		this.fetchEcccRegistrations();
	}

	fetchAnswers() {
		if (this.props.form) {
			this.setState({
				formAnswers: null,
			}, () => {
				const filters = {
					form_id: this.props.form.id,
				};

				getRequest.call(this, getOpenxecoEndpoint() + "form/get_form_answers?" + dictToURI(filters), (data) => {
					this.setState({
						formAnswers: data,
					}, () => {
						this.fetchUsers();
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}
	}

	fetchUsers() {
		const filters = {
			ids: this.getUserList(),
		};

		getRequest.call(this, getOpenxecoEndpoint() + "user/get_users?" + dictToURI(filters), (data2) => {
			this.setState({
				users: data2.items,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	fetchEcccRegistrations() {
		const url = getMiddlewareEndpoint() + "eccc/get_registrations";

		getRequest.call(this, url, (data) => {
			this.setState({
				ecccRegistrations: data,
			});
		}, (response) => {
			this.setState({
				ecccRegistrations: [],
			});
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getUserList() {
		if (!this.state.formAnswers) {
			return [];
		}

		return [...new Set(
			this.state.formAnswers.map((a) => a.user_id),
		)];
	}

	getEcccRegistrationObject(orgId) {
		if (!this.state.ecccRegistrations) {
			return null;
		}

		if (typeof this.state.ecccRegistrations !== "object"
				|| !Array.isArray(this.state.ecccRegistrations.data)) {
			return null;
		}

		const sel = this.state.ecccRegistrations.data
			.filter((r) => r.id === orgId);

		if (sel.length > 0) {
			return sel[0];
		}

		return null;
	}

	getSynchronisationStatus(orgId, userId) {
		if (!this.state.ecccRegistrations) {
			return "Loading ECCC registrations...";
		}

		if (typeof this.state.ecccRegistrations !== "object"
				|| !Array.isArray(this.state.ecccRegistrations.data)) {
			return "ERROR: Unexpected result for ECCC registrations";
		}

		if (!orgId || orgId === "Not found") {
			return "Not uploaded";
		}

		let ecccObject = this.state.ecccRegistrations.data
			.filter((r) => r.id === orgId);

		if (ecccObject.length > 0) {
			ecccObject = ecccObject[0];

			const questionToCheck = this.props.formQuestions
				.filter((q) => getFieldLocation()[q.reference]);

			for (let i = 0; i < questionToCheck.length; i++) {
				if (!areValuesEqual(questionToCheck[i], ecccObject,
					this.state.formAnswers.filter((a) => a.user_id === userId),
					this.props.ecccTaxonomies)) {
					return "Uploaded - not synchronized";
				}
			}

			return "Uploaded - synchronized";
		}

		return "Uploaded - not found";
	}

	// eslint-disable-next-line class-methods-use-this
	getSynchronisationStatusColoration(s) {
		if (s === "Uploaded - synchronized") {
			return <div className="blue-font">{s}</div>;
		}
		if (s === "Uploaded - not synchronized") {
			return <div className="orange-font">{s}</div>;
		}
		if (s === "Uploaded - not found") {
			return <div className="red-font">{s}</div>;
		}

		return s;
	}

	getRegistrationId(userId) {
		const refQuestions = this.props.formQuestions
			.filter((q) => q.reference === "FORM-ECCC-001-Q000");

		if (refQuestions.length === 0) {
			return "Question not found";
		}

		const answers = this.state.formAnswers
			.filter((a) => a.user_id === userId)
			.filter((a) => a.form_question_id === refQuestions[0].id);

		if (answers.length === 0) {
			return "Not found";
		}

		return answers[0].value;
	}

	isValidatedByUser(userId) {
		const refQuestions = this.props.formQuestions
			.filter((q) => q.reference === "FORM-ECCC-001-Q501");

		if (refQuestions.length === 0) {
			return "Question not found";
		}

		const answers = this.state.formAnswers
			.filter((a) => a.user_id === userId)
			.filter((a) => a.form_question_id === refQuestions[0].id);

		if (answers.length === 0) {
			return "FALSE";
		}

		return answers[0].value;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		const columns = [
			{
				Header: "User",
				accessor: (x) => x,
				Cell: ({ cell: { value } }) => (
					<div>
						<User
							id={value}
							email={
								this.state.users && this.state.users.filter((o) => o.id === value).pop()
									? this.state.users.filter((o) => o.id === value).pop().email
									: undefined
							}
						/>
					</div>
				),
			},
			{
				Header: "Form",
				accessor: (x) => x,
				Cell: ({ cell: { value } }) => (
					<div>
						<Registration
							key={value}
							userId={value}
							user={
								this.state.users
									? this.state.users.filter((o) => o.id === value).pop()
									: undefined
							}
							form={this.props.form}
							formQuestions={this.props.formQuestions}
							formAnswers={this.state.formAnswers.filter((a) => a.user_id === value)}
							ecccObject={this.getEcccRegistrationObject(
								this.getRegistrationId(value),
							)}
							syncStatus={this.getSynchronisationStatus(
								this.getRegistrationId(value), value,
							)}
							ecccTaxonomies={this.props.ecccTaxonomies}
							afterUpload={() => this.refresh()}
							onClose={() => this.refresh()}
						/>
					</div>
				),
			},
			{
				id: "validated_by_user",
				Header: () => <div className="centered">Validated by user</div>,
				accessor: (x) => x,
				Cell: ({ cell: { value } }) => (
					<div className="centered">
						{this.isValidatedByUser(value)}
					</div>
				),
				width: 150,
			},
			{
				id: "synch_status",
				Header: () => <div className="centered">Synch. status <DialogHintSynchStatus/></div>,
				accessor: (x) => x,
				Cell: ({ cell: { value } }) => (
					<div className="centered">
						{this.getSynchronisationStatusColoration(
							this.getSynchronisationStatus(
								this.getRegistrationId(value), value,
							),
						)}
					</div>
				),
				width: 150,
			},
			{
				id: "eccc_status",
				Header: () => <div className="centered">ECCC status <DialogHintEcccStatus/></div>,
				accessor: (x) => x,
				Cell: ({ cell: { value } }) => (
					<div className="centered">
						{this.getEcccRegistrationObject(this.getRegistrationId(value))
							? getStatusLabel(
								this.getEcccRegistrationObject(this.getRegistrationId(value))
									.attributes.moderation_state,
							)
							: "N/A"
						}
					</div>
				),
				width: 150,
			},
		];

		return (
			<div id="RegistrationManage" className="max-sized-page">
				<div className={"row"}>
					<div className="col-md-9">
						<h1>Manage registrations</h1>
					</div>

					<div className="col-md-3">
						<div className={"top-right-buttons"}>
							<button onClick={() => this.refresh()}>
								<i className="fas fa-redo-alt"/>
							</button>
						</div>
					</div>

					<div className="col-md-12">
						{(!this.state.formAnswers || !this.state.ecccRegistrations)
							&& <Loading
								height={300}
							/>
						}

						{this.state.formAnswers && this.state.ecccRegistrations
							&& <Table
								columns={columns}
								data={this.getUserList()}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}
