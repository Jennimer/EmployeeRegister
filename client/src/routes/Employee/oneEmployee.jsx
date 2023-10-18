import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function OneEmployee()
{
  const [data, setData] = useState([]);
  const urlId = useParams();


  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/employees/${urlId.id}`;

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await fetch(baseUrl);

        if (!response.ok)
        {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error)
      {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  async function deleteEmployee(currentId)

    {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/employees/employee-delete/${currentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok)
      {

        console.log("Book removed.");
      }
    };



  return (
    <div>

      <Navigation />
      <div className="employeeDetails">

        <div>
          <h2>{data?.firstname} {data?.lastname}</h2>
          <p>Department: {data?.department}</p>
          <p>Start Date: {data?.startdate}</p>
          <p>Salary: {data?.salary}</p>
          </div>
          <div>
          <Link className="edit" to={`/editEmployee/${data?._id}`}>EDIT</Link>
          <Link className="delete" onClick={() => deleteEmployee(data?._id)} to={`/employees/`}>DELETE</Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default OneEmployee;