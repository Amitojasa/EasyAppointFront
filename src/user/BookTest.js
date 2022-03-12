import React, { useEffect, useState } from 'react'
import { getTests } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

import { updatePatient, getPatient, getPatients } from './helper/patientapicalls';
import { bookTest } from './helper/userapicalls';

function BookTest({ match }) {
    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [testList, setTestList] = useState([]);
    const [patients, setPatients] = useState([]);
    const [values, setValues] = useState({
        patientId: "",
        testId: "",
        appointmentTime: "",
        // photo: "",
        success: false,
        loading: false,

        error: "",
        bookedTest: "",


    });

    const {
        patientId,
        testId,
        appointmentTime,
        success,
        loading,
        error,
        bookedTest,
        getaRedirect, } = values;

    const handleChange = name => event => {
        console.log(name, event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        bookTest(user._id, token, { testId, patientId, appointmentTime })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {


                    setValues({
                        ...values,
                        patientId: "",
                        testId: "",
                        appointmentTime: "",


                        error: "",
                        bookedTest: "",

                        error: "",
                        success: true,
                        bookedTest: data._id,
                        loading: false,

                    });
                    // console.log("panga")
                }
            })
            .catch(err => console.log(err + "Error in booking Test!!!"));
    };
    const preload = () => {
        getTests().then(data => {

            if (data.error) {
                console.log(data.error);
            } else {

                setTestList(data);
            }
        });
        getPatients(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPatients(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);
    const bookTestForm = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <form action="">

                        <div className="form-group">
                            <label for="sel1">Select Test</label>
                            <select className="form-control" id="sel1" name="test"
                                required
                                onChange={handleChange("testId")}
                                value={testId} >
                                <option value="">Select Test</option>
                                {testList.map((test, index) => (<option key={index} value={test._id}  >{test.testName}</option>))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label for="sel1">Select Patient</label>
                            <select className="form-control" id="sel1" name="test"
                                required
                                onChange={handleChange("patientId")}
                                value={patientId} >
                                <option value="">Select Patient</option>
                                {patients.map((patient, index) => (<option key={index} value={patient._id}  >{patient.name}</option>))}

                            </select>
                        </div>


                        <div className="form-group">
                            <label className="text-light">Date and Time of Test</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                name="appointmentTime"
                                placeholder="Date and Time of Test"
                                onChange={handleChange("appointmentTime")}
                                value={appointmentTime}
                            />
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
            style={{ display: bookedTest ? "" : "none" }}
        >
            <h4>Test booked successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Booking Test failed</h4>
        </div>
    );


    return (
        <Base title="Book Test page" description="A page to book test">
            {successMessage()}
            {errorMessage()}
            {bookTestForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default BookTest
