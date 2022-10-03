import React from "react";
import "./RegistrationStatus.css";
import Info from "../../box/Info.jsx";
import Warning from "../../box/Warning.jsx";

export default class RegistrationStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="RegistrationStatus">
				<div className={"row"}>
					<div className="col-md-12">
						<h2>Status</h2>
					</div>

					<div className="col-md-6">
						<h3>Form completion</h3>

						{this.props.calculateFormCompletion() === 100
							? <Info
								content={"This form is complete"}
								height={150}
							/>
							: <Warning
								content={"Form completed at " + this.props.calculateFormCompletion() + "%"}
								height={150}
							/>
						}
					</div>

					<div className="col-md-6">
						<h3>Synchronization status</h3>

						<Warning
							content={"The form is not synchronized to the ECCC solution"}
							height={150}
						/>
					</div>
				</div>
			</div>
		);
	}
}
