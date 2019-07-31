export default class MatrixFunctions {
	dot (rowA, colA, rowB, colB, matrixA, matrixB) {
		temp = [];
		if (colA != rowB) {
			console.log('Dot Function error: Dimension Mismatch');
		}
		resultRow = rowA;
		resultCol = colB;
		temp_shape = [ resultRow, resultCol ];
		for (let i = 0; i < resultRow; i++) {
			for (let j = 0; j < resultCol; j++) {
				sum = 0;
				for (let k = 0; k < colA; k++) {
					sum += matrixA[IX(j, k, colA)] * matrixB[IX(k, i, colB)];
        }
        temp.push(sum);
			}
		}
	}
}
function IX (x, y, cols) {
	return y + x * cols;
}
