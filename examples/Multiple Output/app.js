let resolution = 10,
	model = 0,
	pred = 0,
	pred_shape = 0,
	X_train = [],
	X_train_shape = [],
	Y_train = [],
	Y_train_shape = [],
	xs = [],
	xs_shape = [];

function setup () {
	createCanvas(1000, 500);
	let inputs = [];
	let rows = 500 / resolution;
	let cols = 500 / resolution;
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x1 = i / cols;
			let x2 = j / rows;
			inputs.push(x1);
			inputs.push(x2);
		}
	}
	xs = inputs;
	xs_shape = [ xs.length / 2, 2 ];
	// let XY = [ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ];
	// 0,0 Top Left -- 0,1 Bottom Left -- 1,0 Top Right -- 1,1 Bottom Right
	X_train = [ 0, 0, 1, 1, 0, 1, 0, 1 ];
	X_train_shape = [2, 4];
	// let XY = [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ] ]; // Wanted outputs
	Y_train = [ 1, 0, 0, 1, 0, 0, 1, 1 ]; // Flipped b/c p5js axis are flipped
	Y_train_shape = [ 2, 4 ];

	model = new NeuralNetwork(1);
	model.addDenseLayer(5, X_train_shape[0], 'xavier', 'tanh');
	model.addDenseLayer(3, 0, 'xavier', 'tanh');
	model.addDenseLayer(3, 0, 'xavier', 'tanh');
	model.addDenseLayer(2, 0, 'xavier', 'tanh');
}

function draw () {
	model.train(50, X_train, X_train_shape, Y_train, Y_train_shape);
	console.log(`Cost at epoch ${model.epoch}: ${model.cost}`);
	[ pred, pred_shape ] = model.predict(xs, xs_shape[0], xs_shape[1]);
	background(0);
	strokeWeight(0);
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
