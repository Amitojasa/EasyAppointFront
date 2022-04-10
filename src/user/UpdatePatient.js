import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

import { updatePatient, getPatient } from './helper/patientapicalls';

function UpdatePatient({ match }) {
    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        patientId: "",
        name: "",

        dob: "",
        gender: "",
        // photo: "",
        success: false,
        loading: false,

        error: "",
        updatedPatient: "",
        getaRedirect: false,
        formData: new FormData()
    });

    const {
        name,
        patientId,

        dob,
        gender,
        error,

        success,
        loading,
        // photo,

        updatedPatient,
        getaRedirect,

        formData } = values;

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updatePatient(patientId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {
                    ref.current.value = ""

                    setValues({
                        ...values,
                        name: data.name,

                        dob: data.dob,
                        gender: data.gender,

                        error: "",
                        success: true,
                        updatedPatient: data.name,
                        loading: false,
                        formData: new FormData()
                    });
                    // console.log("panga")
                }
            })
            .catch(err => console.log(err + "Error in updating user!!!"));
    };
    const preload = patientId => {
        getPatient(patientId, user._id, token).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,

                    // formData: new FormData(),
                    patientId: data._id,
                    name: data.name,
                    dob: data.dob,
                    gender: data.gender,
                    // photo: data.photo,
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.patientId);
    }, []);
    const updationForm = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <form action="">
                        {/* <span>Post photo</span>
                        <div className="form-group">
                            <label className="btn btn-block btn-success">
                                <input
                                    onChange={handleChange("photo")}
                                    type="file"
                                    name="photo"
                                    accept="image"
                                    placeholder="choose a file"
                                    ref={ref}
                                />
                            </label>
                        </div> */}
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange("name")}
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">DOB</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dob"
                                placeholder="DOB"
                                onChange={handleChange("dob")}
                                value={dob}
                            />
                        </div>
                        <div className="form-group">
                            <label for="sel1">Gender</label>
                            <select className="form-control" id="sel1" name="dob"
                                required
                                onChange={handleChange("gender")}
                                value={gender} >
                                <option value="">Select Gender</option>
                                <option value="Male"  >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>





                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div >
            </div >
        );
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedPatient ? "" : "none" }}
        >
            <h4>{updatedPatient} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Patient updation failed</h4>
        </div>
    );


    return (
        <Base title="Update patient page" description="A page to manage patients">
            {successMessage()}
            {errorMessage()}
            {updationForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default UpdatePatient
