import React from "react";
import "./RegistrationManage.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../../utils/url.jsx";
import { getRequest } from "../../../utils/request.jsx";
import { getOxeApiURL } from "../../../utils/env.jsx";
import Registration from "../../item/Registration.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";

export default class RegistrationManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formAnswer: null,
		};
	}

	componentDidMount() {
		this.refreshAnswers();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.form !== this.props.form) {
			this.refreshAnswers();
		}
	}

	refreshAnswers() {
		if (this.props.form) {
			this.setState({
				formAnswers: null,
			}, () => {
				const filters = {
					form_id: this.props.form.id,
				};

				getRequest.call(this, getOxeApiURL() + "form/get_form_answers?" + dictToURI(filters), (data) => {
					this.setState({
						formAnswers: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}
	}

	getUserList() {
		if (!this.state.formAnswers) {
			return [];
		}

		return [...new Set(
			this.state.formAnswers.map((a) => a.user_id),
		)];
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="RegistrationManage" className="max-sized-page">
				<div className={"row"}>
					<div className="col-md-12">
						<h1>Manage registrations</h1>
					</div>

					<div className="col-md-12">
						{!this.state.formAnswers
							&& <Loading
								height={300}
							/>
						}

						{this.state.formAnswers
							&& this.getUserList().length === 0
							&& <Message
								content={"No answer found"}
								height={300}
							/>
						}

						{this.state.formAnswers
							&& this.getUserList().map((u) => (
								<Registration
									key={u}
									user={u}
									form={this.props.form}
									formQuestion={this.props.formQuestions}
									formAnswers={this.state.formAnswers.filter((a) => a.user_id === u)}
								/>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
