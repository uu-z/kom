const Koa = require('koa');
const Router = require('koa-router');
const _ = require('lodash');

const app = new Koa();
const router = new Router();

module.exports = {
	$use: {
		$({ _val }) {
			app.use(_val);
		}
	},
	$routes: {
		$({ _key, _val }) {
			_.each(_val, (val, key) => {
				const [ method, path ] = key.split(' ');
				router[method](path, val);
			});
		}
	},
	$config: {
		_({ _, _val }) {
			const { PORT } = _val;
			_.$use({
				use: [ router.routes(), router.allowedMethods() ]
			});
			app.listen(PORT);
			console.info(`Server listening on port ${PORT}...`);
		}
	}
};
