import React, { useState, useEffect } from "react";
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';


function EditEmployee()
{


    const urlId = useParams();
    const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/employees/${urlId.id}`;
    const [isEmployeeEdited, setIsEmployeeEdited] = useState(false);
    const [editData, setEditData] = useState({
        firstname: "",
        lastname: "",
        department: "",
        startdate: "",
        salary: 0,
    });

    const initialState = {
        firstname: "",
        lastname: "",
        department: "",
        startdate: "",
        salary: 0,
    };
    const fetchData = async () =>
    {
        try
        {
            const response = await fetch(baseURL);

            if (!response.ok)
            {
                throw new Error("Failed to fetch data.");
            }

            const data = await response.json();
            const datatoedit = {
                id: data._id,
                firstname: data.firstname,
                lastname: data.lastname,
                department: data.department,
                startdate: data.startdate,
                salary: data.salary,
            }
            setEditData(datatoedit);
        } catch (error) { }
    };
    useEffect(() =>
    {
        fetchData();
    }, []);


    async function editEmployee(e)
    {
        e.preventDefault()
        console.log(editData);
        const Response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/employees/employee-update/${urlId.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editData),
            });

        const results = await Response.json(); //
        console.log(results);
        if (results)
        {
            setIsEmployeeEdited(true);//Set employee edited true
            setEditData(initialState);
        }
    }
    const onChangeHandler = (e) =>
    {

        const { name, value } = e.target;
        setEditData((prev) =>
        {
            if (e.target.name === "salary") parseInt(e.target.value)
            return { ...prev, [name]: value }
        })
    }

    return (
        <div>
            <Navigation />
            <div className="employeeFormContainer" >

                <h1>Edit Employee Details</h1>

                <form className="bookDetails" onSubmit={editEmployee} >


                    <div className="col-1">
                        <label>Firstname</label>
                        <input name="firstname" id="firstname" type="text" value={editData.firstname} rules={{ required: "a name  is required" }} onChange={onChangeHandler} />
                        <label>Lastname</label>
                        <input name="lastname" id="lastname" type="text" rules={{ required: "a name  is required" }} value={editData.lastname} onChange={onChangeHandler} />
                        <label>Department</label>
                        <select name="department" id="department" type="text" value={editData.department} rules={{ required: "a department  is required" }} onChange={onChangeHandler}>
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
                        <input name="startdate" type="text" value={editData.startdate} rules={{ required: "The starting date  is required" }} onChange={onChangeHandler} />
                        <label>Salary</label>
                        <input name="salary" id="salary" type="number" value={editData.salary} rules={{ required: "a salary  is required" }} onChange={onChangeHandler} />
                    </div>
                    <div>
                        <button type="Submit">EDIT</button>
                    </div>
                </form>
                {isEmployeeEdited ? <p>Employee details submitted successfully!</p> : <p></p>}
            </div>
            <Footer />
        </div>
    )
}

export default EditEmployee