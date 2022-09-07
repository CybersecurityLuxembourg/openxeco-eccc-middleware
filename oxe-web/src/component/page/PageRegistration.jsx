import React from "react";
import "./PageRegistration.css";
import { NotificationManager as nm } from "react-notifications";
import RegistrationStatus from "./pageregistration/RegistrationStatus.jsx";
import RegistrationManage from "./pageregistration/RegistrationManage.jsx";
import Tab from "../tab/Tab.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import { getOxeApiURL } from "../../utils/env.jsx";

export default class PageRegistration extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: null,
			formQuestions: null,
			formReference: "FORM-ECCC-001",
			formQuestionReferences: [
				{ reference: "FORM-ECCC-001-Q101", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q102", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q103", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q104", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q105", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q106", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q107", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q108", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q109", type: "TEXT" },
				{ reference: "FORM-ECCC-001-Q110", type: "TEXT" },
			],
			tabs: [
				"status",
				"manage",
			],
		};
	}

	componentDidMount() {
		this.refreshFormAndQuestions();
	}

	refreshFormAndQuestions() {
		this.setState({
			form: null,
			formQuestions: null,
		}, () => {
			let filters = {
				reference: this.state.formReference,
			};

			getRequest.call(this, getOxeApiURL() + "form/get_forms?" + dictToURI(filters), (data) => {
				this.setState({
					form: data.items.pop(),
				}, () => {
					if (this.state.form) {
						filters = {
							form_id: this.state.form.id,
						};

						getRequest.call(this, getOxeApiURL() + "form/get_form_questions?" + dictToURI(filters), (data2) => {
							this.setState({
								formQuestions: data2,
							});
						}, (response) => {
							nm.warning(response.statusText);
						}, (error) => {
							nm.error(error.message);
						});
					}
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	render() {
		return (
			<div id="PageRegistration" className="page max-sized-page">
				<Tab
					labels={["Status", "Manage registrations"]}
					selectedMenu={this.state.selectedMenu}
					onMenuClick={this.onMenuClick}
					keys={this.state.tabs}
					content={[
						<RegistrationStatus
							key={this.state.tabs[0]}
							user={this.props.user}
							userGroupAssignments={this.props.userGroupAssignments}
							userGroupRights={this.props.userGroupRights}
							refreshUserInfo={() => this.props.refreshUserInfo()}
							form={this.state.form}
							formQuestions={this.state.formQuestions}
							refreshFormAndQuestions={() => this.refreshFormAndQuestions()}
							formReference={this.state.formReference}
							formQuestionReferences={this.state.formQuestionReferences}
						/>,
						<RegistrationManage
							key={this.state.tabs[1]}
							form={this.state.form}
							formQuestions={this.state.formQuestions}
							refreshFormAndQuestions={() => this.props.refreshFormAndQuestions()}
							formReference={this.state.formReference}
							formQuestionReferences={this.state.formQuestionReferences}
						/>,
					]}
				/>
			</div>
		);
	}
}
