import React, { useState, useEffect, useCallback } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllPatients } from "../doctor/helper/doctorapicalls";
import Prescribtion from "../user/Prescribtion";
export default function ManageLabPatients() {
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

        getAllPatients(userId, token).then(data => {
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
        <Base title="Welcome Lab Attendant" description="Manage patients here">

            <Link className="btn btn-info" to={`/lab/dashboard`}>
                <span className="">Lab Attendant Home</span>
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
                                <div className="col-2 offset-2">
                                    <h3 className="text-white text-left">{patient.patientId}</h3>
                                </div>
                                <div className="col-4">
                                    <h3 className="text-white text-left">{patient.name}</h3>
                                </div>

                                <div className="col-2">
                                    <button
                                        onClick={() => handlePrescribtion(patient._id)}
                                        className="btn btn-danger"
                                    >
                                        Prescribtion
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
