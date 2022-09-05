import React from "react";
import "./Menu.css";
import { NotificationManager as nm } from "react-notifications";
import SideNav, {
	Toggle, Nav, NavItem, NavIcon, NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/request.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notifications: null,
		};
	}

	componentDidMount() {
		this.getNotifications();
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedMenu !== prevProps.selectedMenu
			&& this.props.selectedMenu === "task") {
			this.getNotifications();
		}
	}

	getNotifications() {
		this.setState({ notifications: null });

		getRequest.call(this, "notification/get_notifications", (data) => {
			this.setState({
				notifications: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getTaskNotificationBlock() {
		if (this.state.notifications === null
			|| this.state.notifications.new_requests === undefined
			|| this.state.notifications.data_control === undefined
			|| this.state.notifications.new_requests + this.state.notifications.data_control === 0) {
			return "";
		}

		return <Link to="/task">
			<div className={"Menu-notification"}>
				{this.state.notifications.new_requests + this.state.notifications.data_control}
			</div>
		</Link>;
	}

	getFormNotificationBlock() {
		if (this.state.notifications === null
			|| this.state.notifications.form_responses === undefined
			|| this.state.notifications.form_responses === 0) {
			return "";
		}

		return <Link to="/form">
			<div className={"Menu-notification"}>
				{this.state.notifications.form_responses}
			</div>
		</Link>;
	}

	render() {
		return (
			<SideNav
				className={"fade-in"}
				onSelect={(selected) => {
					if (selected === "disconnect") {
						this.props.cookies.remove("access_token_cookie");
						window.location.replace("/");
					} else {
						this.props.changeMenu(selected);
					}
				}}
			>
				<Toggle />
				<Nav defaultSelected={this.props.selectedMenu}>
					<NavItem
						eventKey=""
						active={!this.props.selectedMenu}
						onClick={() => this.props.history.push("/")}>
						<NavIcon>
							<i className="fa fa-tachometer-alt" style={{ fontSize: "1.75em" }} />
						</NavIcon>
						<NavText>
							Dashboard
						</NavText>
					</NavItem>
					<div className="Menu-divider"/>
				</Nav>
			</SideNav>
		);
	}
}
