<template>
  <div id='vue-bulma-editor'></div>
</template>

<script>
// import * as ace from 'brace'
const regMap = {
  isInt: new RegExp('^\\d+$')
}

export default {
  data () {
    return {
      editor: null
    }
  },
  props: {
    fontsize: {
      type: String,
      default: '12px',
      validator: (val) => parseInt(val) > 11 && parseInt(val) < 25
    },
    codefolding: {
      type: String,
      default: 'markbegin',
      validator: (val) => ['manual', 'markbegin', 'markbeginend'].includes(val)
    },
    softwrap: {
      type: String,
      default: 'free',
      validator: (val) => (['off', 'free'].includes(val) || regMap.isInt.test(val))
    },
    selectionstyle: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'line'].includes(val)
    },
    highlightline: {
      type: Boolean,
      default: true
    },
    // v-model
    value: {
      type: String,
      default: '',
    }
  },

  methods: {
    setMode () {
      this.editor.getSession().setMode('ace/mode/javascript')
    },
    setTheme () {
      this.editor.setTheme('ace/theme/chrome')
    },
    emitCode () {
      this.$emit('input', this.editor.getValue())
    },
    setCode (code) {
      this.editor.setValue(code)
    }
  },

  mounted () {
    this.editor = window.ace.edit('vue-bulma-editor')
    this.setMode()
    this.setTheme()
    this.editor.$blockScrolling = Infinity
    this.editor.getSession().on('change', this.emitCode)
    this.setCode(this.value)
  },

  beforeDestroy () {
    this.editor.destroy()
    // this.editor.container.remove()
  },

  watch: {
    mode () {
      this.setMode()
    },
    theme () {
      this.setTheme()
    },
    fontsize (newVal) {
      this.editor.setFontSize(newVal)
    },
    codefolding (newVal) {
      this.editor.session.setFoldStyle(newVal)
      this.editor.setShowFoldWidgets(newVal !== 'manual')
    },
    softwrap (newVal) {
      this.editor.setOption('wrap', newVal)
    },
    selectionstyle (newVal) {
      this.editor.setOption('selectionStyle', newVal)
    },
    highlightline (newVal) {
      this.editor.setHighlightActiveLine(newVal)
    },
    value (newVal) {
      if (newVal != this.editor.getValue()) {
        this.setCode(newVal)
        this.editor.clearSelection()
      }
    }
  }
}
</script>