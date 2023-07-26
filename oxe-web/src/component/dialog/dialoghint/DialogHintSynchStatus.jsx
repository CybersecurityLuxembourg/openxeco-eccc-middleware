import React from "react";
import "./DialogHintSynchStatus.css";
import DialogHint from "../DialogHint.jsx";

export default class DialogHintSynchStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<DialogHint
				content={<div className="row">
					<div className="col-md-12">
						<h3>What is the synchronization status?</h3>

						<p>
							In the process of synchronizing data between openXeco and the ATLAS system,
							four distinct statuses are employed to define the state of the registration. These
							statuses play a crucial role in ensuring the accuracy and completeness of data
							exchange.
						</p>

						<ul>
							<li>
								&apos;Not uploaded&apos;: This status indicates that a registration
								has not been uploaded from openXeco to the ATLAS system yet. It
								suggests that the data is still residing solely within the openXeco
								environment and has not been made available for synchronization with the
								ATLAS system.
							</li>
							<li>
								&apos;Uploaded - not synchronized&apos;: In this status, the registration has been
								successfully uploaded from openXeco to the ATLAS system. While the data
								exists in both systems, they are
								not in perfect alignment or do not match entirely. As a result, certain
								elements within the data might be missing or inconsistent between the two
								platforms.
							</li>
							<li>
								&apos;Uploaded - synchronized&apos;: When data achieves
								the status of &apos;Uploaded -
								synchronized&apos;, it signifies that the synchronization process between
								openXeco and the ATLAS system has been successfully completed. The data in
								both systems now matches precisely, ensuring consistency and accuracy. This
								status is achieved when all data elements are harmonized, and any
								discrepancies or inconsistencies have been resolved.
							</li>
							<li>
								&apos;Uploaded - not found&apos;: It suggests that
								the data, which was previously uploaded from openXeco to the ATLAS system,
								cannot be located or identified within the ATLAS system. Such instances might
								arise due to technical errors, data corruption, or other unforeseen
								circumstances. In such cases, thorough investigation and corrective measures
								are necessary to locate and reconcile the missing data.
							</li>
						</ul>

						<p>
							In conclusion, these four synchronization statuses provide valuable insights
							into the state of data exchange, helping
							stakeholders identify potential issues and take appropriate actions to
							maintain consistent and reliable data across both platforms. Regular monitoring
							and timely resolution of any discrepancies are essential to streamline the
							synchronization process and foster effective data management practices.
						</p>
					</div>
				</div>}
				small={true}
			/>
		);
	}
}
