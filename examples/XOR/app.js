let X_train = [ 0, 0, 1, 1, 0, 1, 0, 1 ];
let X_train_shape = [ 2, 4 ];
let Y_train = [ 0, 1, 1, 0 ];
let Y_train_shape = [ 1, 4 ];

let model = new NeuralNetwork(1);
model.addDenseLayer(5, X_train_shape[0], 'xavier');
model.addDenseLayer(3, 0, 'xavier');
model.addDenseLayer(1, 0, 'xavier');
model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
console.log(model.cost);
