<template>
    <header class="top-header">
      <div class="heading-box">
        <span class="dot"></span>
        <h1 class="heading">Human Resource Management System</h1>
      </div>
    </header>
  </template>
  
  <style scoped>
  .top-header {
    height: 75px;
    display: flex;
    align-items: center;
    padding: 0 30px;
  
    background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08));
    backdrop-filter: blur(12px);
    border-radius: 25px;
  
    position: fixed;
    top: 10px;
    right: 10px;
    left: 285px;
  
    z-index: 90;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  }
  
  /* Heading container */
  .heading-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  /* Small gradient dot (premium feel) */
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    box-shadow: 0 0 10px rgba(99,102,241,0.6);
  }
  
  /* Text style */
  .heading {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #1e293b, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  </style>