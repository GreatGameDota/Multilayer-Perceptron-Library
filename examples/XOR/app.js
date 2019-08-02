let resolution = 5,
	model = 0,
	pred = 0,
	pred_shape = 0;
function setup () {
	createCanvas(700, 700);
	let inputs = [];
	let rows = width / resolution;
	let cols = height / resolution;
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x1 = i / cols;
			let x2 = j / rows;
			inputs.push(x1);
			inputs.push(x2);
		}
	}
	let xs = inputs;
	let xs_shape = [ xs.length / 2, 2 ];
	let X_train = [ 0, 0, 1, 1, 0, 1, 0, 1 ];
	let X_train_shape = [ 2, 4 ];
	let Y_train = [ 1, 0, 0, 1 ];
	let Y_train_shape = [ 1, 4 ];

	model = new NeuralNetwork(1);
	model.addDenseLayer(5, X_train_shape[0], 'xavier', 'sigmoid');
	model.addDenseLayer(3, 0, 'xavier', 'sigmoid');
	model.addDenseLayer(1, 0, 'xavier', 'sigmoid');

	for (let i = 0; i < 5000; i++) {
		model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
		if (model.epoch % 100 == 0) console.log(model.cost);
	}
	console.log('Done!');
	[ pred, pred_shape ] = model.predict(xs, xs_shape[0], xs_shape[1]);
}
function draw () {
	background(0);
	let index = 0;
	for (let i = 0; i < width / resolution; i++) {
		for (let j = 0; j < height / resolution; j++) {
			let br = pred[index] * 255;
			fill(br);
			rect(i * resolution, j * resolution, resolution, resolution);
			index++;
		}
	}
}
