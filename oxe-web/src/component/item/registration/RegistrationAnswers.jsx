import React from "react";
import "./RegistrationAnswers.css";
import dompurify from "dompurify";
import Message from "../../box/Message.jsx";

export default class RegistrationAnswers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getAnswerOfQuestion(q) {
		const answer = this.props.formAnswers.filter((a) => a.form_question_id === q);

		if (answer.length > 0) {
			return answer[0];
		}

		return null;
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
									<fieldset className="RegistratioAnswer-answer">
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
										aaa
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
