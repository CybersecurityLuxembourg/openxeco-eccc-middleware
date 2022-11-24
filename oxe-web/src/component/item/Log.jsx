import React, { Component } from "react";
import "./Log.css";
import Popup from "reactjs-popup";

export default class Log extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	parseLog() {
		if (this.props.content) {
			if (this.props.content.indexOf("{") >= 0) {
				try {
					return <div><pre>{JSON.stringify(JSON.parse(this.props.content.substring(this.props.content.indexOf("{"))), null, 2)}</pre></div>;
				} catch {
					return this.props.content;
				}
			}
		}

		return null;
	}

	render() {
		return (
			<Popup
				className="Popup-small-size"
				trigger={
					<div className={"Log"}>
						<i className="fas fa-history"/>
						<div className={"Log-name"}>
							{this.props.name
								? this.props.name
								: "Unfound log"
							}
						</div>
					</div>
				}
				modal
				closeOnDocumentClick
			>
				{(close) => (
					<div className="row">
						<div className="col-md-9">
							<h1>
								{this.props.name
									? this.props.name
									: "Unfound log"
								}
							</h1>
						</div>

						<div className="col-md-3">
							<div className={"top-right-buttons"}>
								<button
									className={"grey-background"}
									onClick={close}>
									<i className="far fa-times-circle"/>
								</button>
							</div>
						</div>

						<div className="col-md-12">
							{this.parseLog()}
						</div>
					</div>
				)}
			</Popup>
		);
	}
}
