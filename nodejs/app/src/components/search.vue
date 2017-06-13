<template>
  <input
    class="input"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @keyup.enter="$emit('enter')"
    :placeholder="placeholder">
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  .input {
    height: 40px;
    outline: 0;
    border: 0;
    border-radius: 3px;
    color: #FFF;
    font-size: 14px;
    text-indent: 10px;
    background-color: rgba(255, 255, 255, 0.14902);
    min-width: 200px;
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #FFF;
    }
  }
</style>
