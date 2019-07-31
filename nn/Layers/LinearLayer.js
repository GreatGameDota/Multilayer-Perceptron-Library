class LinearLayer {
	W = [];
	W_shape = [];
	b = [];
	b_shape = [];
	A_prev = [ 0 ];
	A_prev_shape = [ 0, 0 ];
	dA_prev = [ 0 ];
	dA_prev_shape = [ 0, 0 ];
	db = [ 0 ];
	db_shape = [ 0, 0 ];
	dW = [ 0 ];
	dW_shape = [ 0, 0 ];
	Z = [ 0 ];
	Z_shape = [ 0, 0 ];
	constructor (units, inputShape, init_type, prevWeightShape) {
		if (inputShape != 0 && prevWeightsShape == null) {
			n_in = inputShape;
		} else {
			n_in = prevWeightShape[0];
		}
		n_out = units;
		temp = [];
		for (let i = 0; i < n_in * n_out; i++) {
			if (init_type == 'plain') {
				temp.push(randGaussian());
			}
			if (init_type == 'xavier') {
				temp.push(randGaussian() / Math.sqrt(n_in));
			}
			if (init_type == 'he') {
				temp.push(randGaussian() * Math.sqrt(2 / n_in));
			}
		}
		this.W = temp;
		this.W_shape.push(n_out);
		this.W_shape.push(n_in);
		for (let i = 0; i < n_out; i++) {
			this.b.push(0);
		}
		this.b_shape.push(n_out);
		this.b_shape.push(0);
	}
}
function randGaussian () {
	return Math.random() > 0.5 ? Math.sqrt(-2 * Math.log(Math.random())) : -1 * Math.sqrt(-2 * Math.log(Math.random()));
}
