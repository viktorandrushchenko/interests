<template>
    <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <div class="container">
            <div class="navbar-nav" id="navbarNav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/listInterests">
                        <span class="navbar-brand mb-0 h1">Сообщества</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/listUniversities">
                        <span class="navbar-brand mb-0 h1">Мои сообщества</span>
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
</div>
  </template>
  
  <script>
      export default {
          name: "NavBar",
          data() {
              return {
  
              };
          }
      };
  </script>
  
  <style scoped>
    .ml-auto{
      margin-left: auto;
    }
    .navbar-brand{
      font-size: 12pt !important;
    }
    .navbar-brand-button{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    .bg-custom {
        background-color: #b5e3f9;
    }
  </style>