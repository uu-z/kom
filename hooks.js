const Koa = require("koa");
const Router = require("koa-router");
const _ = require("lodash");
const requireDir = require("require-dir");
const Mhr = require("menhera").default;

const app = new Koa();
const router = new Router();
const modules = requireDir("./modules");

Mhr.$use({
  $use: {
    $({ _val }) {
      app.use(_val);
    }
  },
  $hooks: {
    $({ _val }) {
      if (typeof _val == "function") {
        _val();
      }
    }
  },
  $routes: {
    $({ _key, _val }) {
      _val = Array.isArray(_val) ? _val : [_val];
      const [method, path] = _key.split(" ");
      router[method](path, ..._val);
    }
  },
  $config: {
    _({ _, _val }) {
      const { PORT } = _val;
      _.$use({
        use: [router.routes(), router.allowedMethods()]
      });
      app.listen(PORT);
      console.info(`Server listening on port ${PORT}...`);
    }
  }
});

_.each(modules, val => {
  Mhr.$use(val);
});

module.exports = Mhr;
