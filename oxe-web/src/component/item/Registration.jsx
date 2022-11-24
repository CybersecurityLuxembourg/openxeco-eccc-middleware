import React, { Component } from "react";
import "./Registration.css";
import Popup from "reactjs-popup";
import Tab from "../tab/Tab.jsx";
import RegistrationStatus from "./registration/RegistrationStatus.jsx";
import RegistrationAnswers from "./registration/RegistrationAnswers.jsx";
import { getUrlParameter } from "../../utils/url.jsx";
import { getFormQuestions } from "../../utils/registration.jsx";

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
		const mandatoryReferences = getFormQuestions()
			.filter((q) => q.mandatory)
			.map((q) => q.reference);
		const total = mandatoryReferences.length;
		const mandatoryQuestionIds = this.props.formQuestions
			.filter((q) => mandatoryReferences.indexOf(q.reference) >= 0)
			.map((q) => q.id);
		const answeredQuestions = this.props.formAnswers
			.filter((a) => mandatoryQuestionIds.indexOf(a.form_question_id) >= 0).length;

		return Math.min(100, Math.ceil((answeredQuestions / total) * 100));
	}

	onClose() {
		if (this.props.onClose) {
			this.props.onClose();
		}
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
				onClose={() => this.onClose()}
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
									formQuestions={this.props.formQuestions}
									formAnswers={this.props.formAnswers}
									calculateFormCompletion={() => this.calculateFormCompletion()}
									syncStatus={this.props.syncStatus}
									ecccObject={this.props.ecccObject}
									afterUpload={this.props.afterUpload}
								/>,
								<RegistrationAnswers
									key={this.state.tabs[1]}
									formQuestions={this.props.formQuestions}
									formAnswers={this.props.formAnswers}
									ecccObject={this.props.ecccObject}
									ecccTaxonomies={this.props.ecccTaxonomies}
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
