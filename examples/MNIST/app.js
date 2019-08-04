let lines = [],
	headers = [];
let resolution = 5,
	model = 0,
	pred = 0,
	pred_shape = 0;
function setup () {
	noLoop();
	$('#status').html('Loading Data...');
	$(document).ready(function () {
		$.ajax({
			type: 'GET',
			url: 'csv/mnist_train.txt',
			dataType: 'text',
			success: function (data) {
				processData(data);
			}
		});
	});

	function processData (allText) {
		var allTextLines = allText.split(/\r\n|\n/);
		headers = allTextLines[0].split(',');
		lines = [];

		for (var i = 1; i < allTextLines.length; i++) {
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tarr = [];
				for (var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr);
			}
		}
		resume();
	}
	// for (let i = 0; i < 5000; i++) {
	// 	model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
	// 	if (model.epoch % 100 == 0) console.log(model.cost);
	// }
	// console.log('Done!');
	// [ pred, pred_shape ] = model.predict(xs, xs_shape[0], xs_shape[1]);
}
function resume () {
	$('#status').html('Done Loading Data!');
	createCanvas(700, 700);
	let dataAmount = 1;
	let Y_train = [];
	let Y_train_shape = [ dataAmount, 1 ];
	let X_train = [];
	let X_train_shape = [ 784, dataAmount ];
	let newLines = [];
	for (let i = 0; i < dataAmount; i++) {
		Y_train.push(lines[i][0]);
		newLines = [ ...lines[i] ];
		newLines.shift();
		X_train.push(newLines);
	}
	// console.log(X_train);
	// console.log(Y_train);
	model = new NeuralNetwork(1);
	model.addDenseLayer(700, X_train_shape[0], 'xavier', 'sigmoid');
	model.addDenseLayer(300, 0, 'xavier', 'sigmoid');
	model.addDenseLayer(100, 0, 'xavier', 'sigmoid');
	model.addDenseLayer(1, 0, 'xavier', 'sigmoid');
	model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
	console.log(model.cost);
	loop();
}
function draw () {
	// background(0);
	// let index = 0;
	// for (let i = 0; i < width / resolution; i++) {
	// 	for (let j = 0; j < height / resolution; j++) {
	// 		let br = pred[index] * 255;
	// 		fill(br);
	// 		rect(i * resolution, j * resolution, resolution, resolution);
	// 		index++;
	// 	}
	// }
}