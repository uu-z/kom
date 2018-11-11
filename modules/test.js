module.exports = {
	hooks: {
		beforeCreate() {
			console.log('brforeCreate');
		},
		created() {
			console.log('created');
		},
		beforeMount() {
			console.log('beforeMount');
		},
		mounted() {
			console.log('mounted');
		}
	},
	routes: {
		'get /hello': async (ctx, next) => {
			ctx.body = 'Hello World!';
		}
	}
};
