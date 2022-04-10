
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createStaff, createTest, getTest, updateTest } from './helper/adminapicall';

function UpdateTest({ match }) {
    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        testName: "",
        cost: "",
        quantity: "",
        success: false,
        loading: false,
        description: "",
        createdTest: "",
        getaRedirect: false,
        error: ""

    });

    const {
        testName,
        cost,
        quantity,
        success,
        loading,
        description,
        createdTest,
        getaRedirect,
        error } = values;

    const handleChange = name => event => {

        setValues({ ...values, [name]: event.target.value });
    };

    const preload = testId => {
        getTest(testId).then(data => {
            console.log(JSON.stringify(data));
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,

                });
            } else {
                setValues({
                    ...values,
                    testName: data?.testName,
                    cost: data?.cost,
                    quantity: data?.quantity,
                    description: data?.description,

                });
            }
        });
    };
    useEffect(() => {
        preload(match.params.testId);
    }, []);


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateTest(match.params.testId, user._id, token, { testName, cost, quantity, description })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {

                    setValues({
                        ...values,
                        testName: data.test?.testName,
                        cost: data.test?.cost,
                        quantity: data.test?.quantity,
                        description: data.test?.description,
                        error: "",
                        success: true,
                        loading: false,
                        createdTest: data.testName,

                    });
                }
            })
            .catch(console.log("Error in creating test"));
    };

    const creationForm = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <form action="">


                        <div className="form-group">
                            <label className="text-light">Test Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="testName"
                                placeholder="Name"
                                onChange={handleChange("testName")}
                                value={testName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Cost</label>
                            <input
                                className="form-control"
                                type="number"
                                name="cost"
                                placeholder="cost of test"
                                onChange={handleChange("cost")}
                                value={cost}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Stock Available</label>
                            <input
                                className="form-control"
                                type="number"
                                name="quantity"
                                placeholder="Stock Available for test"
                                onChange={handleChange("quantity")}
                                value={quantity}
                            />
                        </div>



                        <div className="form-group">
                            <label for="description">Description</label>
                            <textarea
                                onChange={handleChange("description")}
                                name="description"
                                className="form-control"
                                placeholder="Description of test"
                                value={description}
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
            style={{ display: createdTest ? "" : "none" }}
        >
            <h4>{createdTest} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>{error}</h4>
        </div>
    );


    return (
        <Base title="Manage Test page" description="A page to Manage Tests">
            {successMessage()}
            {errorMessage()}
            {creationForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default UpdateTest
