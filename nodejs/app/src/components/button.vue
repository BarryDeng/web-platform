<template>
  <button class="btn" :style="style">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#3BA776',
    }
  },

  computed: {
    style () {
      return {
        'backgroundColor': this.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    height: 36px;
    color: #FFF;
    border: none;
    min-width: 64px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 2px;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1);
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    &:hover {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
    }
  }
</style>
