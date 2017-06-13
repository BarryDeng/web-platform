export default function () {
  function require (id) {
    const mod = require.modules[id]
    if (!mod) throw new Error('failed to require "' + id + '"')
    if (!mod.exports) {
      mod.exports = {}
      mod.call(mod.exports, mod, mod.exports)
    }
    return mod.exports;
  }

  require.modules = {}

  require.register = function (id, fn) {
    require.modules[id] = fn
  }
  return require
}
