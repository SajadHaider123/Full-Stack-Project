<template>
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-box">
          <div class="inner-logo"></div>
        </div>
        <span class="brand-text">HR Dashboard</span>
      </div>
  
      <nav>
        <ul class="nav-list">
          <li class="nav-item active"><a href="#">Dashboard</a></li>
          <li class="nav-item"><a href="#">Employees</a></li>
          <li class="nav-item"><a href="#">Attendance</a></li>
          <li class="nav-item"><a href="#">Payroll</a></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <style scoped>
  .sidebar {
    width: 260px;
    height: calc(100vh - 20px);
    position: fixed;
    top: 10px;
    left: 10px;
  
    /* 🔥 SAME THEME AS HEADER */
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    border-radius: 30px;
  
    padding: 30px 18px;
    display: flex;
    flex-direction: column;
  
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  }
  
  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 50px;
  }
  
  .logo-box {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .inner-logo {
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 4px;
  }
  
  /* Gradient text like header */
  .brand-text {
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(90deg, #1e293b, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* Nav */
  .nav-list {
    list-style: none;
    padding: 0;
  }
  
  .nav-item {
    margin-bottom: 12px;
  }
  
  .nav-item a {
    display: block;
    padding: 14px 18px;
    color: #475569;
    text-decoration: none;
    font-weight: 600;
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  
  /* Hover effect */
  .nav-item a:hover {
    background: rgba(99,102,241,0.1);
    color: #6366f1;
  }
  
  /* Active item (same gradient feel) */
  .nav-item.active a {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 8px 20px rgba(99,102,241,0.25);
  }
  </style>