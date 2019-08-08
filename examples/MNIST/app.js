let lines = [],
	headers = [];
let model = 0,
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
		$('#status').html('Done Loading Data!');
		setTimeout(resume, 1000);
	}
}
function resume () {
	let dataAmount = 1000;
	let Y_train = [];
	let Y_train_shape = [ 1, dataAmount ];
	let X_train = [];
	let X_train_shape = [ 784, dataAmount ];
	let newLines = [];
	for (let i = 0; i < dataAmount; i++) {
		let rand = Math.floor(Math.random() * lines.length);
		Y_train.push(scaleNum(lines[rand][0], 0, 9, 0, 1));
		newLines = [ ...lines[rand] ];
		newLines.shift();
		for (let j = 0; j < newLines.length; j++) {
			X_train.push(newLines[j]);
		}
	}
	// console.log(X_train);
	// console.log(Y_train);
	model = new NeuralNetwork(1);
	model.addDenseLayer(200, X_train_shape[0], 'xavier', 'sigmoid');
	model.addDenseLayer(50, 0, 'xavier', 'sigmoid');
	model.addDenseLayer(1, 0, 'xavier', 'sigmoid');
	for (let i = 0; i < 500; i++) {
		model.train(1, X_train, X_train_shape, Y_train, Y_train_shape);
		console.log('Cost at epoch ' + model.epoch + ': ' + model.cost);
	}
	console.log('Done Training!');
	for (let i = 0; i < 10; i++) {
		let rand = Math.floor(Math.random() * lines.length);
		newLines = [ ...lines[rand] ];
		newLines.shift();
		let xs = newLines;
		let xs_shape = [ 1, 784 ];
		console.log('Expected output: ' + lines[rand][0]);
		[ pred, pred_shape ] = model.predict(xs, xs_shape[0], xs_shape[1]);
		console.log('Output: ' + scaleNum(pred[0], 0, 1, 0, 9));
	}
	loop();
}
function scaleNum (n, nMin, nMax, sMin, sMax) {
	return (n - nMin) / (nMax - nMin) * (sMax - sMin) + sMin;
}
