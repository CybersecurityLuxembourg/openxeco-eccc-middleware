import React, { Component } from "react";
import "./Registration.css";
import Popup from "reactjs-popup";
import Tab from "../tab/Tab.jsx";
import RegistrationStatus from "./registration/RegistrationStatus.jsx";
import RegistrationAnswers from "./registration/RegistrationAnswers.jsx";
import { getUrlParameter } from "../../utils/url.jsx";
import { formQuestionReferences } from "../../settings.jsx";

export default class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: null,
			tabs: [
				"status",
				"answers",
			],
		};
	}

	componentDidMount() {
		if (getUrlParameter("item_tab") !== null && this.state.tabs.indexOf(getUrlParameter("item_tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("item_tab") });
		}
	}

	componentDidUpdate() {
		if (this.state.selectedMenu !== getUrlParameter("item_tab")
			&& this.state.tabs.indexOf(getUrlParameter("item_tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("item_tab") });
		}
	}

	calculateFormCompletion() {
		const total = formQuestionReferences.length;
		const answeredQuestion = this.props.formAnswers.length;

		return Math.ceil((answeredQuestion / total) * 100);
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<Popup
				className="Popup-full-size"
				trigger={
					<div className={"Registration"}>
						<i className="fas fa-poll-h"/>
						<div className={"Registration-name"}>
							Completed at {this.calculateFormCompletion()}%
						</div>
					</div>
				}
				modal
				closeOnDocumentClick={false}
			>
				{(close) => <div className="row row-spaced">
					<div className="col-md-9">
						<h1 className="Registration-title">
							Registration
						</h1>
					</div>

					<div className="col-md-3">
						<div className={"top-right-buttons"}>
							<button
								className={"grey-background"}
								onClick={close}>
								<i className="far fa-times-circle"/>
							</button>
						</div>
					</div>

					<div className="col-md-12">
						<Tab
							labels={["Status", "Answers"]}
							selectedMenu={this.state.selectedMenu}
							onMenuClick={this.onMenuClick}
							keys={this.state.tabs}
							content={[
								<RegistrationStatus
									key={this.state.tabs[0]}
									calculateFormCompletion={() => this.calculateFormCompletion()}
								/>,
								<RegistrationAnswers
									key={this.state.tabs[1]}
									formQuestions={this.props.formQuestions}
									formAnswers={this.props.formAnswers}
								/>,
							]}
						/>
					</div>
				</div>
				}
			</Popup>
		);
	}
}
