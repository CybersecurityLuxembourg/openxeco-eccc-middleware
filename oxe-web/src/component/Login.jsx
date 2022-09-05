import React from "react";
import "./Login.css";
import { NotificationManager as nm } from "react-notifications";
import FormLine from "./button/FormLine.jsx";
import { getRequest, postRequest } from "../utils/request.jsx";
import { getCookieOptions, getOxeApiURL } from "../utils/env.jsx";

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	componentDidMount() {
		// Log in the user if there is an existing cookie

		if (this.props.cookies.get("access_token_cookie")) {
			getRequest.call(this, "private/get_my_user", (data) => {
				if (data.is_admin === 1) {
					this.props.connect(data.id);
				} else {
					this.props.cookies.remove("access_token_cookie");
					nm.warning("This user is not an admin");
				}
			}, (response2) => {
				nm.warning(response2.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}

		// This function to notify if the password has been reset correctly

		Login.notifyForPasswordReset();
	}

	login() {
		const params = {
			email: this.state.email,
			password: this.state.password,
		};

		postRequest.call(this, "account/login", params, (response) => {
			// TODO use httponly cookies
			this.props.cookies.set("access_token_cookie", response.access_token, getCookieOptions());

			getRequest.call(this, "private/get_my_user", (data) => {
				if (data.is_admin === 1) {
					this.props.connect(response.user);
				} else {
					this.props.cookies.remove("access_token_cookie");
					nm.warning("This user is not an admin");
				}
			}, (response2) => {
				nm.warning(response2.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		if (event.key === "Enter" || event.code === "NumpadEnter") {
			this.login();
		}
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id="Login">
				<div id="Login-area">
					<ul className="Login-circles">
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
						<li style={{ backgroundImage: "url(" + getOxeApiURL() + "public/get_public_image/logo.png)" }}></li>
					</ul>
				</div>
				<div id="Login-box" className={"fade-in"}>
					<div id="Login-inner-box">
						<div>
							<div className="Login-title">
								<h1>
									{this.state.settings !== null
										&& this.state.settings.ADMIN_PLATFORM_NAME !== undefined
										? "Welcome to " + this.state.settings.ADMIN_PLATFORM_NAME
										: "Welcome"}
									<div className={"Login-title-small"}>
										{this.state.settings !== null
											&& this.state.settings.PROJECT_NAME !== undefined
											? "Administration platform of " + this.state.settings.PROJECT_NAME
											: "Administration platform"}
									</div>
								</h1>
							</div>
							<FormLine
								label="Email"
								fullWidth={true}
								value={this.state.email}
								onChange={(v) => this.changeState("email", v)}
								autofocus={true}
								onKeyDown={this.onKeyDown}
							/>
							<FormLine
								label="Password"
								type={"password"}
								fullWidth={true}
								value={this.state.password}
								onChange={(v) => this.changeState("password", v)}
								onKeyDown={this.onKeyDown}
							/>
							<div className="bottom-right-buttons">
								<button
									className="blue-button"
									onClick={this.login}
								>
									Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
