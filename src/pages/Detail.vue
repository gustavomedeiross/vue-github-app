<template>
  <div>
    <router-link to="/">Go Back to Repositories</router-link>
    <div class="repository-info">Repository Info</div>
    <div class="issues-wrapper">
      Issues
    </div>
  </div>
</template>

<script>
export default {
  methods: {},

  created() {},
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
