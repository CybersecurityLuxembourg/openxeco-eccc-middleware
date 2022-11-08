import React from "react";
import "./RegistrationStatus.css";
import { NotificationManager as nm } from "react-notifications";
import Loading from "../../box/Loading.jsx";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";
import { endpoints, formQuestions, formReference } from "../../../settings.jsx";
import { getRequest, postRequest } from "../../../utils/request.jsx";
import DialogConfirmation from "../../dialog/DialogConfirmation.jsx";

export default class RegistrationStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	generateForm() {
		let params = {
			name: "ECCC membership registration",
		};

		postRequest.call(this, endpoints.openxeco + "form/add_form", params, (form) => {
			params = {
				id: form.id,
				reference: formReference,
				status: "INACTIVE",
			};

			postRequest.call(this, endpoints.openxeco + "form/update_form", params, () => {
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
			getRequest.call(this, endpoints.openxeco + "form/get_form_questions?form_id=" + this.props.form.id, (questions) => {
				const existingQuestionReferences = questions.map((q) => q.reference);
				const questionToCreate = formQuestions
					.filter((q) => !existingQuestionReferences.includes(q.reference));

				for (let i = 0; i < questionToCreate.length; i++) {
					this.addQuestion(questionToCreate[i], this.props.form.id);
				}

				this.reorderQuestions();
				nm.warning("The form questions have been generated. Please refresh");
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

		postRequest.call(this, endpoints.openxeco + "form/add_form_question", params1, (question) => {
			const params2 = {
				id: question.id,
				status: "ACTIVE",
				...questionToCreate,
			};

			postRequest.call(this, endpoints.openxeco + "form/update_form_question", params2, () => {
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
			getRequest.call(this, endpoints.openxeco + "form/get_form_questions?form_id=" + this.props.form.id, (questions) => {
				const existingReferences = questions.map((q) => q.reference);
				const references = this.props.formQuestions.map((q) => q.reference);
				let positions = references
					.map((r) => existingReferences.filter((e) => e.reference === r).pop());
				positions = positions.filter((r) => r);
				positions = positions.map((p) => p.id);

				const params = {
					form_id: this.props.form.id,
					question_order: positions,
				};

				postRequest.call(this, endpoints.openxeco + "form/update_form_question_order", params, () => {
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

		for (let i = 0; i < formQuestions.length; i++) {
			boxes.push(this.getQuestionBox(formQuestions[i]));
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
		if (!this.props.formQuestions || !formQuestions) {
			return [];
		}

		const getMultipleWarning = (r) => r + ": multiple questions found with this reference";

		const warnings = [];

		for (let i = 0; i < this.props.formQuestions.length; i++) {
			const question = this.props.formQuestions[i];
			const references = formQuestions.map((r) => r.reference);

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
					<div className="col-md-12">
						<h1>Status</h1>
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-9">
						<h2>openXeco form configuration</h2>
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
