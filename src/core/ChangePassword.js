import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton, Fade, Backdrop, makeStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Modal from "@material-ui/core/Modal";

import { API } from '../backend';
// import { getUser, updateUser } from './helper/userapicalls';
import { isAuthenticated } from '../auth/helper';
// import './assets/css/dashres.css';

function ChangePassword({ handleClose }) {
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
            color: "blue",
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
            variables.loading && (
                <div className=" text-center my-2">
                    <div className="spinner-border text-light " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        );
    };
    const handleChange = (key) => (event) => {
        setVariables({ ...variables, error: false, [key]: event.target.value });
    };
    const [variables, setVariables] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        error: false,
        loading: false,
        success: false,
    });



    const PasswordChange = () => {

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
                                Password Change
                            </h3>

                            <br />
                            <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="Old Password"
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("oldPassword")}
                            />
                            <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="New Password"
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("newPassword")}
                            />
                            <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="Confirm Paasword"

                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("confirmPassword")}

                            />
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}

                                    mx="auto"
                                    style={{ padding: "7px 15px", fontSize: "1.05rem" }}
                                >
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setVariables({ ...variables, error: false, loading: true });
        if (variables.newPassword !== variables.confirmPassword) {
            setVariables({ ...variables, error: true, loading: false });
            // alert.show(`PASSWORD IS INCORRECT`, {
            //     type: 'error',
            //     timeout: '3000'
            // })
            console.log('password is incorrect')
        } else {
            fetch(`${API}/changepassword/${user._id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldPassword: variables.oldPassword, newPassword: variables.newPassword }),
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (!response.error) {
                        setVariables({ ...variables, loading: false, success: true });
                        // alert.show('Password changed !', {
                        //     type: 'success',
                        //     timeout: '3000'
                        // });
                        console.log('password changed')
                        handleClose();
                        // return response.json();
                    } else {
                        setVariables({ ...variables, error: true, loading: false });
                        // alert.show(`PASSWORD IS INCORRECT`, {
                        //     type: 'error',
                        //     timeout: '3000'
                        // })
                        console.log('c haa')
                    }

                })

                .catch((e) => {
                    setVariables({ ...variables, loading: false, success: false, error: true });
                    // alert.show(`PASSWORD IS INCORRECT`, {
                    //     type: 'error',
                    //     timeout: '3000'
                    // })
                    console.log(e)

                });
        }
    };
    return (
        <>

            {PasswordChange()}
            {/* <Link className="dashboard-dash-dlink dashboard-dash-cursor" onClick={handleShow} to='#'>
                <img src={Password} alt="password change" style={{ fill: 'white' }} />
                Change Password
            </Link> */}
        </>
    )
}

export default ChangePassword
