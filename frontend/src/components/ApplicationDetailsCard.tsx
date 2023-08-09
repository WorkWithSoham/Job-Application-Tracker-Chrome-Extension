import React, { useState } from "react";
import { Application } from "../utils/interfaces";

import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";

export const ApplicationDetailsCard = (props: {
	callback: (app: undefined, tab: string) => void;
	application: Application | undefined;
}) => {
	const [readOnly, setReadOnly] = useState<boolean>(true);

	const checkDate = (date: string | undefined) => {
		if (date) {
			var newDate = new Date(date);
			return dayjs(newDate);
		}
	};

	return (
		<Paper
			color="dark"
			elevation={20}
			className="m-2"
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "32ch" },
			}}
			noValidate
		>
			<IconButton
				aria-label="delete"
				size="large"
				onClick={() => props.callback(undefined, "apps")}
			>
				<KeyboardBackspaceIcon />
			</IconButton>
			<div className="applicationDetailsCard mb-5 text-center">
				<TextField
					required
					id="position"
					label="Position"
					defaultValue={props.application?.position}
					InputProps={{
						readOnly: readOnly,
						onDoubleClick: () => setReadOnly(false),
					}}
				/>
				<TextField
					required
					id="company"
					label="Company"
					defaultValue={props.application?.company}
					InputProps={{
						readOnly: readOnly,
						onDoubleClick: () => setReadOnly(false),
					}}
				/>
				<TextField
					required
					id="loc"
					label="Location"
					defaultValue={props.application?.location}
					InputProps={{
						readOnly: readOnly,
						onDoubleClick: () => setReadOnly(false),
					}}
				/>
				<TextField
					required
					id="status"
					label="Status"
					defaultValue={props.application?.status}
					InputProps={{
						readOnly: readOnly,
						onDoubleClick: () => setReadOnly(false),
					}}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						readOnly={readOnly}
						label="Application Date"
						value={checkDate(props.application?.app_date)}
						// onChange={(newValue) => setValue(newValue)}
					/>
				</LocalizationProvider>
				<TextField
					required
					id="outlined-required"
					label="Job Link"
					defaultValue={props.application?.jd}
					InputProps={{
						readOnly: readOnly,
						onDoubleClick: () => setReadOnly(false),
					}}
				/>
				<Button className="mb-2" variant="outlined" color="success">
					Save
				</Button>
			</div>
		</Paper>
	);
};
