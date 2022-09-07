import React from "react";
import "./RegistrationAnswers.css";

export default class RegistrationAnswers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"RegistrationAnswers"}>
				<div className={"row"}>
					<div className="col-md-12">
						<h2>Answers</h2>
					</div>
				</div>
			</div>
		);
	}
}
