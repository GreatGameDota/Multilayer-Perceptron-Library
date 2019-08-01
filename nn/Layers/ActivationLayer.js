class ActivationLayer {
	activationFunc = 0;
	activationFuncDeriv = 0;
	A = [ 0 ];
	A_shape = [ 0, 0 ];
	dZ = [ 0 ];
	dZ_shape = [ 0 ];
	constructor (activation) {
		if (activation == 'sigmoid') {
			this.activationFunc = this.sigmoid;
			this.activationFuncDeriv = this.dSigmoid;
		} else if (activation == 'tanh') {
			this.activationFunc = this.tanh;
			this.activationFuncDeriv = this.dTanh;
		} else if (activation == 'arctan') {
			this.activationFunc = this.arctan;
			this.activationFuncDeriv = this.dArctan;
		} else {
			console.log('ActivationLayer Error: Please specify an activation function');
		}
	}
	activationForward (Z, row, col) {
		let [ temp, temp_shape ] = mf.map(Z, row, col, this.activationFunc);
		this.A = temp;
		this.A_shape = temp_shape;
	}
	activationBackward (upstream_grad, row, col) {
		let A = [ ...this.A ];
		let [ temp, temp_shape ] = mf.map(A, this.A_shape[0], this.A_shape[1], this.activationFuncDeriv);
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
	tanh (num) {
		return 2 / (1 + Math.pow(Math.E, -2 * num)) - 1;
	}
	dTanh (num) {
		return 1 - num * num;
	}
	arctan (num) {
		return Math.atan(num);
	}
	dArctan (num) {
		return 1 / (num * num + 1);
	}
}
