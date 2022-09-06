import React from "react";
import "./Warning.css";

export default class Warning extends React.Component {
	render() {
		return (
			<div className="Warning" style={{ height: this.props.height ? this.props.height : "auto" }}>
				<div className="Warning-logo">
					<i className="fas fa-exclamation-triangle"/>
				</div>
				<div className="Warning-content">
					{this.props.content}
				</div>
			</div>
		);
	}
}
