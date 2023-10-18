

import React, { useState, useEffect } from "react";
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';



function CreateEmployee()
{


    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        department: "",
        startdate: "",
        salary: 0,
    })
    const [isEmployeeSaved, setIsEmployeeSaved] = useState(false);

    const initialState = {
        firstname: "",
        lastname: "",
        department: "",
        startdate: "",
        salary: 0,
    }



    async function saveEmployeeToDatabase(e)
    {
        e.preventDefault()
        console.log(formData);
        const Response = await fetch("http://localhost:8000/api/employees/employee-create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

        const results = await Response.json(); //
        console.log(results);
        if (results)
        {
            setIsEmployeeSaved(true);//Set employee save true
        }
    }
    useEffect(() =>
    {
        if (isEmployeeSaved)
        { //when is  saved  navigate to the  employee -list page
            setFormData(initialState);

        }
    }, [isEmployeeSaved]);



    const onChangeHandler = (e) =>
    {

        const { name, value } = e.target;
        setFormData((prev) =>
        {
            if (e.target.name === "salary") parseInt(e.target.value)
            return { ...prev, [name]: value }
        })
    }

    return (
        <div>
            <Navigation />
            <div className="employeeFormContainer" >

                <h1>Add New Employee</h1>

                <form className="bookDetails" onSubmit={saveEmployeeToDatabase} >


                    <div className="col-1">
                        <label>Firstname</label>
                        <input name="firstname" id="firstname" type="text" value={formData.firstname} rules={{ required: "a name  is required" }} onChange={onChangeHandler} />
                        <label>Lastname</label>
                        <input name="lastname" id="lastname" type="text" rules={{ required: "a name  is required" }} value={formData.lastname} onChange={onChangeHandler} />
                        <label>Department</label>
                        <select name="department" id="department" type="text" value={formData.department} rules={{ required: "a department  is required" }} onChange={onChangeHandler}>
                            <option value="" disabled>
                                Please select a department
                            </option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Hr">Hr</option>
                            <option value="Logistic">Logistic</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Management">Management</option>
                            <option value="IT">IT</option>
                        </select>
                        <label>Start Date</label>
                        <input name="startdate" type="text" value={formData.startdate} rules={{ required: "The starting date  is required" }} onChange={onChangeHandler} />
                        <label>Salary</label>
                        <input name="salary" id="salary" type="number" value={formData.salary} rules={{ required: "a salary  is required" }} onChange={onChangeHandler} />
                    </div>
                    <div>
                        <button type="Submit">SAVE</button>
                    </div>
                </form>
                {isEmployeeSaved ? <p>Employee created successfully!</p> : <p></p>}

            </div>
            <Footer />
        </div>
    );
}

export default CreateEmployee;