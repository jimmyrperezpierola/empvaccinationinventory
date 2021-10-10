import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import EmailIcon from "@material-ui/icons/Email";
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const AddEmployeeForm = (props) => {
	const {
		values: { identificationNumber, firstName, lastName, email },
		errors,
		touched,
		handleSubmit,
		handleChange,
		isValid,
		setFieldTouched
	} = props;
    
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				name="identificationNumber"
				helperText={touched.identificationNumber ? errors.identificationNumber : ""}
				error={Boolean(errors.identificationNumber)}
				label="Identification Number"
				value={identificationNumber}
				onChange={handleChange}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<FingerprintIcon />
						</InputAdornment>
					)
				}}
			/>
			<div>{Boolean(errors.identificationNumber) ? errors.identificationNumber : ""}</div>

			<TextField
				name="firstName"
				helperText={touched.firstName ? errors.firstName : ""}
				error={Boolean(errors.firstName)}
				label="FirstName"
				value={firstName}
				onChange={handleChange}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<NameIcon />
						</InputAdornment>
					)
				}}
			/>
			<div>{Boolean(errors.firstName) ? errors.firstName : ""}</div>

			<TextField
				name="lastName"
				helperText={touched.lastName ? errors.lastName : ""}
				error={Boolean(errors.lastName)}
				label="LastName"
				value={lastName}
				onChange={handleChange}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<NameIcon />
						</InputAdornment>
					)
				}}
			/>
			<div>{Boolean(errors.lastName) ? errors.lastName : ""}</div>

			<TextField
				name="email"
				helperText={touched.email ? errors.email : ""}
				error={Boolean(errors.email)}
				label="Email"
				fullWidth
				value={email}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<EmailIcon />
						</InputAdornment>
					)
				}}
			/>
			<div>{Boolean(errors.email) ? errors.email : ""}</div>

			<Button
				type="submit"
				fullWidth
				color="primary"
				disabled={!isValid}
			>
				Submit
			</Button>
		</form>
	);    
}

export default AddEmployeeForm; 