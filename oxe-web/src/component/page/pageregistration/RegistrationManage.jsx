import React from "react";
import "./RegistrationManage.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../../utils/url.jsx";
import { getRequest } from "../../../utils/request.jsx";
import { endpoints } from "../../../settings.jsx";
import Registration from "../../item/Registration.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";

export default class RegistrationManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formAnswer: null,
			users: null,
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
				let filters = {
					form_id: this.props.form.id,
				};

				getRequest.call(this, endpoints.openxeco + "form/get_form_answers?" + dictToURI(filters), (data) => {
					this.setState({
						formAnswers: data,
					}, () => {
						filters = {
							ids: this.getUserList(),
						};

						getRequest.call(this, endpoints.openxeco + "user/get_users?id=" + dictToURI(filters), (data2) => {
							this.setState({
								users: data2.items,
							});
						}, (response) => {
							nm.warning(response.statusText);
						}, (error) => {
							nm.error(error.message);
						});
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
									userId={u}
									user={
										this.state.users
											? this.state.users.filter((o) => o.id === u).pop()
											: undefined
									}
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
