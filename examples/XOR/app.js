let X_train = [ 0, 0, 1, 1, 0, 1, 0, 1 ];
let X_train_shape = [ 2, 4 ];
let Y_train = [ 0, 1, 1, 0 ];
let Y_train_shape = [ 1, 4 ];

let model = new NeuralNetwork(1);
model.addDenseLayer(5, X_train_shape[0], 'xavier');
model.addDenseLayer(3, 0, 'xavier');
model.addDenseLayer(1, 0, 'xavier');
// Default test data
// model.linearLayers[0].W = [ -0.57367331, -0.61395474, -0.3683933, 0.61290852, -0.09087733, 0.63146443 ];
// model.linearLayers[1].W = [ -0.22940096, 1.34164479, -0.57717743 ];
for (let i = 0; i < 5000; i++) {
	model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
	if (model.epoch % 100 == 0) console.log(model.cost);
}
console.log('Done!');
let [ pred, pred_shape ] = model.predict(X_train, X_train_shape[1], X_train_shape[0]);
console.log(pred);
