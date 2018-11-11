const axios = require('axios');

module.exports = {
	'post /axios': async (ctx, next) => {
		let { data } = await axios(ctx.request.body);
		ctx.body = data;
	}
};
