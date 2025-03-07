export function createMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols).fill(0);
    }
    return matrix;
}

export function determinant(matrix) {
    if (matrix.length !== matrix[0].length) {
        throw new Error("Матрица должна быть квадратной");
    }

    if (matrix.length === 1) {
        return matrix[0][0];
    }

    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
        det += Math.pow(-1, i) * matrix[0][i] * determinant(getMinor(matrix, 0, i));
    }
    return det;
}

export function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = createMatrix(cols, rows);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}

function getMinor(matrix, row, col) {
    const minor = [];
    for (let i = 0; i < matrix.length; i++) {
        if (i === row) continue;
        const newRow = [];
        for (let j = 0; j < matrix.length; j++) {
            if (j === col) continue;
            newRow.push(matrix[i][j]);
        }
        minor.push(newRow);
    }
    return minor;
}

export function initMatrix() {
    const createBtn = document.querySelector('#create-matrix-btn');
    const calculateBtn = document.querySelector('#calculate-matrix-btn');
    const matrixInputs = document.querySelector('#matrix-inputs');
    const resultDiv = document.querySelector('#matrix-result');

    createBtn.addEventListener('click', () => {
        const rows = parseInt(document.querySelector('#matrix-rows').value);
        const cols = parseInt(document.querySelector('#matrix-cols').value);
        
        let html = '<table class="table table-bordered">';
        for (let i = 0; i < rows; i++) {
            html += '<tr>';
            for (let j = 0; j < cols; j++) {
                html += `<td><input type="number" class="form-control matrix-cell" data-row="${i}" data-col="${j}" value="0"></td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        matrixInputs.innerHTML = html;
    });

    calculateBtn.addEventListener('click', () => {
        try {
            const rows = parseInt(document.querySelector('#matrix-rows').value);
            const cols = parseInt(document.querySelector('#matrix-cols').value);
            const operation = document.querySelector('#matrix-operation').value;

            const matrix = [];
            for (let i = 0; i < rows; i++) {
                matrix[i] = [];
                for (let j = 0; j < cols; j++) {
                    const cell = document.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
                    matrix[i][j] = parseFloat(cell.value);
                }
            }

            let result;
            if (operation === 'determinant') {
                result = determinant(matrix);
                resultDiv.innerHTML = `<p>Определитель: ${result}</p>`;
            } else if (operation === 'transpose') {
                result = transpose(matrix);
                let html = '<p>Результат:</p><table class="table table-bordered">';
                result.forEach(row => {
                    html += '<tr>';
                    row.forEach(cell => {
                        html += `<td>${cell}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</table>';
                resultDiv.innerHTML = html;
            }
        } catch (error) {
            resultDiv.innerHTML = `<p class="text-danger">Ошибка: ${error.message}</p>`;
        }
    });
} 