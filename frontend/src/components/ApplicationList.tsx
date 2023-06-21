import React, { useEffect, useState } from "react";
import "../styles/ApplicationList.css";
import { Table } from "react-bootstrap";
import { ApiService } from "../utils/api.service";
import { ApiResponse, Application } from "../utils/interfaces";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

export const ApplicationList = (props: {
	callback: (app: Application) => void;
}) => {
	const [applications, setApplications] = useState<Application[]>([]);

	useEffect(() => {
		getApplications();
	}, []);

	const getApplications = () => {
		ApiService.getApplications().then((value: ApiResponse<Application>) => {
			if (Array.isArray(value.data)) {
				setApplications(value.data);
			}
		});
	};

	const deleteApplication = (app: Application) => {
		ApiService.deleteApplication(app);
		getApplications();
	};

	return (
		<div className="p-2 applicationsList">
			<Table className="mt-1 text-center text-small applicationTable" striped>
				<thead>
					<tr>
						<th>
							<small>Position</small>
						</th>
						<th>
							<small>Company</small>
						</th>
						<th>
							<small>Status</small>
						</th>
						<th>
							<small>Action</small>
						</th>
					</tr>
				</thead>
				<tbody>
					{applications.map((app: Application, idx: number) => {
						return (
							<tr key={idx}>
								<td onClick={() => props.callback(app)}>
									{" "}
									<small>{app.position}</small>{" "}
								</td>
								<td onClick={() => props.callback(app)}>
									{" "}
									<small>{app.company}</small>{" "}
								</td>
								<td onClick={() => props.callback(app)}>
									{" "}
									<small>{app.status}</small>{" "}
								</td>
								<td onClick={() => deleteApplication(app)}>
									<IconButton aria-label="delete" style={{ top: "-5px" }}>
										<DeleteOutlineIcon fontSize="small" />
									</IconButton>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};
