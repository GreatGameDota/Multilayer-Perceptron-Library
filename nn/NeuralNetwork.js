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
	}
	loadActivationLayers () {
		for (let i = 0; i < this.linearLayers.length; i++) {
			this.activationLayers.push(new ActivationLayer());
		}
	}
	train (epochs) {
		//TODO
	}
}
