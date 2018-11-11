const bodyParser = require('koa-bodyparser');
const cache = require('koa-redis-cache');
const cors = require('@koa/cors');
const hooks = require('./hooks');
const requireDir = require('require-dir');
const Mhr = require('menhera').default;

const { PORT = 8001, REDIS_HOST, REDIS_PORT } = process.env;

Mhr.$use(hooks).$use({
	use: [
		bodyParser(),
		cors({
			origin: '*'
		}),
		cache({
			redis: {
				host: REDIS_HOST,
				port: REDIS_PORT
			},
			onerror(err) {
				console.log(err);
			}
		}),
		async (ctx, next) => {
			const start = new Date();
			await next();
			const ms = new Date() - start;
			console.log(`-> ${ctx.method} ${ctx.url} - ${ms}ms`);
		},
		async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				console.log(err);
				ctx.status = err.statusCode || err.status || 500;
				ctx.body = {
					message: err.message
				};
			}
		}
	],
	routes: requireDir('./routes'),
	config: {
		PORT
	}
});
