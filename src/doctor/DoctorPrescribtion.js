import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton, Fade, Backdrop, makeStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Modal from "@material-ui/core/Modal";

import { API } from '../backend';
// import { getUser, updateUser } from './helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
import { getPatient } from '../user/helper/patientapicalls';
// import './assets/css/dashres.css';

function DoctorPrescribtion({ handleClose, patientId, patientPres }) {
    // const alert = useAlert();
    const { user, token } = isAuthenticated();
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            overflow: "scroll",

        },
        paper: {
            position: 'relative',
            backgroundColor: "#2a3249",
            width: "35%",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                width: "82%",
                marginTop: "32rem"
            },
            opacity: "1",
            border: "2px solid #000",
            boxShadow: theme.shadows[8],
            padding: theme.spacing(2, 4, 3),
            marginTop: '5rem'
        },

        fontstyle: {
            color: "white",
            width: "90%",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                width: "90%",
            },
            marginBottom: "0.75rem",
            marginRight: "0.3125rem",
            letterSpacing: "1.3px",
        },
        input: {
            color: "white",
            fontSize: "1rem",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                fontSize: "0.75rem",
            },
            letterSpacing: "0.06rem",
        },
        inputLabel: {
            color: "#ffffff80",
            fontSize: "0.875rem",
        },
        right: {

            position: 'absolute',
            right: '5px',
            top: '5px'
        }

    }));
    const loadingMessage = () => {
        return (
            values.loading && (
                <div className=" text-center my-2">
                    <div className="spinner-border text-light " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        );
    };


    const [values, setValues] = useState({
        prescribtion: patientPres,
        error: false,
        loading: false,
        success: false,
    });

    const {
        prescribtion,
        error,
        loading,
        success
    } = values;

    const handlePrescribtionChange = (event) => {
        setValues({ ...values, error: false, prescribtion: event.target.value });
    };


    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        console.log(values.prescribtion)
        fetch(`${API}/setprescribtion/${user._id}/${patientId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prescribtion: values.prescribtion }),
        })
            .then(response => response.json())
            .then(response => {

                if (!response.error) {
                    setValues({ ...values, loading: false, success: true });

                    handleClose();

                } else {
                    setValues({ ...values, error: true, loading: false });

                }

            })

            .catch((e) => {
                setValues({ ...values, loading: false, success: false, error: true });

                console.log(e)

            });

    };

    const getPatientPrescribtion = (pid, uid) => {
        getPatient(pid, uid, token).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    prescribtion: data?.prescribtion
                });
            }
        });
    }

    useEffect(() => {
        getPatientPrescribtion(patientId, user._id);
    }, [])


    const PrescribtionShow = () => {

        const classes = useStyles();
        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={true}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 600,
                    }}
                >
                    <Fade in={true}>
                        <div className={classes.paper}>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="medium"
                                className={classes.right}
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>

                            {loadingMessage()}
                            <h3
                                id="transition-modal-title"
                                style={{ textAlign: "center" }}
                            >
                                Prescribtion
                            </h3>

                            <br />

                            <TextField
                                className={classes.fontstyle}
                                type="text"

                                variant="outlined"
                                multiline
                                rows={2}
                                maxRows={20}
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handlePrescribtionChange}
                                value={prescribtion}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}

                                    mx="auto"
                                    style={{ padding: "7px 15px", fontSize: "1.05rem" }}
                                >
                                    Submit prescribtion
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }


    return (
        <>

            {PrescribtionShow()}
            {/* <Link className="dashboard-dash-dlink dashboard-dash-cursor" onClick={handleShow} to='#'>
                <img src={Prescribtion} alt="prescribtion change" style={{ fill: 'white' }} />
                Show Prescribtion
            </Link> */}
        </>
    )
}

export default DoctorPrescribtion
