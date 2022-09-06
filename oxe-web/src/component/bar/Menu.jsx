import React from "react";
import "./Menu.css";
import SideNav, {
	Toggle, Nav, NavItem, NavIcon, NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
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
					<NavItem
						eventKey="registration"
						active={this.props.selectedMenu === "registration"}
						onClick={() => this.props.history.push("/registration")}>
						<NavIcon>
							<i className="fas fa-poll-h" style={{ fontSize: "1.75em" }} />
						</NavIcon>
						<NavText>
							Registration
						</NavText>
					</NavItem>
					<NavItem
						className="Menu-log-out-nav-item"
						eventKey="disconnect">
						<NavIcon>
							<i className="fas fa-door-open" style={{ fontSize: "1.75em" }} />
						</NavIcon>
						<NavText>
							Log out
						</NavText>
					</NavItem>
				</Nav>
			</SideNav>
		);
	}
}
