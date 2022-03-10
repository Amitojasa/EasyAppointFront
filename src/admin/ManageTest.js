import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteTest, getTests } from "./helper/adminapicall";
export default function ManageTests() {
    const [Tests, setTests] = useState([]);
    const { user, token } = isAuthenticated();
    const preLoad = () => {
        getTests().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setTests(data);
            }
        });
    };

    useEffect(() => {
        preLoad();
    }, []);

    const deleteThisTest = testId => {
        deleteTest(testId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preLoad();
            }
        });
    };

    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All Tests:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {Tests.length} Tests</h2>

                    {Tests.map((test, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{test.testName}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/test/update/${test._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button
                                        onClick={() => {
                                            deleteThisTest(test._id);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
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
