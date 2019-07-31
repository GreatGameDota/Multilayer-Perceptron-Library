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
		return temp, temp_shape;
	}
	transpose (matrix, row, col) {
		temp = [];
		temp_shape = [ row, col ];
		for (let i = 0; i < col; i++) {
			n = 0;
			for (let j = 0; j < row; j++) {
				temp.push(matrix[n + i]);
				n += col;
			}
		}
		return temp, temp_shape;
	}
	sub (matrixA, rowA, colA, matrixB) {
		if (matrixA.length != matrixB.length) {
			console.log('Sub Function error: Dimensions are not the same');
		}
		temp = [];
		temp_shape = [ rowA, colA ];
		for (let i = 0; i < matrixA.length; i++) {
			temp.push(matrixA[i] - matrixB[i]);
		}
		return temp, temp_shape;
	}
	mult (matrix, row, col, n) {
		temp = [];
		temp_shape = [ row, col ];
		for (let i = 0; i < matrix.length; i++) {
			temp.push(matrix[i] * n);
		}
		return temp, temp_shape;
	}
  multMatrices(matrixA, rowA, colA, matrixB) {
    if (matrixA.length != matrixB.length) {
			console.log('MultMatrices Function error: Dimensions are not the same');
		}
		temp = [];
		temp_shape = [ rowA, colA ];
		for (let i = 0; i < matrixA.length; i++) {
			temp.push(matrixA[i] * matrixB[i]);
		}
		return temp, temp_shape;
  }
  
}
function IX (x, y, cols) {
	return y + x * cols;
}
