import React from "react";
import "./RegistrationAnswers.css";
import dompurify from "dompurify";
import Message from "../../box/Message.jsx";
import { getEcccRegistrationFieldValue } from "../../../utils/registration.jsx";
import { formQuestions } from "../../../settings.jsx";

export default class RegistrationAnswers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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
			return getEcccRegistrationFieldValue(this.props.ecccObject, questionId);
		}

		return "Not synchronized";
	}

	isFieldValueMissing(question) {
		const questions = formQuestions.filter((q) => q.reference === question.reference);

		if (questions.length > 0) {
			if ((!this.getAnswerOfQuestion(question.id) || !this.getAnswerOfQuestion(question.id).value)
				&& questions[0].mandatory) {
				return true;
			}
		}

		return false;
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
										{this.getAnswerOfQuestion(q.id) && this.getAnswerOfQuestion(q.id).value
											? <div dangerouslySetInnerHTML={{
												__html:
												dompurify.sanitize(this.getAnswerOfQuestion(q.id).value),
											}} />
											: <Message
												text="No answer found"
											/>}
									</fieldset>
								</div>

								<div className="col-md-6">
									<fieldset className="RegistratioAnswer-answer">
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
