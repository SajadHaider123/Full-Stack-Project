const API_URL = 'http://localhost:5000/api';
let deptChartInstance = null, salaryChartInstance = null, jobSalaryChartInstance = null, topJobsChartInstance = null;
let allEmployees = [], allDepartments = [], allJobs = [];
let pendingDeleteId = null;
let pendingDeleteName = null;
let currentSection = 'dashboard';

// Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebarToggle');
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.remove('bi-chevron-left');
        icon.classList.add('bi-chevron-right');
    } else {
        icon.classList.remove('bi-chevron-right');
        icon.classList.add('bi-chevron-left');
    }
    setTimeout(() => {
        if (deptChartInstance) deptChartInstance.resize();
        if (salaryChartInstance) salaryChartInstance.resize();
        if (jobSalaryChartInstance) jobSalaryChartInstance.resize();
        if (topJobsChartInstance) topJobsChartInstance.resize();
    }, 300);
});

function showToast(message, isError = false) {
    const toast = document.getElementById('toastMsg');
    const toastText = document.getElementById('toastText');
    const borderClass = isError ? 'border-danger' : 'border-success';
    const iconClass = isError ? 'bi-exclamation-triangle-fill text-danger' : 'bi-check-circle-fill text-success';
    toast.querySelector('.border-start').className = `border-start border-4 ${borderClass}`;
    toast.querySelector('i').className = `${iconClass} fs-5`;
    toastText.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function formatSalaryUSD(salary) {
    if (!salary) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary);
}

function getDepartmentName(deptId) {
    if (!deptId) return '—';
    const dept = allDepartments.find(d => (d.department_id == deptId) || (d.id == deptId));
    return dept ? dept.department_name : `Dept ${deptId}`;
}

function getManagerName(managerId) {
    if (!managerId) return '<span class="badge bg-warning bg-opacity-15">Self</span>';
    const manager = allEmployees.find(e => e.employee_id == managerId);
    if (manager) return `${manager.first_name} ${manager.last_name}`;
    return `ID: ${managerId}`;
}

// Delete Employee Function
async function deleteEmployee(employeeId, employeeName) {
    try {
        const response = await fetch(`${API_URL}/employees/${employeeId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showToast(`✅ ${employeeName} deleted successfully!`);
            await fetchAllDataAndRender();
            if (currentSection === 'employees') renderEmployeeTable();
            loadFormDropdowns();
        } else {
            const error = await response.json();
            showToast(`❌ Error: ${error.error || 'Failed to delete'}`, true);
        }
    } catch(err) {
        showToast(`❌ Connection error: ${err.message}`, true);
    }
}

// Show Delete Confirmation Modal
function showDeleteModal(employeeId, employeeName) {
    pendingDeleteId = employeeId;
    pendingDeleteName = employeeName;
    document.getElementById('deleteModalMessage').innerHTML = `Are you sure you want to delete <strong>${employeeName}</strong>?<br>This action cannot be undone.`;
    document.getElementById('deleteModal').classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('deleteModal').classList.remove('show');
    pendingDeleteId = null;
    pendingDeleteName = null;
}

// Confirm Delete
document.getElementById('modalConfirmBtn').addEventListener('click', () => {
    if (pendingDeleteId) {
        deleteEmployee(pendingDeleteId, pendingDeleteName);
        closeModal();
    }
});
document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
document.getElementById('deleteModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('deleteModal')) closeModal();
});

async function loadFormDropdowns() {
    try {
        const [deptRes, jobsRes, empRes] = await Promise.all([
            fetch(`${API_URL}/departments`).catch(() => null),
            fetch(`${API_URL}/jobs`).catch(() => null),
            fetch(`${API_URL}/employees`).catch(() => null)
        ]);
        if (deptRes?.ok) allDepartments = await deptRes.json();
        if (jobsRes?.ok) allJobs = await jobsRes.json();
        if (empRes?.ok) allEmployees = await empRes.json();
        
        const deptSelect = document.getElementById('departmentId');
        deptSelect.innerHTML = '<option value="">Select Department</option>' + (allDepartments || []).map(d => `<option value="${d.department_id}">${d.department_name}</option>`).join('');
        
        const jobSelect = document.getElementById('jobId');
        jobSelect.innerHTML = '<option value="">Select Job</option>' + (allJobs || []).map(j => `<option value="${j.job_id}">${j.job_title}</option>`).join('');
        
        const mgrSelect = document.getElementById('managerId');
        mgrSelect.innerHTML = '<option value="">Select Manager</option>' + (allEmployees || []).map(e => `<option value="${e.employee_id}">${e.first_name} ${e.last_name}</option>`).join('');
    } catch(err) { console.error("Error loading dropdowns:", err); }
}

// Add Employee API
document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEmployee = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value.toUpperCase(),
        phone_number: document.getElementById('phoneNumber').value || null,
        hire_date: document.getElementById('hireDate').value,
        job_id: document.getElementById('jobId').value,
        salary: parseFloat(document.getElementById('salary').value),
        commission_pct: document.getElementById('commissionPct').value ? parseFloat(document.getElementById('commissionPct').value) : null,
        manager_id: document.getElementById('managerId').value ? parseInt(document.getElementById('managerId').value) : null,
        department_id: document.getElementById('departmentId').value ? parseInt(document.getElementById('departmentId').value) : null
    };
    
    try {
        const response = await fetch(`${API_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        });
        const data = await response.json();
        if (response.ok) {
            showToast('✅ Employee added successfully!');
            document.getElementById('addEmployeeForm').reset();
            await fetchAllDataAndRender();
            if (currentSection === 'employees') renderEmployeeTable();
            loadFormDropdowns();
        } else {
            showToast(`❌ Error: ${data.error || 'Failed to add employee'}`, true);
        }
    } catch(err) {
        showToast(`❌ Connection error: ${err.message}`, true);
    }
});

