<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            ><font-awesome-icon icon="list-alt" style="margin-right: 10px;" />Listagem</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cadastro"
            ><font-awesome-icon icon="user-alt" style="margin-right: 10px;" />Cadastro</router-link
          >
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";

//resets
body {
  margin: 0;
  color: #6a6f8c;
  background: #c8c8c8;
  font: 600 16px/18px "Open Sans", sans-serif;
}
*,
:after,
:before {
  box-sizing: border-box;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}
.nav-item {
  color: #fff;
}
</style>
