import React, { Component } from "react";
import "./Registration.css";
import Popup from "reactjs-popup";
import Tab from "../tab/Tab.jsx";
import RegistrationGlobal from "./registration/RegistrationGlobal.jsx";
import RegistrationAnswers from "./registration/RegistrationAnswers.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: null,
			tabs: [
				"global",
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
							{this.props.user ? this.props.user.email : "User " + this.props.userId}
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
							labels={["Global", "Version"]}
							selectedMenu={this.state.selectedMenu}
							onMenuClick={this.onMenuClick}
							keys={this.state.tabs}
							content={[
								<RegistrationGlobal
									key={this.state.tabs[0]}
								/>,
								<RegistrationAnswers
									key={this.state.tabs[1]}
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
