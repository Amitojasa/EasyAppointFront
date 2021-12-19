import React, { useState, useEffect, useCallback } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getPatients, deletePatient } from "./helper/patientapicalls";
import Prescribtion from "./Prescribtion";
export default function ManagePatient() {
    const [patients, setUsers] = useState([]);
    const [patientsSize, setUsersSize] = useState(0)
    const { user, token } = isAuthenticated();
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState("")
    const [PrescribtionPatientId, setPrescribtionPatientId] = useState(null)


    useEffect(() => {
        setUsersSize(patients.length)
    }, [patients])

    const preLoad = (userId, token) => {
        // console.log(role)
        // setLoading("Loading...");

        getPatients(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });

    };

    useEffect(() => {
        // console.log(props.location)
        preLoad(user._id, token);
        setLoading(false);
    }, []);

    const deleteThisUser = userId => {
        deletePatient(userId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preLoad();
            }
        });
    };




    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setShow(false);
    }, [show]);

    const handlePrescribtion = (pid) => {
        setShow(true);
        setPrescribtionPatientId(pid);
    }

    const HandlePrescribtionShow = () => {
        return <>{show ? <Prescribtion handleClose={handleClose} patientId={PrescribtionPatientId} /> : null}</>;
    };



    return (
        <Base title="Welcome User" description="Manage patients here">
            <h2 className="mb-4">All {userType}:</h2>
            <Link className="btn btn-info" to={`/user/dashboard`}>
                <span className="">User Home</span>
            </Link>
            {HandlePrescribtionShow()}
            <div className="row">
                <div className="col-12">

                    <h2 className="text-center text-white my-3"> {loading}</h2>
                    <h2 className="text-center text-white my-3">Total {patientsSize} patients</h2>
                    {loading && <h2>Loading...</h2>}
                    {patients.map((patient, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-2">
                                    <h3 className="text-white text-left">{patient.patientId}</h3>
                                </div>
                                <div className="col-4">
                                    <h3 className="text-white text-left">{patient.name}</h3>
                                </div>
                                <div className="col-2">
                                    <Link
                                        className="btn btn-success"
                                        to={`/patient/update/${patient._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <button
                                        onClick={() => handlePrescribtion(patient._id)}
                                        className="btn btn-danger"
                                    >
                                        Prescribtion
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button
                                        // onClick={() => {
                                        //     deleteThisUser(patient._id);
                                        // }}
                                        className="btn btn-primary"
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}
