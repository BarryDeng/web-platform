<template>
  <div class="index">
    <div class="code">
      <Editor
        class="editor"
        :fontsize="'12px'"
        :codefolding="'markbegin'"
        :softwrap="'free'"
        :selectionstyle="'text'"
        :highlightline="true"
        v-model="code" />
      <div class="info">
        <div class="label-group">
          <v-label
            class="label"
            v-for="(dep, id) in dependencies"
            :key="id"
            @close="delLabel(id)">{{ id }}</v-label>
        </div>
        <div class="action">
          <v-button @click.native="run">Run</v-button>
          <v-button @click.native="save" :color="'#3B99FC'">Save</v-button>
        </div>
      </div>
    </div>
    <div class="output">
      <iframe ref="frame" class="iframe" src="/public/runner.html" frameborder="0"></iframe>
      <h3>Console</h3>
      <ul ref="result" class="result">
        <li v-for="(r, i) in result" :key="i" :class="{error: r.type === 'error'}">
          {{ r.data.toString() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/jseditor'
import Button from '@/components/button'
import Label from '@/components/label'
import genRequire from '@/lib/require'
export default {
  name: 'index',

  data () {
    return {
      code: '',
      listener: null,
      result: [],
    }
  },

  methods: {
    save () {
      const deps = Object.keys(this.dependencies)
      if (this.isIndex) {
        this.$http.post(`/codes`, {code: this.code, deps})
          .then(resp => {
            this.$store.dispatch('UPDATE_CODE', { code: this.code })
            this.$store.dispatch('SNACKBAR_PUSH', { message: 'Create success'})
            this.$router.push(`/codes/${resp.data.id}`)
          })
          .catch(() => this.$store.dispatch('SNACKBAR_PUSH', { message: 'Save failed' }))
      } else {
        this.$http.put(`/codes/${this.$route.params.id}`, {code: this.code, deps})
          .then(resp => {
            this.$store.dispatch('UPDATE_CODE', { code: this.code })
            this.$store.dispatch('SNACKBAR_PUSH', { message: 'Save success'})
          })
          .catch(() => this.$store.dispatch('SNACKBAR_PUSH', { message: 'Save failed' }))
      }
    },
    run () {
      const re = /(^.|\b)console\.(\S+)/g;
      let code = this.code
      if (re.test(code)) {
        var replaceWith = 'window.mockConsole.'
        code = code.replace(re, (all, str, arg) => {
          return replaceWith + arg
        })
      }

      this.$refs.frame.contentWindow.require = this.require
      try {
        this.$refs.frame.contentWindow.eval(code)
      } catch (e) {
        this.addMessage({
          type: 'error',
          data: e.message
        })
      }
    },
    addMessage ({data, type}) {
      this.result.push({
        type,
        data,
      })
      this.$refs.result.scrollTop = this.$refs.result.scrollHeight
    },
    delLabel (id) {
      this.$store.dispatch('REMOVE_DEP', { id })
    }
  },

  mounted () {
    this.code = this.$store.state.currentCode
    this.listener = event => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'log') {
          this.addMessage(data)
        } 
      } catch (e) {}
    }
    window.addEventListener('message', this.listener)
    if (this.code === '' && Object.keys(this.dependencies).length === 0) {
      this.$router.push('/')
      const tip = [
        '// a simple example',
        '// module.exports = {',
        '//   text: "hello world"',
        '// }',
        '// you can import a module such as',
        '// const module = require("id")',
        '// each module will be saved for 10 minutes\n'
      ].join('\n')
      this.$store.dispatch('UPDATE_CODE', { code: tip })
      this.code = tip
      return
    }
  },

  beforeDestroy () {
    window.removeEventListener('message', this.listener)
  },

  computed: {
    dependencies () {
      return this.$store.state.dependencies
    },

    require () {
      const deps = this.dependencies
      const req = genRequire()
      
      Object.keys(deps).forEach(k => {
        req.register(k, eval(`(${deps[k]})`))
      })
      return req
    },

    isIndex () {
      return this.$route.path === '/'
    }
  },

  preFetch (store) {
    if (store.state.route.path === '/') {
      return Promise.resolve()
    }
    return store.dispatch('FETCH_MODULE', {
      id: store.state.route.params.id
    })
  },

  components: {
    Editor,
    'v-button': Button,
    'v-label': Label,
  }
}
</script>

<style lang="scss" scoped>
  .index {
    display: flex;
    padding: 20px 50px 0;
  }

  .code {
    flex: 1;
  }

  .output {
    width: 300px;
  }

  .editor {
    height: 400px;
    flex: 1;
  }
  
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .label-group {
      display: flex;
      flex-wrap: wrap;
      .label {
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
    .action {
      display: flex;
      button {
        margin-left: 15px;
      }
    }
  }

  .output {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    height: 400px;    
    background: rgb(247, 247, 247);
    .iframe {
      display: none;
    }
    h3 {
      padding: 10px;
      font-size: 13px;
      color: rgba(0,0,0,0.5);
      margin: 0;
    }
    .result {
      overflow: auto;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        height: 26px;
        font-size: 15px;
        align-items: center;
        padding-left: 20px;
        border-top: 1px solid #EEEFEE;
      }
      li.error {
        color: #E81D20;
      }
    }
  }
</style>
