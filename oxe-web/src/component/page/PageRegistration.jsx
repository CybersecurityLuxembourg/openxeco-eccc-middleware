import React from "react";
import "./PageRegistration.css";
import { NotificationManager as nm } from "react-notifications";
import RegistrationStatus from "./pageregistration/RegistrationStatus.jsx";
import RegistrationManage from "./pageregistration/RegistrationManage.jsx";
import Tab from "../tab/Tab.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import { getOpenxecoEndpoint, getMiddlewareEndpoint } from "../../utils/env.jsx";
import { getFormReference } from "../../utils/registration.jsx";

export default class PageRegistration extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: null,
			formQuestions: null,
			ecccTaxonomies: null,

			tabs: [
				"status",
				"manage",
			],
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.getEcccTaxonomies();
		this.getFormAndQuestions();
	}

	getEcccTaxonomies() {
		this.setState({
			ecccTaxonomies: null,
		}, () => {
			getRequest.call(this, getMiddlewareEndpoint() + "eccc/get_taxonomies", (data) => {
				this.setState({
					ecccTaxonomies: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	getFormAndQuestions() {
		this.setState({
			form: null,
			formQuestions: null,
		}, () => {
			let filters = {
				reference: getFormReference(),
			};

			getRequest.call(this, getOpenxecoEndpoint() + "form/get_forms?" + dictToURI(filters), (data) => {
				this.setState({
					form: data.items.pop(),
				}, () => {
					if (this.state.form) {
						filters = {
							form_id: this.state.form.id,
						};

						getRequest.call(this, getOpenxecoEndpoint() + "form/get_form_questions?" + dictToURI(filters), (data2) => {
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
							form={this.state.form}
							formQuestions={this.state.formQuestions}
							ecccTaxonomies={this.state.ecccTaxonomies}
							refreshFormAndQuestions={() => this.refresh()}
						/>,
						<RegistrationManage
							key={this.state.tabs[1]}
							form={this.state.form}
							formQuestions={this.state.formQuestions}
							ecccTaxonomies={this.state.ecccTaxonomies}
						/>,
					]}
				/>
			</div>
		);
	}
}
