import React, { useEffect, useState } from "react";
import "../styles/ApplicationList.css";
import { Table } from "react-bootstrap";
import { ApiService } from "../utils/api.service";
import { ApiResponse, Application } from "../utils/interfaces";

export const ApplicationList = (props: {
	callback: (app: Application) => void;
}) => {
	const [applications, setApplications] = useState<Application[]>([]);

	useEffect(() => {
		ApiService.getApplications().then((value: ApiResponse<Application>) => {
			if (Array.isArray(value.data)) {
				setApplications(value.data);
			}
		});
	}, []);

	return (
		<div className="p-2 applicationsList">
			<Table
				className="mt-1"
				striped
			>
				<thead>
					<tr>
						<th>#</th>
						<th>Position</th>
						<th>Company</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{applications.map((app: Application, idx: number) => {
						return (
							<tr key={idx} onClick={() => props.callback(app)}>
								<td>{idx + 1}</td>
								<td>{app.position}</td>
								<td>{app.company}</td>
								<td>{app.status}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};
