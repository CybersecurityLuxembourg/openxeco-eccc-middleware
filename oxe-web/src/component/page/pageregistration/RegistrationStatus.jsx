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
				assurance_audit_certification: "Fields of activity",
				cryptology: "Fields of activity",
				data_security_and_privacy: "Fields of activity",
				education_and_training: "Fields of activity",
				human_aspects: "Fields of activity",
				identity_and_access_management: "Fields of activity",
				op_incident_handling_forensics: "Fields of activity",
				legal_aspects: "Fields of activity",
				network_and_distributed_systems: "Fields of activity",
				security_management_and_governan: "Fields of activity",
				security_measurements: "Fields of activity",
				soft_and_hard_sec_engineering: "Fields of activity",
				steganography_steganalysis_and_w: "Fields of activity",
				theoretical_foundations: "Fields of activity",
				trust_management_accountability: "Fields of activity",
				sectors: "Fields of activity",
				technologies: "Fields of activity",
				use_cases: "Fields of activity",
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
				nm.info("The form has been edited");

				if (this.props.getFormAndQuestions) {
					this.props.getFormAndQuestions(() => this.generateQuestions());
				}
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

				Promise.all(questionToCreate.map((q) => this.addQuestion(q, this.props.form.id)))
					.then(() => {
						nm.info("The questions have been generated");
						this.reorderQuestions();
						if (this.props.getFormAndQuestions) {
							this.props.getFormAndQuestions();
						}
					})
					.catch(() => {
						nm.error("An error happened while generating the questions");
					});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			nm.warning("Form not found");
		}
	}

	addQuestion(questionToCreate, formId) {
		return new Promise((resolve, reject) => {
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
					resolve();
				}, (response) => {
					reject(response.statusText);
				}, (error) => {
					reject(error.message);
				});
			}, (response) => {
				reject(response.statusText);
			}, (error) => {
				reject(error.message);
			});
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
					nm.info("Please refresh to see the result");
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

	hasRight(endpoint) {
		if (!this.props.userGroupRights) {
			return null;
		}

		return this.props.userGroupRights
			.filter((a) => a.resource === endpoint).length > 0;
	}

	getRightStatusBox(endpoint) {
		if (this.hasRight(endpoint) === null) {
			return <Loading
				height={100}
			/>;
		}

		if (this.hasRight(endpoint) === true) {
			return <Info
				content={"OK: " + endpoint}
				height={50}
			/>;
		}

		return <Warning
			content={<div>
				The current user does not have the right to use this
				resource: {endpoint}
				<br/>
				Some of the features won&apos;t be accessible
				<br/>
				Please review the right on the openXeco administration app if needed
			</div>}
			height={100}
		/>;
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
								onClick={() => this.props.refresh()}>
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
							? <Loading
								height={200}
							/>
							: <div>
								{this.getRightStatusBox("/form/add_form")}
								{this.getRightStatusBox("/form/update_form")}
								{this.getRightStatusBox("/form/add_form_question")}
								{this.getRightStatusBox("/form/update_form_question")}
								{this.getRightStatusBox("/form/update_form_question_order")}
								{this.getRightStatusBox("/form/add_form_answer")}
								{this.getRightStatusBox("/form/update_form_answer")}
							</div>
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

						{(this.props.form === null || !this.props.ecccTaxonomies)
							&& <Loading
								height={150}
							/>
						}

						{this.props.ecccTaxonomies && this.props.form
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{this.props.ecccTaxonomies && typeof this.props.form === "undefined"
							&& <div>
								<Warning
									content={"No form found with the following reference: FORM-ECCC-001"}
									height={150}
								/>
								{this.hasRight("/form/add_form") !== true
									|| this.hasRight("/form/update_form") !== true
									|| (!this.props.ecccTaxonomies
										|| Object.keys(this.state.requiredTaxonomies)
											.filter((t) => !this.props.ecccTaxonomies[t]).length > 0)
									? <Warning
										content={<div>
											You can&apos;t generate the form for the following reason(s):<br/>
											{this.hasRight("/form/add_form") !== true
												&& <div>- The current user does not the following
												right: /form/add_form</div>}
											{this.hasRight("/form/update_form") !== true
												&& <div>- The current user does not the
												following right: /form/update_form</div>}
											{Object.keys(this.state.requiredTaxonomies)
												.filter((t) => !this.props.ecccTaxonomies[t]).length > 0
												&& Object.keys(this.state.requiredTaxonomies)
													.filter((t) => !this.props.ecccTaxonomies[t])
													.map((t) => <div key={t}>- Taxonomy not found: {t}</div>)}
											<br/>Please review so you can generate the form
										</div>}
										height={150}
									/>
									: <Info
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
								}
							</div>
						}
					</div>

					{this.props.form
						&& <div className="col-md-12">
							<h3>Check questions</h3>

							{(!this.props.formQuestions || !this.props.ecccTaxonomies)
								&& <Loading
									height={150}
								/>
							}

							{this.props.formQuestions
								&& this.getQuestionBoxes().length === 0
								&& this.props.ecccTaxonomies
								&& <Info
									content={"OK"}
									height={150}
								/>
							}

							{this.props.formQuestions
								&& this.getQuestionBoxes().length > 0
								&& this.props.ecccTaxonomies
								&& <div>
									{this.hasRight("/form/add_form_question") !== true
										|| this.hasRight("/form/update_form_question") !== true
										|| this.hasRight("/form/update_form_question_order") !== true
										|| (!this.props.ecccTaxonomies
											|| Object.keys(this.state.requiredTaxonomies)
												.filter((t) => !this.props.ecccTaxonomies[t]).length > 0)
										? <Warning
											content={<div>
												You can&apos;t generate the questions for the following reason(s):<br/>
												{this.hasRight("/form/add_form_question") !== true
													&& <div>- The current user does not the following
													right: /form/add_form_question</div>}
												{this.hasRight("/form/update_form_question") !== true
													&& <div>- The current user does not the
													following right: /form/update_form_question</div>}
												{this.hasRight("/form/update_form_question_order") !== true
													&& <div>- The current user does not the
													following right: /form/update_form_question_order</div>}
												{Object.keys(this.state.requiredTaxonomies)
													.filter((t) => !this.props.ecccTaxonomies[t]).length > 0
													&& Object.keys(this.state.requiredTaxonomies)
														.filter((t) => !this.props.ecccTaxonomies[t])
														.map((t) => <div key={t}>- Taxonomy not found: {t}</div>)}
												<br/>Please fix this issues so you can generate the questions
											</div>}
											height={150}
										/>
										: <Info
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
									}

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
