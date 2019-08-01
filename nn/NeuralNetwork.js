let mf = new MatrixFunctions();
/*
	Made by GreatGameDota
	https://github.com/GreatGameDota
*/
class NeuralNetwork {
	learningRate = 0;
	cost = 1;
	costs = [];
	epoch = 0;
	linearLayers = [];
	activationLayers = [];
	constructor (lr) {
		this.learningRate = lr;
	}
	addDenseLayer (units, inputShape, weight_init) {
		let prevWeightShape = this.linearLayers.length > 0 ? this.linearLayers[this.linearLayers.length - 1].W_shape : null;
		this.linearLayers.push(new LinearLayer(units, inputShape, weight_init, prevWeightShape));
		this.activationLayers.push(new ActivationLayer());
	}
	computeCost (Y, rowY, colY, Y_hat, rowY2, colY2) {
		let m = colY;
		let [ temp, temp_shape ] = mf.sub(Y, rowY, colY, Y_hat);
		let [ temp2, temp2_shape ] = mf.square(temp, temp_shape[0], temp_shape[1]);
		let [ temp3, temp3_shape ] = mf.sum(temp2, temp2_shape[0], temp2_shape[1], 1);
		this.cost = 1 / (2 * m);
		this.cost *= temp3;
		let [ temp4, temp4_shape ] = mf.mult(temp, temp_shape[0], temp_shape[1], -1 / m);
		return [ temp4, temp4_shape ];
	}
	train (epochs, X_train, X_train_shape, Y_train, Y_train_shape) {
		for (let k = 0; k < epochs; k++) {
			// Forward
			for (let i = 0; i < this.linearLayers.length; i++) {
				if (i == 0) {
					this.linearLayers[i].linearForward(X_train, X_train_shape[0], X_train_shape[1]);
				} else {
					let A = [ ...this.activationLayers[i - 1].A ];
					let A_shape = this.activationLayers[i - 1].A_shape;
					this.linearLayers[i].linearForward(A, A_shape[0], A_shape[1]);
				}
				let Z = [ ...this.linearLayers[i].Z ];
				let Z_shape = this.linearLayers[i].Z_shape;
				this.activationLayers[i].activationForward(Z, Z_shape[0], Z_shape[1]);
			}
			// Compute Cost
			let A = [ ...this.activationLayers[this.linearLayers.length - 1].A ];
			let A_shape = this.activationLayers[this.linearLayers.length - 1].A_shape;
			let [ dA, dA_shape ] = this.computeCost(Y_train, Y_train_shape[0], Y_train_shape[1], A, A_shape[0], A_shape[1]);
			// Backward
			for (let i = this.linearLayers.length - 1; i >= 0; i--) {
				if (i == this.linearLayers.length - 1) {
					this.activationLayers[i].activationBackward(dA, dA_shape[0], dA_shape[1]);
				} else {
					let dA_prev = [ ...this.linearLayers[i + 1].dA_prev ];
					let dA_prev_shape = this.linearLayers[i + 1].dA_prev_shape;
					this.activationLayers[i].activationBackward(dA_prev, dA_prev_shape[0], dA_prev_shape[1]);
				}
				let dZ = [ ...this.activationLayers[i].dZ ];
				let dZ_shape = this.activationLayers[i].dZ_shape;
				this.linearLayers[i].linearBackward(dZ, dZ_shape[0], dZ_shape[1]);
			}
			// Update Weights and Biases
			for (let i = this.linearLayers.length - 1; i >= 0; i--) {
				this.linearLayers[i].updateParams(this.learningRate);
			}
			this.epoch++;
		}
	}
	predict (X, row, col) {
		let n = this.linearLayers.length - 1;
		let [ temp, temp_shape ] = mf.transpose(X, row, col);
		this.linearLayers[0].linearForward(temp, temp_shape[0], temp_shape[1]);
		let Z = [ ...this.linearLayers[0].Z ];
		let Z_shape = this.linearLayers[0].Z_shape;
		this.activationLayers[0].activationForward(Z, Z_shape[0], Z_shape[1]);
		for (let i = 1; i <= n; i++) {
			let A = [ ...this.activationLayers[i - 1].A ];
			let A_shape = this.activationLayers[i - 1].A_shape;
			this.linearLayers[i].linearForward(A, A_shape[0], A_shape[1]);
			Z = [ ...this.linearLayers[i].Z ];
			Z_shape = this.linearLayers[i].Z_shape;
			this.activationLayers[i].activationForward(Z, Z_shape[0], Z_shape[1]);
		}
		let pred = [ ...this.activationLayers[this.activationLayers.length - 1].A ];
		let pred_shape = this.activationLayers[this.activationLayers.length - 1].A_shape;
		return [ pred, pred_shape ];
	}
}
