import React, { useEffect, useState } from "react";
import "../styles/ApplicationList.css";
import { Table } from "react-bootstrap";
import { ApiService } from "../utils/api.service";
import { ApiResponse, Application } from "../utils/interfaces";

export const ApplicationList = () => {
	const [applications, setApplications] = useState<Application[]>([]);

	useEffect(() => {
		ApiService.getApplications().then((value: ApiResponse<Application>) => {
			if (Array.isArray(value.data)) {
				setApplications(value.data);
			}
		});
	}, []);

	return (
		<div className="p-2">
			<Table className="mt-1" size="sm" striped>
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
							<tr>
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
