import React, { useEffect, useState } from "react";
import "../styles/ApplicationList.css";
import { ApiService } from "../utils/api.service";
import { ApiResponse, Application } from "../utils/interfaces";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ApplicationList = (props: {
	callback: (app: Application) => void;
}) => {
	const [applications, setApplications] = useState<Application[]>([]);

	useEffect(() => {
		getApplications();
	}, []);

	const getApplications = () => {
		ApiService.getApplications().then((value: ApiResponse<Application>) => {
			if (Array.isArray(value.data.data)) {
				setApplications(value.data.data);
			}
		});
	};

	const deleteApplication = (app: Application) => {
		ApiService.deleteApplication(app);
		getApplications();
	};

	return (
		<div className="p-2 applicationsList">
			<TableContainer component={Paper}>
				<Table style={{ minWidth: 250 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Positon</TableCell>
							<TableCell align="center">Company</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{applications.map((app) => (
							<TableRow
								// key={row.app_id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									onClick={() => props.callback(app)}
								>
									<small>{app.position}</small>
								</TableCell>
								<TableCell align="center" onClick={() => props.callback(app)}>
									<small>{app.company}</small>
								</TableCell>
								<TableCell align="center" onClick={() => props.callback(app)}>
									<small>{app.status}</small>
								</TableCell>
								<TableCell
									align="center"
									onClick={() => deleteApplication(app)}
								>
									<IconButton aria-label="delete">
										<DeleteOutlineIcon fontSize="medium" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
