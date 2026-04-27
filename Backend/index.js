const path = require('path');
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM employees ORDER BY employee_id'
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Employees fetch error:", err);
        res.status(500).json({ error: "Failed to fetch employees" });
    }
});

app.get('/api/departments', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM departments'
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Departments error:", err);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
});


app.get('/api/locations', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM locations'
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Locations error:", err);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});

app.get('/api/regions', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM regions'
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Regions error:", err);
        res.status(500).json({ error: "Failed to fetch regions" });
    }
});

app.get('/api/jobs', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM jobs'
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Jobs error:", err);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        let {
            first_name,
            last_name,
            email,
            phone_number,
            hire_date,
            job_id,
            salary,
            commission_pct,
            manager_id,
            department_id
        } = req.body;

        console.log("📝 Incoming employee:", req.body);

        // ===== CLEAN =====
        email = email?.toLowerCase()?.trim();
        first_name = first_name?.trim();
        last_name = last_name?.trim();
        job_id = job_id?.trim();

        // ===== VALIDATION =====
        if (!first_name || !last_name || !email || !hire_date || !job_id || !salary) {
            return res.status(400).json({
                error: "Required fields missing"
            });
        }

        // ===== TYPE CONVERT =====
        salary = Number(salary);
        commission_pct = commission_pct ? Number(commission_pct) : null;
        manager_id = manager_id ? Number(manager_id) : null;
        department_id = department_id ? Number(department_id) : null;

        // ===== CHECK EMAIL =====
        const emailCheck = await pool.query(
            'SELECT employee_id FROM employees WHERE email = $1',
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // ===== NEW ID =====
        const idResult = await pool.query(
            'SELECT COALESCE(MAX(employee_id),0)+1 AS new_id FROM employees'
        );

        const newEmployeeId = idResult.rows[0].new_id;

        // ===== INSERT =====
        const query = `
            INSERT INTO employees (
                employee_id,
                first_name,
                last_name,
                email,
                phone_number,
                hire_date,
                job_id,
                salary,
                commission_pct,
                manager_id,
                department_id
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *
        `;

        const values = [
            newEmployeeId,
            first_name,
            last_name,
            email,
            phone_number || null,
            hire_date,
            job_id,
            salary,
            commission_pct,
            manager_id,
            department_id
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee: result.rows[0]
        });

    } catch (err) {
        console.error("❌ ADD EMPLOYEE ERROR:", err);

        // PostgreSQL specific errors
        if (err.code === "22001") {
            return res.status(400).json({
                error: "String too long (VARCHAR limit exceeded)"
            });
        }

        if (err.code === "22003") {
            return res.status(400).json({
                error: "Numeric overflow error"
            });
        }

        res.status(500).json({
            error: "Database error",
            detail: err.message
        });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employeeId = Number(req.params.id);

        const check = await pool.query(
            'SELECT * FROM employees WHERE employee_id=$1',
            [employeeId]
        );

        if (check.rows.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await pool.query(
            'DELETE FROM employees WHERE employee_id=$1',
            [employeeId]
        );

        res.json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (err) {
        console.error("❌ DELETE ERROR:", err);
        res.status(500).json({ error: "Delete failed" });
    }
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log("=================================");
    console.log(`🚀 Server running: http://localhost:${port}`);
    console.log("=================================");
});