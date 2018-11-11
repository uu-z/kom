const axios = require('axios');
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();

const { PIXIV_USERNAME = 'ncysatnaf+1@gmail.com', PIXIV_PASSWORD = '123456789' } = process.env;
pixiv.login(PIXIV_PASSWORD, PIXIV_USERNAME);

module.exports = {
	'post /pixiv': async (ctx, next) => {}
};
