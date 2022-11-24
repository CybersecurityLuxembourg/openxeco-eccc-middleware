import React from "react";
import "./RegistrationAnswers.css";
import dompurify from "dompurify";
import Message from "../../box/Message.jsx";
import {
	getEcccRegistrationFieldValue,
	getOxeRegistrationFieldValue,
	getFormQuestions,
	areValuesEqual,
} from "../../../utils/registration.jsx";

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
			const qu = this.props.formQuestions.filter((q) => q.id === questionId);

			if (qu.length > 0) {
				return <div>
					{getEcccRegistrationFieldValue(qu[0], this.props.ecccObject, this.props.ecccTaxonomies)
						? getEcccRegistrationFieldValue(qu[0], this.props.ecccObject, this.props.ecccTaxonomies)
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
			content="Not synchronized"
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
									</fieldset>
								</div>

								<div className="col-md-6">
									<fieldset className={"RegistratioAnswer-answer "
										+ (!areValuesEqual(q, this.props.ecccObject, this.props.formAnswers) && "RegistratioAnswer-answer-orange")}>
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
