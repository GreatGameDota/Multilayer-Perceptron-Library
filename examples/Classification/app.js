let resolution = 15,
	model = 0,
	pred = 0,
	pred_shape = 0,
	train_xs = [],
	train_ys = [],
	X_train = [],
	X_train_shape = [],
	Y_train = [],
	Y_train_shape = [],
	xs = [],
	xs_shape = [],
	colors = [],
	color1 = [],
	color2 = [];

function setup () {
	createCanvas(500, 500);
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
	xs = inputs;
	xs_shape = [ xs.length / 2, 2 ];
	let dataAmount = 1;
	// Inner circle
	for (let i = 0; i < dataAmount; i++) {
		let a = Math.random() * 2 * Math.PI;
		let r = 0.25 * Math.sqrt(Math.random());
		train_xs.push(r * Math.cos(a) + 0.5);
		train_ys.push(r * Math.sin(a) + 0.5);
	}
	for (let i = 0; i < dataAmount; i++) {
		X_train.push(train_xs[i]);
		X_train.push(train_ys[i]);
	}
	for (let i = 0; i < dataAmount; i++) {
		Y_train.push(0);
	}
	// Outer circle
	for (let i = 0; i < dataAmount; i++) {
		let r1 = 0.35;
		let r2 = 0.45;
		let a = Math.random() * 2 * Math.PI;
		let r = Math.sqrt(Math.random() * (r1 * r1 - r2 * r2) + r2 * r2);
		train_xs.push(r * Math.cos(a) + 0.5);
		train_ys.push(r * Math.sin(a) + 0.5);
	}
	for (let i = dataAmount; i < 2 * dataAmount; i++) {
		X_train.push(train_xs[i]);
		X_train.push(train_ys[i]);
	}
	X_train_shape = [ 2, 2 * dataAmount ];
	for (let i = dataAmount; i < 2 * dataAmount; i++) {
		Y_train.push(1);
	}
	Y_train_shape = [ 1, 2 * dataAmount ];

	X_train = [ 0, 1, 1, 0, 1, 1, 0, 0 ];
	X_train_shape = [ 2, 4 ];
	Y_train = [ 0, 0, 1, 1 ];
	Y_train_shape = [ 1, 4 ];

	// X_train = [ 0.25, 0.75, 0.75, 0.25, 0.75, 0.75, 0.25, 0.25 ];
	// X_train_shape = [ 2, 4 ];
	// Y_train = [ 0, 0, 1, 1 ]; // Flipped b/c p5js axis are flipped
	// Y_train_shape = [ 1, 4 ];

	model = new NeuralNetwork(0.1);
	model.addDenseLayer(5, X_train_shape[0], 'xavier', 'tanh');
	model.addDenseLayer(3, 0, 'xavier', 'tanh');
	model.addDenseLayer(1, 0, 'xavier', 'tanh');

	color1 = [ 255, 0, 0 ]; // 0
	color2 = [ 0, 255, 0 ]; // 1
	let midPoints = 8;
	let percentage = 0;
	for (let i = 0; i < midPoints + 1; i++) {
		colors.push([
			Math.round((1 - percentage) * color1[0] + percentage * color2[0]),
			Math.round((1 - percentage) * color1[1] + percentage * color2[1]),
			Math.round((1 - percentage) * color1[2] + percentage * color2[2])
		]);
		percentage += 1 / (midPoints + 1);
	}
	colors.push(color2);
}

function draw () {
	model.train(500, X_train, X_train_shape, Y_train, Y_train_shape);
	console.log(`Cost at epoch ${model.epoch}: ${model.cost}`);
	[ pred, pred_shape ] = model.predict(xs, xs_shape[0], xs_shape[1]);

	if (model.epoch % 5 == 0) {
		background(0);
		strokeWeight(0);
		let index = 0;
		for (let i = 0; i < width / resolution; i++) {
			for (let j = 0; j < height / resolution; j++) {
				let constrained = Math.min(Math.max(pred[index], 0), 1);
				let rgb = colors[Math.round(scaleNum(constrained, 1, 0, 0, 9))];
				fill(color(rgb[0], rgb[1], rgb[2]));
				rect(i * resolution, j * resolution, resolution, resolution);
				index++;
			}
		}
		for (let i = 0; i < X_train.length; i += X_train_shape[0]) {
			let x = scaleNum(X_train[i], 0, 1, 0, width);
			let y = scaleNum(X_train[i + 1], 0, 1, 0, height);
			strokeWeight(12);
			stroke(0);
			point(x, y);
			Y_train[i / X_train_shape[0]] == 0
				? stroke(color(color1[0], color1[1], color1[2]))
				: stroke(color(color2[0], color2[1], color2[2]));
			strokeWeight(10);
			point(x, y);
		}
	}
	if (model.cost < 0.001) {
		noLoop();
	}
}
function scaleNum (n, nMin, nMax, sMin, sMax) {
	return (n - nMin) / (nMax - nMin) * (sMax - sMin) + sMin;
}
