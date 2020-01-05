<template>
  <div>
    <fa-icon icon="circle-notch" class="fa-4x loading-spinner-linear" full-width />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
@import '~@/styles/animations/_loading.scss';

div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px 0;

  svg {
    color: $color1;
  }
}
</style>