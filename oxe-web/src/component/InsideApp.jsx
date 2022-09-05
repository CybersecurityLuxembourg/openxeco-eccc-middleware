import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import Menu from "./bar/Menu.jsx";
import PageDashboard from "./page/PageDashboard.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: window.location.pathname.replace(/\//, ""),
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	componentDidMount() {
		this.refreshSettings();
	}

	render() {
		if (!this.state.settings) {
			return <Loading/>;
		}

		return (
			<div id="InsideApp" className={"fade-in"}>
				<Route render={(props) => <Menu
					selectedMenu={this.state.selectedMenu}
					changeMenu={(v) => this.changeState("selectedMenu", v)}
					disconnect={this.props.disconnect}
					cookies={this.props.cookies}
					settings={this.state.settings}
					{...props}
				/>}/>
				<div id="InsideApp-content">
					<Switch>
						<Route path="/home" render={(props) => <PageDashboard {...props} />}/>

						<Route path="/" render={(props) => <PageDashboard {...props} />}/>
					</Switch>
				</div>
			</div>
		);
	}
}
