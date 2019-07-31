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
	multMatrices (matrixA, rowA, colA, matrixB) {
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
	add (rowA, colA, rowB, colB, matrixA, matrixB) {
		if (colA != colB && rowA != rowB) {
			console.log('Add Function error: Dimension Mismatch');
		}
		temp = [];
		add_i = 0;
		if (matrixA.length > matrixB.length) {
			temp_shape = [ rowA, colA ];
			while (!(matrixA.length == matrixB.length - rowB * colB)) {
				for (let i = 0; i < colA; i++) {
					if (!(matrixA.length == matrixB.length - rowB * colB)) {
						matrixB.push(matrixB[add_i]);
					}
				}
				add_i++;
			}
			for (let i = 0; i < rowB * colB; i++) {
				matrixB.shift();
			}
		} else {
			temp_shape = [ rowB, colB ];
			while (!(matrixB.length == matrixA.length - rowA * colA)) {
				for (let i = 0; i < colB; i++) {
					if (!(matrixB.length == matrixA.length - rowA * colA)) {
						matrixA.push(matrixA[add_i]);
					}
				}
				add_i++;
			}
			for (let i = 0; i < rowA * colA; i++) {
				matrixA.shift();
			}
		}
		for (let i = 0; i < matrixA.length; i++) {
			temp.push(matrixA[i] + matrixB[i]);
		}
		return temp, temp_shape;
	}
	sum (matrix, row, col, axis) {
		// Axis meaning whether to sum x or y (row or col) (0 for y, 1 for x)
		temp = [];
		if (axis == 1) {
			temp_shape = [ row, 1 ];
			for (let i = 0; i < row; i++) {
				sum = 0;
				for (let j = 0; j < col; j++) {
					sum += matrix[i * col + j];
				}
				temp.push(sum);
			}
		} else {
			temp_shape = [ 1, col ];
			for (let i = 0; i < col; i++) {
				sum = 0;
				n = 0;
				for (let j = 0; j < row; j++) {
					sum += matrix[i + n];
					n += col;
				}
				temp.push(sum);
			}
		}
		return temp, temp_shape;
	}
	square (matrix, row, col) {
		temp = [];
		temp_shape = [ row, col ];
		for (let i = 0; i < matrix.length; i++) {
			temp.push(matrix[i] * matrix[i]);
		}
		return temp, temp_shape;
	}
}
function IX (x, y, cols) {
	return y + x * cols;
}
