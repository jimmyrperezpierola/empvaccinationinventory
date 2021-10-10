import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import EmailIcon from "@material-ui/icons/Email";
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const UpdateMyInfoForm = (props) => {
	const {
		values: { identificationNumber, firstName, lastName, email, birthDate, homeAddress, mobilePhoneNumber, isVaccinated, vaccineName, vaccineDate, vaccineTimes, isAdmin },
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

			<TextField
				name="birthDate"
                type = {Date}
				helperText={touched.birthDate ? errors.birthDate : ""}
				error={Boolean(errors.birthDate)}
				label="BirthDate"
				value={birthDate}
				onChange={handleChange}				
			/>
			<div>{Boolean(errors.birthDate) ? errors.birthDate : ""}</div>

			<TextField
				name="homeAddress"
				helperText={touched.homeAddress ? errors.homeAddress : ""}
				error={Boolean(errors.homeAddress)}
				label="Home Address"
				value={homeAddress}
				onChange={handleChange}
				fullWidth
			/>
			<div>{Boolean(errors.homeAddress) ? errors.homeAddress : ""}</div>

			<TextField
				name="mobilePhoneNumber"
                type = {Number}
				helperText={touched.mobilePhoneNumber ? errors.mobilePhoneNumber : ""}
				error={Boolean(errors.mobilePhoneNumber)}
				label="Mobile Phone Number"
				value={mobilePhoneNumber}
				onChange={handleChange}				
			/>
			<div>{Boolean(errors.mobilePhoneNumber) ? errors.mobilePhoneNumber : ""}</div>

            <FormControlLabel
                control={
                <Checkbox
                    checked={isVaccinated}
                    onChange={handleChange}
                    value={isVaccinated}
                    color="primary"
                />
                }
                label="Is Vaccinated"
            />

			<TextField
				name="vaccineName"
				helperText={touched.vaccineName ? errors.vaccineName : ""}
				error={Boolean(errors.vaccineName)}
				label="vaccine Name"
				value={vaccineName}
				onChange={handleChange}
				fullWidth
			/>
			<div>{Boolean(errors.vaccineName) ? errors.vaccineName : ""}</div>

			<TextField
				name="vaccineDate"
                type = {Date}
				helperText={touched.vaccineDate ? errors.vaccineDate : ""}
				error={Boolean(errors.vaccineDate)}
				label="Vaccine Date"
				value={vaccineDate}
				onChange={handleChange}
				fullWidth
			/>
			<div>{Boolean(errors.vaccineDate) ? errors.vaccineDate : ""}</div>

			<TextField
				name="vaccineTimes"
                type = {Number}
				helperText={touched.vaccineTimes ? errors.vaccineTimes : ""}
				error={Boolean(errors.vaccineTimes)}
				label="Vaccine Times"
				value={vaccineTimes}
				onChange={handleChange}				
			/>            

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

export default UpdateMyInfoForm; 