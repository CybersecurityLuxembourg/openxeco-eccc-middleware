import React from "react";
import "./Loading.css";
import { getOxeApiURL } from "../../utils/env.jsx";

export default class Loading extends React.Component {
	render() {
		return (
			<div className="Loading" style={{ height: this.props.height ? this.props.height : "100%" }}>
				<div className="Loading-logo">
					<img
						src={getOxeApiURL() + "public/get_public_image/logo.png"}
						alt="Please configure logo"
					/>
				</div>
			</div>
		);
	}
}
