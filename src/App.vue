<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  box-sizing: border-box;
}

#root,
html,
body {
  min-height: 100%;
}

body {
  -webkit-font-smoothing: antialiased !important;
  text-rendering: optimizeLegibility !important;
}

body,
input,
button {
  font: 14px 'Roboto', sans-serif;
}

*:focus {
  outline: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}
</style>
