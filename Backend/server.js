import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

const port = 8080;


function serializeBigInt(data) {
    return JSON.parse(
        JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    );
}

app.post("/insert", async (req, res) => {
    try {
        const response = await prisma.employee_details.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                ph_num: req.body.ph_num,
                dept: req.body.dept,
                dob: req.body.dob,
                gender: req.body.gender,
                salary: req.body.salary,
                address: req.body.address,
            },
        });
        res.json({
            message: "success",
            data: serializeBigInt(response), 
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/getall", async (req, res) => {
    try {
        const employees = await prisma.employee_details.findMany();
        res.json({
            message: "success",
            data: serializeBigInt(employees), 
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/delete", async (req, res) => {
    try {
        const { id } = req.query; 
        if (!id) {
            return res.status(400).json({ message: "Missing employee id" });
        }

        const response = await prisma.employee_details.delete({
            where: {
                id: parseInt(id, 10),
            },
        });

        res.json({
            message: "Employee deleted successfully",
            data: serializeBigInt(response), 
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
