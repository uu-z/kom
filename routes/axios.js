const axios = require('axios');

module.exports = {
	'post /axios': async (ctx, next) => {
		const { url } = ctx.request.query;
		let { data } = await axios.get(url);
		ctx.body = data;
	}
};
