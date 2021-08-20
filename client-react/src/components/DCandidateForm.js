import React, { useState } from "react";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, withStyles } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const DCandidateForm = ({classes,...props}) => {

    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required!"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required!"
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required!"
        if ('email' in fieldValues)
        temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid!"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)

        if (validate()) {
            
            const onSuccess = () => {
                resetForm() 
                addToast("Submitted successfully", {appearance:'success'})
            }
            
            if (props.currentId == 0)
                props.createDcandidate(values, onSuccess)
            else  
                props.updateDcandidate(props.currentId, values, onSuccess)
        }

        
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dCandidateList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }

    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                    name="fullName"
                    variant="outlined"
                    label="Full Name"
                    value={values.fullName}
                    onChange={handleInputChange}
                    {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField 
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined" 
                    className={classes.formControl}
                    {...(errors.bloodGroup && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                        name="bloodGroup"
                        value={values.bloodGroup}
                        onChange={handleInputChange}
                        labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select blood group</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="0+">0 +ve</MenuItem>
                            <MenuItem value="0-">0 -ve</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                    name="mobile"
                    variant="outlined"
                    label="Mobile"
                    value={values.mobile}
                    onChange={handleInputChange}
                    {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField 
                    name="age"
                    variant="outlined"
                    label="Age"
                    value={values.age}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    name="address"
                    variant="outlined"
                    label="Address"
                    value={values.address}
                    onChange={handleInputChange}
                    />
                    <div>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.smMargin}
                        onClick={resetForm}
                        >
                            Resest
                        </Button>
                    </div>
                </Grid>

            </Grid>

        </form>
    )
}

const mapStateToProps = state => {
    return {
        dCandidateList: state.dCandidate.list
    }
}

const mapActionToProps = {
    createDcandidate: actions.create,
    updateDcandidate: actions.update
}
 
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));