import React from "react";
import "./RegistrationAnswers.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import Popup from "reactjs-popup";
import Message from "../../box/Message.jsx";
import FormLine from "../../button/FormLine.jsx";
import { postRequest } from "../../../utils/request.jsx";
import { getOpenxecoEndpoint } from "../../../utils/env.jsx";
import {
	getFieldLocation,
	getEcccRegistrationFieldValue,
	getOxeRegistrationFieldValue,
	getOxeRegistrationFieldId,
	getFormQuestions,
	areValuesEqual,
} from "../../../utils/registration.jsx";

export default class RegistrationAnswers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldValue: null,
		};
	}

	getAnswerOfQuestion(questionId) {
		const answer = this.props.formAnswers.filter((a) => a.form_question_id === questionId);

		if (answer.length > 0) {
			return answer[0];
		}

		return null;
	}

	getEcccAnswerOfQuestion(questionId) {
		if (this.props.ecccObject) {
			const qu = this.props.formQuestions.filter((q) => q.id === questionId);

			if (qu.length > 0) {
				if (!getFieldLocation()[qu[0].reference]) {
					return <Message
						height={30}
						content="No answer expected"
					/>;
				}

				return <div>
					{getEcccRegistrationFieldValue(qu[0], this.props.ecccObject, this.props.ecccTaxonomies)
						? <div dangerouslySetInnerHTML={{
							__html:
							dompurify.sanitize(getEcccRegistrationFieldValue(
								qu[0], this.props.ecccObject, this.props.ecccTaxonomies,
							)),
						}} />
						: <Message
							height={30}
							content="No answer found"
						/>
					}
				</div>;
			}

			return <Message
				height={30}
				content="Question not found"
			/>;
		}

		return <Message
			height={30}
			content="Registration not uploaded or not found"
		/>;
	}

	isFieldValueMissing(question) {
		const questions = getFormQuestions().filter((q) => q.reference === question.reference);

		if (questions.length > 0) {
			if ((!this.getAnswerOfQuestion(question.id) || !this.getAnswerOfQuestion(question.id).value)
				&& questions[0].mandatory) {
				return true;
			}
		}

		return false;
	}

	modifyAnswer(question, answers, close) {
		const answerId = getOxeRegistrationFieldId(question, answers);

		if (answerId) {
			const params = {
				id: answerId,
				value: this.state.fieldValue,
			};

			postRequest.call(this, getOpenxecoEndpoint() + "form/update_form_answer", params, () => {
				nm.info("The answer has been updated");

				if (close) {
					close();
				}
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			const params = {
				user_id: this.props.userId,
				form_question_id: question.id,
				value: this.state.fieldValue,
			};

			postRequest.call(this, getOpenxecoEndpoint() + "form/add_form_answer", params, () => {
				nm.info("The answer has been updated");

				if (close) {
					close();
				}
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	onEditOpen(value) {
		this.setState({ fieldValue: value });
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"RegistrationAnswers"}>
				<div className={"row"}>
					<div className="col-md-12">
						<h2>Answers</h2>
					</div>

					<div className="col-md-12">
						{this.props.formQuestions.map((q) => (
							<div className={"row"} key={q.id}>
								<div className="col-md-12">
									<div className="RegistratioAnswer-question">
										<div dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize(q.value),
										}} />
									</div>
								</div>

								<div className="col-md-6">
									<fieldset className={"RegistratioAnswer-answer "
										+ (this.isFieldValueMissing(q) && "RegistratioAnswer-answer-red")}>
										<legend>openXeco</legend>
										{getOxeRegistrationFieldValue(q, this.props.formAnswers)
											? <div dangerouslySetInnerHTML={{
												__html:
												dompurify.sanitize(getOxeRegistrationFieldValue(q, this.props.formAnswers)),
											}} />
											: <Message
												height={30}
												content="No answer found"
											/>}
										{q.type === "TEXT"
											&& <div className="RegistratioAnswer-edit">
												<Popup
													trigger={<button className={"RegistratioAnswer-edit-button small-button"}>
														<i className="fas fa-edit"/>
													</button>}
													modal
													onOpen={() => this.onEditOpen(
														getOxeRegistrationFieldValue(q, this.props.formAnswers),
													)}
													closeOnDocumentClick
												>
													{(close) => (
														<div className="row">
															<div className="col-md-9 row-spaced">
																<h3>Update an answer</h3>
															</div>

															<div className={"col-md-3"}>
																<div className="top-right-buttons">
																	<button
																		className={"grey-background"}
																		data-hover="Close"
																		data-active=""
																		onClick={close}>
																		<span><i className="far fa-times-circle"/></span>
																	</button>
																</div>
															</div>

															<div className="col-md-12">
																<FormLine
																	label={"Answer"}
																	value={this.state.fieldValue}
																	onChange={(v) => this.changeState("fieldValue", v)}
																/>
															</div>

															<div className="col-md-12">
																<div className={"right-buttons"}>
																	<button
																		data-hover="Ok"
																		data-active=""
																		onClick={() => this.modifyAnswer(
																			q, this.props.formAnswers, close,
																		)}>
																		<i className="far fa-check-circle"/> Update answer
																	</button>
																</div>
															</div>
														</div>
													)}
												</Popup>
											</div>
										}
									</fieldset>
								</div>

								<div className="col-md-6">
									<fieldset className={"RegistratioAnswer-answer "
										+ ((getFieldLocation()[q.reference]
											&& !areValuesEqual(
												q,
												this.props.ecccObject,
												this.props.formAnswers,
												this.props.ecccTaxonomies,
											))
											&& "RegistratioAnswer-answer-orange")}>
										<legend>ECCC</legend>

										{this.getEcccAnswerOfQuestion(q.id)}
									</fieldset>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
