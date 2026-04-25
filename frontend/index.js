const API_URL = 'http://localhost:5000/api';

async function fetchEmployees() {
    document.getElementById('loading').innerText = "Loading...";

    document.getElementById('employees-table').style.display = "table";
    document.getElementById('departments-table').style.display = "none";

    const tbody = document.getElementById('employees-body');
    tbody.innerHTML = "";

    try {
        const res = await fetch(`${API_URL}/employees`);
        const data = await res.json();

        data.forEach(emp => {
            const row = `
                <tr>
                    <td>${emp.first_name}</td>
                    <td>${emp.last_name}</td>
                    <td>${emp.email}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        document.getElementById('loading').innerText = "";

    } catch (err) {
        document.getElementById('loading').innerText = "Error loading data!";
        console.error(err);
    }
}

async function fetchDepartments() {
    document.getElementById('loading').innerText = "Loading...";

    document.getElementById('employees-table').style.display = "none";
    document.getElementById('departments-table').style.display = "table";

    const tbody = document.getElementById('departments-body');
    tbody.innerHTML = "";

    try {
        const res = await fetch(`${API_URL}/departments`);
        const data = await res.json();

        data.forEach(dep => {
            const row = `
                <tr>
                    <td>${dep.department_name}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        document.getElementById('loading').innerText = "";

    } catch (err) {
        document.getElementById('loading').innerText = "Error loading data!";
        console.error(err);
    }
}