import React from "react";
import "./RegistrationStatus.css";
import { NotificationManager as nm } from "react-notifications";
import Loading from "../../box/Loading.jsx";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";
import { getFormQuestions, getFormReference } from "../../../utils/registration.jsx";
import { getOpenxecoEndpoint } from "../../../utils/env.jsx";
import { getRequest, postRequest } from "../../../utils/request.jsx";
import DialogConfirmation from "../../dialog/DialogConfirmation.jsx";

export default class RegistrationStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			requiredTaxonomies: {
				country: "Countries",
				cluster_type: "Cluster types",
				cluster_thematic_area: "Cluster thematic areas",
				fields_of_activity: "Fields of activity",
			},
		};
	}

	generateForm() {
		let params = {
			name: "ECCC membership registration",
		};

		postRequest.call(this, getOpenxecoEndpoint() + "form/add_form", params, (form) => {
			params = {
				id: form.id,
				reference: getFormReference(),
				status: "INACTIVE",
			};

			postRequest.call(this, getOpenxecoEndpoint() + "form/update_form", params, () => {
				if (this.props.refreshFormAndQuestions) {
					this.props.refreshFormAndQuestions();
				}

				nm.info("The form has been edited");
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});

			nm.info("The form has been created");
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	generateQuestions() {
		if (this.props.form) {
			getRequest.call(this, getOpenxecoEndpoint() + "form/get_form_questions?form_id=" + this.props.form.id, (questions) => {
				const existingQuestionReferences = questions.map((q) => q.reference);
				const questionToCreate = getFormQuestions(this.props.ecccTaxonomies)
					.filter((q) => !existingQuestionReferences.includes(q.reference));

				for (let i = 0; i < questionToCreate.length; i++) {
					this.addQuestion(questionToCreate[i], this.props.form.id);
				}

				this.reorderQuestions();
				nm.info("The form questions have been generated. Please refresh");
			}, (response) => {
				this.setState({
					userGroupAssignments: response.statusText,
				});
			}, (error) => {
				this.setState({
					userGroupAssignments: error.message,
				});
			});
		} else {
			nm.warning("Form not found");
		}
	}

	addQuestion(questionToCreate, formId) {
		const params1 = {
			form_id: formId,
		};

		postRequest.call(this, getOpenxecoEndpoint() + "form/add_form_question", params1, (question) => {
			const params2 = {
				id: question.id,
				status: "ACTIVE",
				...questionToCreate,
			};

			delete params2.mandatory;

			postRequest.call(this, getOpenxecoEndpoint() + "form/update_form_question", params2, () => {
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	reorderQuestions() {
		if (this.props.form) {
			getRequest.call(this, getOpenxecoEndpoint() + "form/get_form_questions?form_id=" + this.props.form.id, (questions) => {
				const references = this.props.formQuestions.map((q) => q.reference);
				let positions = references.map((r) => questions.filter((e) => e.reference === r).pop());
				positions = positions.filter((r) => r);
				positions = positions.map((p) => p.id);

				const params = {
					form_id: this.props.form.id,
					question_order: positions,
				};

				postRequest.call(this, getOpenxecoEndpoint() + "form/update_form_question_order", params, () => {
					nm.info("The questions has been reordered");
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
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
		} else {
			nm.warning("Form not found");
		}
	}

	getQuestionBoxes() {
		let boxes = [];

		for (let i = 0; i < getFormQuestions().length; i++) {
			boxes.push(this.getQuestionBox(getFormQuestions(this.props.ecccTaxonomies)[i]));
		}

		boxes = boxes.filter((b) => b);

		return boxes;
	}

	getQuestionBox(qu) {
		const question = this.props.formQuestions.filter((q) => q.reference === qu.reference).pop();

		if (question) {
			if (question.type !== qu.type) {
				return <Warning
					content={question.reference + ": question found with the wrong type. "
						+ "The type should be: " + qu.type}
				/>;
			}

			if (["SELECT", "OPTIONS"].includes(qu.type)
				&& question.options
				&& question.options !== qu.options) {
				return <Warning
					content={qu.reference + ": question found with the wrong options. "
						+ "The options should be: " + qu.options}
				/>;
			}

			return null;
		}

		return <Warning
			content={qu.reference + ": no question found with this reference"}
		/>;
	}

	getExtraWarningBoxes() {
		if (!this.props.formQuestions || !getFormQuestions()) {
			return [];
		}

		const getMultipleWarning = (r) => r + ": multiple questions found with this reference";

		const warnings = [];

		for (let i = 0; i < this.props.formQuestions.length; i++) {
			const question = this.props.formQuestions[i];
			const references = getFormQuestions().map((r) => r.reference);

			if (!question.reference) {
				warnings.push("No reference found for a question");
			} else {
				if (!references.includes(question.reference)) {
					warnings.push("Unexpected reference found for a question: " + question.reference);
				}

				if (references.includes(question.reference) && this.props.formQuestions
					.filter((q) => q.reference === question.reference).length > 1
					&& !warnings.includes(getMultipleWarning(question.reference))) {
					warnings.push(getMultipleWarning(question.reference));
				}
			}
		}

		return warnings;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="RegistrationStatus" className="max-sized-page">
				<div className={"row"}>
					<div className="col-md-9">
						<h1>Status</h1>
					</div>

					<div className="col-md-3">
						<div className="top-right-buttons">
							<button
								className={"blue-background"}
								data-hover="Refresh"
								onClick={() => this.props.refreshFormAndQuestions()}>
								<span><i className="fas fa-redo-alt"/></span>
							</button>
						</div>
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>openXeco user configuration</h2>
					</div>

					<div className="col-md-12">
						<h3>Check user rights</h3>

						{!this.props.userGroupRights
							&& <Loading
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& this.props.userGroupRights
								.filter((a) => a.resource === "/form/add_form_answer").length > 0
							&& <Info
								content={"OK: /form/add_form_answer"}
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& this.props.userGroupRights
								.filter((a) => a.resource === "/form/add_form_answer").length === 0
							&& <Warning
								content={<div>
									The current user does not have the following resource to use this
									resource: /form/add_form_answer
									<br/>
									It won&apos;t be possible to perform an upload of registration
									not a modification of a registration
									<br/>
									Please review the right on the openXeco administration app
								</div>}
								height={150}
							/>
						}

						{!this.props.userGroupRights
							&& <Loading
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& this.props.userGroupRights
								.filter((a) => a.resource === "/form/update_form_answer").length > 0
							&& <Info
								content={"OK: /form/update_form_answer"}
								height={150}
							/>
						}

						{this.props.userGroupRights
							&& this.props.userGroupRights
								.filter((a) => a.resource === "/form/update_form_answer").length === 0
							&& <Warning
								content={<div>
									The current user does not have the following resource to use this
									resource: /form/update_form_answer
									<br/>
									It won&apos;t be possible to perform a modification of a registration
									<br/>
									Please review the right on the openXeco administration app
								</div>}
								height={150}
							/>
						}
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Required ECCC taxonomies</h2>
					</div>

					{this.props.ecccTaxonomies
						&& Object.keys(this.state.requiredTaxonomies).map((k) => (
							<div className="col-md-6" key={k}>
								<h3>Taxonomy: {this.state.requiredTaxonomies[k]}</h3>

								{this.props.ecccTaxonomies[k]
									? <Info
										content={"Taxonomy found and complete"}
										height={50}
									/>
									: <Warning
										content={"Taxonomy not found"}
										height={50}
									/>
								}
							</div>
						))
					}

					{!this.props.ecccTaxonomies
						&& <div className="col-md-12">
							<Loading
								height={50}
							/>
						</div>
					}
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>openXeco form configuration</h2>
					</div>

					<div className="col-md-12">
						<h3>Check form</h3>

						{this.props.form === null
							&& <Loading
								height={150}
							/>
						}

						{this.props.form
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{typeof this.props.form === "undefined"
							&& <div>
								<Warning
									content={"No form found with the following reference: FORM-ECCC-001"}
									height={150}
								/>
								<Info
									content={<div>
										You can generate the form by clicking this button:&nbsp;&nbsp;
										<DialogConfirmation
											text={"Are you sure you want to generate the form?"}
											trigger={
												<button>
													<i className="fas fa-tools"/> Generate form...
												</button>
											}
											afterConfirmation={() => this.generateForm()}
										/>
									</div>}
									height={150}
								/>
							</div>
						}
					</div>

					{this.props.form
						&& <div className="col-md-12">
							<h3>Check questions</h3>

							{!this.props.formQuestions
								&& <Loading
									height={150}
								/>
							}

							{this.props.formQuestions && this.getQuestionBoxes().length === 0
								&& <Info
									content={"OK"}
									height={150}
								/>
							}

							{this.props.formQuestions && this.getQuestionBoxes().length > 0
								&& <div>
									<Info
										content={<div>
											You can generate the questions by clicking this button:&nbsp;&nbsp;
											<DialogConfirmation
												text={"Are you sure you want to generate the questions?"}
												trigger={
													<button>
														<i className="fas fa-tools"/> Generate questions...
													</button>
												}
												afterConfirmation={() => this.generateQuestions()}
											/>
										</div>}
										height={150}
									/>

									{this.getQuestionBoxes()}
								</div>
							}

							{this.getExtraWarningBoxes().map((c, i) => (
								<Warning
									key={i}
									content={c}
								/>
							))}
						</div>
					}
				</div>
			</div>
		);
	}
}
