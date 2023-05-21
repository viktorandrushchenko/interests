<template>
    <div id="app">
      <nav>
        <router-link class="item" to="/ListInterests">Сообщества</router-link>
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
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>