import React from "react";
import "./RegistrationStatus.css";
import Loading from "../../box/Loading.jsx";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";
import { formQuestionReferences } from "../../../settings.jsx";

export default class RegistrationStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getQuestionBox(ref) {
		const question = this.props.formQuestions.filter((q) => q.reference === ref.reference).pop();

		if (question) {
			if (question.type !== ref.type) {
				return <Warning
					content={ref.reference + ": question found with the wrong type. "
						+ "The type should be: " + ref.type}
				/>;
			}

			console.log(ref.options, question.options);

			if (["SELECT", "OPTIONS"].includes(question.type)
				&& ref.options
				&& ref.options !== question.options) {
				return <Warning
					content={ref.reference + ": question found with the wrong options. "
						+ "The options should be: " + ref.options}
				/>;
			}

			return <Info
				content={ref.reference + ": OK"}
			/>;
		}

		return <Warning
			content={ref.reference + ": no question found with this reference"}
		/>;
	}

	getExtraWarningBoxes() {
		if (!this.props.formQuestions || !formQuestionReferences) {
			return [];
		}

		const getMultipleWarning = (r) => r + ": multiple questions found with this reference";

		const warnings = [];

		for (let i = 0; i < this.props.formQuestions.length; i++) {
			const question = this.props.formQuestions[i];
			const references = formQuestionReferences.map((r) => r.reference);

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
						<h2>ECCC API resources</h2>
					</div>

					<div className="col-md-3">
						<div className="top-right-buttons">
							<button
								className={"blue-background"}
								data-hover="Refresh"
								onClick={() => this.props.refreshEcccResources()}>
								<span><i className="fas fa-redo-alt"/></span>
							</button>
						</div>
					</div>

					<div className="col-md-6">
						<h3>Check activity fields</h3>

						{this.props.ecccActivityFields === null
							&& <Loading
								height={150}
							/>
						}

						{this.props.ecccActivityFields && typeof this.props.ecccActivityFields === "object"
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{typeof this.props.ecccActivityFields === "string"
							&& <Warning
								content={this.props.ecccActivityFields}
								height={150}
							/>
						}
					</div>

					<div className="col-md-6">
						<h3>Check cybersecurity domains</h3>

						{this.props.ecccCybersecurityDomains === null
							&& <Loading
								height={150}
							/>
						}

						{this.props.ecccCybersecurityDomains && typeof this.props.ecccCybersecurityDomains === "object"
							&& <Info
								content={"OK"}
								height={150}
							/>
						}

						{typeof this.props.ecccCybersecurityDomains === "string"
							&& <Warning
								content={this.props.ecccCybersecurityDomains}
								height={150}
							/>
						}
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
							&& <Warning
								content={"No form found with the following reference: FORM-ECCC-001"}
								height={150}
							/>
						}
					</div>

					<div className="col-md-12">
						<h3>Check questions</h3>

						{!this.props.formQuestions
							&& <Loading
								height={150}
							/>
						}

						{this.props.formQuestions
							&& formQuestionReferences.map((q) => (
								this.getQuestionBox(q)
							))
						}

						{this.getExtraWarningBoxes().map((c, i) => (
							<Warning
								key={i}
								content={c}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}
