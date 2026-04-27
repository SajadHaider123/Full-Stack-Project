const API_URL = 'http://localhost:5000/api';

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// ================= SHOW SECTION =================
function showSection(section) {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('employees').style.display = 'none';
    document.getElementById('departments').style.display = 'none';

    document.getElementById(section).style.display = 'block';

    // Auto fetch data
    if (section === 'employees') fetchEmployees();
    if (section === 'departments') fetchDepartments();
}

// ================= EMPLOYEES =================
async function fetchEmployees() {
    const tbody = document.getElementById('employees-body');
    tbody.innerHTML = "<tr><td colspan='11'>Loading...</td></tr>";

    try {
        const res = await fetch(`${API_URL}/employees`);
        const data = await res.json();

        tbody.innerHTML = "";

        data.forEach(emp => {
            const row = `
                <tr>
                    <td>${emp.employee_id}</td>
                    <td>${emp.first_name}</td>
                    <td>${emp.last_name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.phone_number || '-'}</td>
                    <td>${formatDate(emp.hire_date)}</td>
                    <td>${emp.job_id}</td>
                    <td>$${emp.salary}</td>
                    <td>${emp.commission_pct ?? '-'}</td>
                    <td>${emp.manager_id ?? '-'}</td>
                    <td>${emp.department_id}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (err) {
        tbody.innerHTML = "<tr><td colspan='11'>Error loading data</td></tr>";
        console.error(err);
    }
}

// ================= DEPARTMENTS =================
async function fetchDepartments() {
    const tbody = document.getElementById('departments-body');
    tbody.innerHTML = "<tr><td>Loading...</td></tr>";

    try {
        const res = await fetch(`${API_URL}/departments`);
        const data = await res.json();

        tbody.innerHTML = "";

        data.forEach(dep => {
            const row = `
                <tr>
                    <td>${dep.department_name}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (err) {
        tbody.innerHTML = "<tr><td>Error loading data</td></tr>";
        console.error(err);
    }
}

// ================= AUTO LOAD DASHBOARD =================
window.onload = () => {
    showSection('dashboard');
};