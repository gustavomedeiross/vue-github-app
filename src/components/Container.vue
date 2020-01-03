<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
.container {
  max-width: 700px;
  margin: 80px auto;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;

  h2 {
    svg {
      margin-right: 10px;
    }
  }
}
</style>
