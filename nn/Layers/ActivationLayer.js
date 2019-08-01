class ActivationLayer {
	A = [ 0 ];
	A_shape = [ 0, 0 ];
	dZ = [ 0 ];
	dZ_shape = [ 0 ];
	activationForward (Z, row, col) {
		let [ temp, temp_shape ] = mf.map(Z, row, col, this.sigmoid);
		this.A = temp;
		this.A_shape = temp_shape;
	}
	activationBackward (upstream_grad, row, col) {
		let [ temp, temp_shape ] = mf.map(this.A, this.A_shape[0], this.A_shape[1], this.dSigmoid);
		let [ temp2, temp2_shape ] = mf.multMatrices(upstream_grad, row, col, temp, temp_shape[0], temp_shape[1]);
		this.dZ = temp2;
		this.dZ_shape = temp2_shape;
	}
	sigmoid (num) {
		return 1 / (1 + Math.pow(Math.E, -1 * num));
	}
	dSigmoid (num) {
		return num * (1 - num);
	}
}
