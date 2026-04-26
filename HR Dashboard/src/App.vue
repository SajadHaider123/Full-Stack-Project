<script setup>
import Sidebar from './components/SideNavbar.vue'
import TopHeader from './components/TopHeader.vue'
// Dashboard ko import karein
import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <div class="layout">
    <Sidebar />
    <div class="content-wrapper">
      <TopHeader />
      <main class="main-body">
        <Dashboard />
        
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 🔥 APP BACKGROUND (IMPORTANT FOR DIFFERENCE) */
body {
  background: #f1f5f9; /* light gray = depth creator */
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* MAIN LAYOUT */
.layout {
  display: flex;
  min-height: 100vh;
}

/* RIGHT SIDE AREA */
.content-wrapper {
  flex: 1;
  margin-left: 280px; /* sidebar space */
  display: flex;
  flex-direction: column;
}

/* MAIN CONTENT AREA */
.main-body {
  margin-top: 100px; /* header space */
  padding: 30px;
  flex: 1;
}

/* 🔥 CARD STYLE (IMPORTANT FOR CONTRAST) */
.main-body > * {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

/* Hover effect for cards */
.main-body > *:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

/* SCROLLBAR (clean) */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>