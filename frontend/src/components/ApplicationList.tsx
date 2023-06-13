import React from "react";
import "../styles/ApplicationList.css"
import { Table } from "react-bootstrap";


export const ApplicationList = () => {

    

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
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};
