<template>
  <span class="label">
    <span class="close" @click="onClose">x</span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    display: flex;
    position: relative;
    align-items: center;
    padding: 5px 10px;
    background-color: #63ACE5;
    color: #FFF;
    border-radius: 4px;
    &:hover .close {
      display: flex;
    }
  }

  .close {
    $radius: 10px;
    position: absolute;
    cursor: pointer;
    height: $radius * 2;
    width: $radius * 2;
    right: -$radius;
    top: -$radius;
    border-radius: 50%;
    background-color: #FF4E50;
    align-items: center;
    justify-content: center;
    display: none;
    user-select: none;
  }
</style>
