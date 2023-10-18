const express = require('express');
const router = express.Router();
const Employee = require('./models/employees');
const mongoose = require('mongoose');

//Fetch all employees
// Welcome page


router.get("/employees", async (req, res) =>
{
    try
    {
        const department = req.query.department;
        //const stars = req.query.stars;

        const filter = {};
        if (department)
        {
            filter.department = department;
        }
        const allEmployees = await Employee.find(filter);
        res.send(allEmployees)
    } catch (error)
    {
        console.log(error)
        return res.status(404).json({ error: "Something went wrong while fetching employees!" });
    }
});
// Fetch employee by id
router.get('/employees/:id', async (req, res) =>
{
    const id = req.params.id;

    try
    {
        const employee = await Employee.findOne({ _id: id });
        res.status(200).json(employee);
    } catch (error)
    {
        res.send(404).json({ errorInfo: error.message })
    }
});

//create one employee
router.post("/employees/employee-create", async (req, res) =>
{
    const {
        firstname,
        lastname,
        department,
        startdate,
        salary,
    } = req.body;

    //Create new employee

    const createdEmployee = new Employee({
        firstname,
        lastname,
        department,
        startdate,
        salary,
    });

    try
    {
        await createdEmployee.save();
        res.status(201).json(createdEmployee);
    } catch (error)
    {

        res.send(409).json({ errorInfo: error.message });
    }
});

//edit employee
router.put('/employees/employee-update/:id', async (req, res) =>
{
    console.log('problem')
    const id = req.params.id;
    const {
        firstname,
        lastname,
        department,
        startdate,
        salary,
    } = req.body;

    // is ID  valid
    try
    {
        if (!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(404)
                .send('Id is not valid');
        }
        const employeeUpdated = {
            firstname,
            lastname,
            department,
            startdate,
            salary,
            _id: id,
        };
        await Employee.findByIdAndUpdate(id, employeeUpdated, { new: true });
        res.json({ message: "Employee succesfully updated" })
    } catch (error)
    {
        console.log(error.message);
        res.sendStatus(500).json({ errorInfo: error.message });

    }
});


// Delete employees by id
router.delete('/employees/employee-delete/:id', async (req, res) =>
{
    const { id } = req.params;
    try
    {

        // is ID valid
        if (!mongoose.Types.ObjectId.isValid(id))
        {
            return res
                .status(404)
                .send(`cannot find any product with ID ${id}`)
        }

        await Employee.findByIdAndDelete(id);
        res.json({ message: `Product deleted` })
    } catch (error)
    {
        res.send(500).json({ errorInfo: error.message })
    }
});


module.exports = router;