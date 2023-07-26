import React from "react";
import "./DialogHintEcccStatus.css";
import DialogHint from "../DialogHint.jsx";

export default class DialogHintEcccStatus extends React.Component {
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
						<h3>What is the ECCC status?</h3>

						<p>
							On the ATLAS system, a registration can undergo three distinct statuses:
							Draft, Ready for Publication, and Published.
						</p>

						<p>
							These statuses represent different
							stages of approval and validation.
						</p>

						<ul>
							<li>
								&apos;Draft&apos; status: When content is initially uploaded to the ATLAS, it enters
								the &apos;Draft&apos; status. At this stage, the content remains
								unsupervised by the ECCC and
								is subject to potential modifications or improvements. The NCC is primarily
								responsible for managing the registration
								and has the authority to change the status to &apos;Ready for
								Publication&apos;.
							</li>
							<li>
								&apos;Ready for Publication&apos; status: Once the NCC evaluates the
								content and deems it
								to be in an estimably ready state, they can advance its status to &apos;Ready for
								Publication&apos;. In this status, the content is set to be reviewed by the ECCC.
								The ECCC plays a crucial role in thoroughly examining the content to ensure
								its accuracy, compliance with guidelines, and overall quality. They may
								provide feedback or request further revisions before proceeding to the final
								stage.
							</li>
							<li>
								&apos;Published&apos; status: The Published status is the final
								stage of the registration
								process. It indicates that the content has undergone the ECCC&apos;s review and
								validation and has been approved for publication. At this point, the content
								is considered complete, accurate, and compliant with all necessary criteria.
								The information is now publicly available and can be accessed.
							</li>
						</ul>

						<p>
							Please note that any update of the registration on the ATLAS system will lead
							to a return to the &apos;Draft&apos; status, as the content will
							require reassessment and
							potential modifications before proceeding to the subsequent stages.
						</p>
					</div>
				</div>}
				small={true}
			/>
		);
	}
}
