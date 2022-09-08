import React from "react";
import "./PageRegistration.css";
import { NotificationManager as nm } from "react-notifications";
import RegistrationStatus from "./pageregistration/RegistrationStatus.jsx";
import RegistrationManage from "./pageregistration/RegistrationManage.jsx";
import Tab from "../tab/Tab.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest, getForeignRequest } from "../../utils/request.jsx";
import { endpoints, formReference } from "../../settings.jsx";

export default class PageRegistration extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: null,
			formQuestions: null,
			ecccActivityFields: null,
			ecccCybersecurityDomains: null,

			tabs: [
				"status",
				"manage",
			],
		};
	}

	componentDidMount() {
		this.refreshFormAndQuestions();
		this.refreshEcccResources();
	}

	refreshFormAndQuestions() {
		this.setState({
			form: null,
			formQuestions: null,
		}, () => {
			let filters = {
				reference: formReference,
			};

			getRequest.call(this, endpoints.openxeco + "form/get_forms?" + dictToURI(filters), (data) => {
				this.setState({
					form: data.items.pop(),
				}, () => {
					if (this.state.form) {
						filters = {
							form_id: this.state.form.id,
						};

						getRequest.call(this, endpoints.openxeco + "form/get_form_questions?" + dictToURI(filters), (data2) => {
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

	refreshEcccResources() {
		this.refreshActivityFields();
		this.refreshCybersecurityDomains();
	}

	refreshActivityFields() {
		this.setState({
			ecccActivityFields: null,
		}, () => {
			const url = endpoints.eccc + "jsonapi/taxonomy_term/fields_of_activity";

			getForeignRequest.call(this, url, (data) => {
				this.setState({
					ecccActivityFields: data.data.map((o) => o.attributes.name),
				});
			}, (response) => {
				this.setState({
					ecccActivityFields: response.statusText + ": " + url,
				});
			}, (error) => {
				this.setState({
					ecccActivityFields: error.message + ": " + url,
				});
			});
		});
	}

	refreshCybersecurityDomains() {
		this.setState({
			ecccCybersecurityDomains: null,
		}, () => {
			const url = endpoints.eccc + "jsonapi/taxonomy_term/cluster_thematic_area";

			getForeignRequest.call(this, url, (data) => {
				this.setState({
					ecccCybersecurityDomains: data.data.map((o) => o.attributes.name),
				});
			}, (response) => {
				this.setState({
					ecccCybersecurityDomains: response.statusText + ": " + url,
				});
			}, (error) => {
				this.setState({
					ecccCybersecurityDomains: error.message + ": " + url,
				});
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
							form={this.state.form}
							formQuestions={this.state.formQuestions}
							refreshFormAndQuestions={() => this.refreshFormAndQuestions()}
							refreshEcccResources={() => this.refreshEcccResources()}
							ecccActivityFields={this.state.ecccActivityFields}
							ecccCybersecurityDomains={this.state.ecccCybersecurityDomains}
						/>,
						<RegistrationManage
							key={this.state.tabs[1]}
							form={this.state.form}
							formQuestions={this.state.formQuestions}
						/>,
					]}
				/>
			</div>
		);
	}
}