function renderJobSalaryChart(jobs) {
    if (!jobs?.length) return;
    const sorted = [...jobs].sort((a,b) => a.job_title.localeCompare(b.job_title));
    const labels = sorted.map(j => j.job_title.length > 20 ? j.job_title.substring(0,17)+'..' : j.job_title);
    if (jobSalaryChartInstance) jobSalaryChartInstance.destroy();
    const ctx = document.getElementById('jobSalaryChart').getContext('2d');
    jobSalaryChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [
            { label: 'Min Salary', data: sorted.map(j=>parseFloat(j.min_salary)||0), borderColor: '#3b82f6', fill: true, tension: 0.3 },
            { label: 'Max Salary', data: sorted.map(j=>parseFloat(j.max_salary)||0), borderColor: '#f59e0b', fill: true, tension: 0.3 }
        ]},
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { font: { size: 10 } } }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatSalaryUSD(ctx.raw)}` } } }, scales: { y: { ticks: { callback: v=>formatSalaryUSD(v), font: { size: 9 } } }, x: { ticks: { rotate: 45, font: { size: 9 } } } } }
    });
}

function renderTopJobsChart(employees, jobs) {
    if (!employees.length) return;
    const jobCount = new Map();
    employees.forEach(e => { if(e.job_id) jobCount.set(e.job_id, (jobCount.get(e.job_id)||0)+1); });
    const top5 = Array.from(jobCount.entries()).map(([id,c]) => ({ title: jobs.find(j=>j.job_id===id)?.job_title || id, count: c })).sort((a,b)=>b.count-a.count).slice(0,5);
    if (topJobsChartInstance) topJobsChartInstance.destroy();
    const ctx = document.getElementById('topJobsChart').getContext('2d');
    topJobsChartInstance = new Chart(ctx, { type: 'bar', data: { labels: top5.map(t=>t.title.length>20?t.title.substring(0,17)+'..':t.title), datasets: [{ label: 'Employees', data: top5.map(t=>t.count), backgroundColor: '#3b82f6', borderRadius: 8 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } } });
}

function renderEmployeeTable(filter = '') {
    const tbody = document.getElementById('employeesTableBody');
    if (!allEmployees.length) { tbody.innerHTML = '<tr><td colspan="11">No records</tbody>'; return; }
    const filtered = allEmployees.filter(e => `${e.first_name} ${e.last_name}`.toLowerCase().includes(filter.toLowerCase()) || (e.email||'').toLowerCase().includes(filter.toLowerCase()));
    document.getElementById('employeeCountBadge').innerText = filtered.length;
    tbody.innerHTML = filtered.map(e => `<tr>
        <td class="fw-bold">${e.employee_id}</td>
        <td>${e.first_name}</td>
        <td>${e.last_name}</td>
        <td style="color:#3b82f6">${e.email}</td>
        <td>${e.phone_number||'-'}</td>
        <td>${e.hire_date ? new Date(e.hire_date).toLocaleDateString() : '-'}</td>
        <td><span class="job-badge">${e.job_id||'-'}</span></td>
        <td class="fw-bold text-success">${formatSalaryUSD(e.salary)}</td>
        <td>${getDepartmentName(e.department_id)}</td>
        <td>${getManagerName(e.manager_id)}</td>
        <td><button class="delete-btn" onclick="showDeleteModal(${e.employee_id}, '${e.first_name} ${e.last_name}')"><i class="bi bi-trash3-fill"></i> Delete</button></td>
    </tr>`).join('');
}

async function fetchAllDataAndRender() {
    try {
        const [empRes, deptRes, jobsRes] = await Promise.all([fetch(`${API_URL}/employees`).catch(()=>null), fetch(`${API_URL}/departments`).catch(()=>null), fetch(`${API_URL}/jobs`).catch(()=>null)]);
        if(empRes?.ok) allEmployees = await empRes.json();
        if(deptRes?.ok) allDepartments = await deptRes.json();
        if(jobsRes?.ok) allJobs = await jobsRes.json();
        allEmployees = (allEmployees || []).map(e => ({ ...e, salary: parseFloat(e.salary) || 0 }));
        
        renderJobSalaryChart(allJobs);
        renderTopJobsChart(allEmployees, allJobs);
        
        document.getElementById('totalEmployeesCard').innerText = allEmployees.length;
        document.getElementById('totalDeptsCard').innerText = allDepartments?.length || 0;
        const salaries = allEmployees.map(e=>e.salary).filter(s=>s>0);
        const avg = salaries.length ? salaries.reduce((a,b)=>a+b,0)/salaries.length : 0;
        const total = salaries.reduce((a,b)=>a+b,0);
        document.getElementById('avgSalaryCard').innerHTML = formatSalaryUSD(avg);
        document.getElementById('totalSalaryBurn').innerHTML = formatSalaryUSD(total);
        
        const deptMap = new Map();
        (allDepartments || []).forEach(d => { const key = d.department_id || d.id; deptMap.set(key, { name: d.department_name, count: 0 }); });
        allEmployees.forEach(e => { if(e.department_id && deptMap.has(e.department_id)) deptMap.get(e.department_id).count++; });
        if (deptChartInstance) deptChartInstance.destroy();
        deptChartInstance = new Chart(document.getElementById('deptChart'), { type: 'bar', data: { labels: Array.from(deptMap.values()).map(v=>v.name), datasets: [{ label: 'Employees', data: Array.from(deptMap.values()).map(v=>v.count), backgroundColor: '#3b82f6', borderRadius: 8 }] }, options: { responsive: true, maintainAspectRatio: true } });
        
        const topSalaries = [...allEmployees].sort((a,b)=>b.salary-a.salary).slice(0,5);
        if (salaryChartInstance) salaryChartInstance.destroy();
        salaryChartInstance = new Chart(document.getElementById('salaryChart'), { type: 'bar', data: { labels: topSalaries.map(e=>`${e.first_name} ${e.last_name}`), datasets: [{ label: 'Salary', data: topSalaries.map(e=>e.salary), backgroundColor: '#3b82f6', borderRadius: 8 }] }, options: { responsive: true, plugins: { tooltip: { callbacks: { label: ctx => formatSalaryUSD(ctx.raw) } } } } });
        
        renderEmployeeTable();
    } catch(err) { console.error(err); }
}

function showSection(section) { 
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('employeesSection').style.display = 'none';
    document.getElementById('addEmployeeSection').style.display = 'none';
    if (section === 'dashboard') document.getElementById('dashboardSection').style.display = 'block';
    if (section === 'employees') { document.getElementById('employeesSection').style.display = 'block'; renderEmployeeTable(); }
    if (section === 'addEmployee') { document.getElementById('addEmployeeSection').style.display = 'block'; loadFormDropdowns(); }
    document.querySelectorAll('.nav-btn').forEach(btn => { const val = btn.getAttribute('data-section'); if (val === section) btn.classList.add('active-nav'); else btn.classList.remove('active-nav'); });
    currentSection = section;
    if (section === 'dashboard') fetchAllDataAndRender();
}

document.querySelectorAll('.nav-btn').forEach(btn => btn.addEventListener('click', () => showSection(btn.getAttribute('data-section'))));
document.getElementById('employeeSearchInput').addEventListener('input', (e) => renderEmployeeTable(e.target.value));

(async function init() { await fetchAllDataAndRender(); showSection('dashboard'); await loadFormDropdowns(); })();
window.addEventListener('focus', () => { if (currentSection === 'dashboard') fetchAllDataAndRender(); });

window.showDeleteModal = showDeleteModal;