import mf from './utils/MatrixFunctions';

class NeuralNetwork {
	constructor (lr) {
		learningRate = lr;
	}
	cost = 1;
	costs = [];
	epoch = 0;
	linearLayers = [];
	activationLayers = [];
	addDenseLayer (units, inputShape, weight_init) {
		prevWeightShape = this.linearLayers.length > 0 ? this.linearLayers[this.linearLayers.length - 1].W_shape : null;
		this.linearLayers.push(new LinearLayer(units, inputShape, weight_init, prevWeightShape));
		this.activationLayers.push(new ActivationLayer());
	}
	computCost (Y, rowY, colY, Y_hat, rowY2, colY2) {
		m = colY;
		[ temp, temp_shape ] = mf.sub(Y, rowY, colY, Y_hat, rowY2, colY2);
		[ temp2, temp2_shape ] = mf.square(temp, temp_shape[0], temp_shape[1]);
		[ temp3, temp3_shape ] = mf.sum(temp2, temp2_shape[0], temp2_shape[1], 1);
		this.cost = 1 / (2 * m);
		this.cost *= temp3;
		[ temp4, temp4_shape ] = mf.mult(temp, temp_shape[0], temp_shape[1], -1 / m);
		return [ temp4, temp4_shape ];
	}
	train (epochs) {
		//TODO
	}
}
