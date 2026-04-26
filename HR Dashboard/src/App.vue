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
  overflow: hidden;
}

/* MAIN LAYOUT */
.layout {
  display: flex;
  height: 100vh;
}

/* RIGHT SIDE AREA */
.content-wrapper {
  flex: 1;
  margin-left: 280px; /* sidebar space */
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* MAIN CONTENT AREA */
.main-body {
  margin-top: 95px; /* header space */
  padding: 0 20px 20px 5px; /* Small padding, 5px left to align nicely */
  flex: 1;
}

/* Dashboard Scrolling Wrapper */
.main-body > * {
  width: 100%;
  height: calc(100vh - 115px);
  padding: 5px; /* Tiny padding to prevent shadow clipping */
  
  /* Transparent so it doesn't mess up the inner cards theme */
  background: transparent;
  border: none;
  box-shadow: none;
  
  /* Internal scroll so content doesn't go under header */
  overflow-y: auto;
  overflow-x: hidden;
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