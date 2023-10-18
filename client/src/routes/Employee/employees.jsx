
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

function Employees()
{
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/employees/`;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {

                let url = baseUrl;
                if (selectedDepartment)
                {
                    url += `?department=${selectedDepartment}`
                }

                const response = await fetch(url);

                if (!response.ok)
                {
                    throw new Error("Failed to fetch data.");
                }

                const jsonData = await response.json();
                setData(jsonData);
                setIsLoading(false);
            } catch (error)
            {
                console.log(error);
                setError("Error fetching data. Please try again later.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedDepartment]);

    return (

        <div>
            <Navigation />
            <h1>Employees</h1>


            <div className="department">
                <label >Department</label>
                <select onChange={(e) => setSelectedDepartment(e.target.value)}>
                    <option value="">All</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Hr">Hr</option>
                    <option value="Logistic">Logistic</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Management">Management</option>
                    <option value="IT">IT</option>
                </select>
            </div>



            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="employeesList">
                    {data.map((employee) => (
                        <div className="employeesListItem" key={employee._id}>
                            <h3>{employee.firstname} {employee.lastname}</h3>
                            <p>Department: {employee.department}</p>
                            <Link to={`/employeeDetails/${employee._id}`}>Go to details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Employees