import React from "react";
import "./Info.css";

export default class Info extends React.Component {
	render() {
		return (
			<div className="Info" style={{ height: this.props.height ? this.props.height : "auto" }}>
				<div className="Info-logo">
					<i className="fas fa-info-circle"/>
				</div>
				<div className="Info-content">
					{this.props.content}
				</div>
			</div>
		);
	}
}
