<template>
    <div class="dashboard-content">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-info">
            <h3>Total Employees</h3>
            <div class="stat-value">187</div>
            <div class="stat-trend positive">
              <i class="fas fa-arrow-up"></i> +8 this month
            </div>
          </div>
          <div class="stat-icon purple">
            <i class="fas fa-users"></i>
          </div>
        </div>
  
        <div class="stat-card">
          <div class="stat-info">
            <h3>Present Today</h3>
            <div class="stat-value">164</div>
            <div class="stat-trend">
              <i class="fas fa-chart-line"></i> 87.7% attendance
            </div>
          </div>
          <div class="stat-icon green">
            <i class="fas fa-user-check"></i>
          </div>
        </div>
  
        <div class="stat-card">
          <div class="stat-info">
            <h3>Absent</h3>
            <div class="stat-value">23</div>
            <div class="stat-trend">
              <i class="fas fa-clock"></i> 4 on leave
            </div>
          </div>
          <div class="stat-icon red">
            <i class="fas fa-user-slash"></i>
          </div>
        </div>
  
        <div class="stat-card">
          <div class="stat-info">
            <h3>Monthly Payroll</h3>
            <div class="stat-value">$187.4K</div>
            <div class="stat-trend positive">
              <i class="fas fa-arrow-up"></i> +5.2% vs last month
            </div>
          </div>
          <div class="stat-icon blue">
            <i class="fas fa-dollar-sign"></i>
          </div>
        </div>
      </div>
  
      <!-- Analytics and Activity Section -->
      <div class="main-grid">
        <!-- Analytics Chart -->
        <div class="chart-card">
          <div class="card-header">
            <div>
              <h3>Analytics Overview</h3>
              <p>Employee performance & engagement trends (weekly)</p>
            </div>
            <button class="week-btn">This Week <i class="fas fa-chevron-down"></i></button>
          </div>
          <div class="chart-wrapper">
            <apexchart
              type="area"
              height="350"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
  
        <!-- Recent Activity -->
        <div class="activity-card">
          <div class="card-header">
            <h3>Recent Activity</h3>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-user-check"></i>
              </div>
              <div class="activity-detail">
                <p><strong>John Carter</strong> marked present</p>
                <span>08:32 AM</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="activity-detail">
                <p><strong>Payroll</strong> for May processed</p>
                <span>$187,400</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-user-plus"></i>
              </div>
              <div class="activity-detail">
                <p><strong>Sarah Chen</strong> joined as Senior Designer</p>
                <span>Yesterday</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="activity-detail">
                <p><strong>Report</strong> generated for monthly review</p>
                <span>Yesterday</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-calendar-week"></i>
              </div>
              <div class="activity-detail">
                <p><strong>Review meeting</strong> scheduled with team</p>
                <span>Tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom Stats Cards -->
      <div class="bottom-stats">
        <div class="bottom-card">
          <div class="bottom-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="bottom-info">
            <h4>Employee Growth</h4>
            <p>+14 <span>this quarter</span></p>
            <small>2.3% increase</small>
          </div>
        </div>
        <div class="bottom-card">
          <div class="bottom-icon">
            <i class="fas fa-medal"></i>
          </div>
          <div class="bottom-info">
            <h4>Top Performance</h4>
            <p>96% <span>score</span></p>
            <small>Engineering team</small>
          </div>
        </div>
        <div class="bottom-card">
          <div class="bottom-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="bottom-info">
            <h4>On-time Arrivals</h4>
            <p>92% <span>this week</span></p>
            <small class="positive">+5% from last week</small>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const series = ref([
    {
      name: 'Performance Score',
      data: [72, 78, 85, 82, 88, 94, 102]
    }
  ])
  
  const chartOptions = ref({
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      zoom: { enabled: false },
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#6366f1']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      show: true
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: { colors: '#64748b', fontSize: '11px', fontWeight: 500 }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      title: { text: 'Score', style: { fontSize: '11px', color: '#64748b' } },
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
      min: 60,
      max: 110,
      tickAmount: 5
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (value) => value + ' pts' },
      style: { fontSize: '12px' }
    },
    markers: {
      size: 4,
      colors: ['#ffffff'],
      strokeColors: '#6366f1',
      strokeWidth: 2
    },
    legend: { show: false },
    colors: ['#6366f1']
  })
  </script>
  
  <style scoped>
  .dashboard-content {
    width: 100%;
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .stat-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    padding: 20px 24px;
    border-radius: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12));
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.15);
    border-color: rgba(255, 255, 255, 0.6);
  }
  
  .stat-info h3 {
    font-size: 0.85rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  
  .stat-value {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #1e293b, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }
  
  .stat-trend {
    font-size: 0.7rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .stat-trend.positive {
    color: #22c55e;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    transition: all 0.3s;
  }
  
  .stat-card:hover .stat-icon {
    transform: scale(1.05);
  }
  
  .stat-icon.purple {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
    color: #6366f1;
  }
  
  .stat-icon.green {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }
  
  .stat-icon.red {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
  
  .stat-icon.blue {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }
  
  /* Main Grid */
  .main-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }
  
  /* Chart Card */
  .chart-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    border-radius: 25px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
  }
  
  .chart-card:hover {
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12));
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.15);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .card-header h3 {
    font-size: 1.1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }
  
  .card-header p {
    font-size: 0.75rem;
    color: #64748b;
  }
  
  .week-btn {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 10px;
    font-size: 0.8rem;
    color: #6366f1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    font-weight: 500;
  }
  
  .week-btn:hover {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
  }
  
  /* Activity Card */
  .activity-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    border-radius: 25px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
  }
  
  .activity-card:hover {
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12));
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.15);
  }
  
  .activity-card .card-header h3 {
    margin-bottom: 0;
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(99, 102, 241, 0.05);
    transition: all 0.2s;
  }
  
  .activity-item:hover {
    transform: translateX(4px);
  }
  
  .activity-item:last-child {
    border-bottom: none;
  }
  
  .activity-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6366f1;
    font-size: 0.9rem;
  }
  
  .activity-detail {
    flex: 1;
  }
  
  .activity-detail p {
    font-size: 0.85rem;
    color: #0f172a;
    margin-bottom: 4px;
  }
  
  .activity-detail span {
    font-size: 0.7rem;
    color: #94a3b8;
  }
  
  /* Bottom Stats */
  .bottom-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  .bottom-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    padding: 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
  }
  
  .bottom-card:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12));
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.15);
  }
  
  .bottom-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #6366f1;
    transition: all 0.3s;
  }
  
  .bottom-card:hover .bottom-icon {
    transform: scale(1.05);
  }
  
  .bottom-info h4 {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  
  .bottom-info p {
    font-size: 1.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }
  
  .bottom-info p span {
    font-size: 0.7rem;
    font-weight: 400;
    background: none;
    -webkit-text-fill-color: #64748b;
  }
  
  .bottom-info small {
    font-size: 0.65rem;
    color: #64748b;
  }
  
  .bottom-info small.positive {
    color: #22c55e;
  }
  
  /* Responsive */
  @media (max-width: 1200px) {
    .stats-grid {
      gap: 16px;
    }
    
    .stat-value {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .main-grid {
      grid-template-columns: 1fr;
    }
    
    .bottom-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .bottom-stats {
      grid-template-columns: 1fr;
    }
  }
  </style>