// Переключение между разделами
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.calculator-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        document.getElementById(this.dataset.section).classList.add('active');
    });
});

// Конвертация систем счисления
async function convertNumber() {
    const number = document.getElementById('number-input').value;
    const fromBase = document.getElementById('from-base').value;
    const toBase = document.getElementById('to-base').value;
    
    try {
        const response = await fetch('/convert_number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number, fromBase, toBase })
        });
        const data = await response.json();
        document.getElementById('number-result').innerHTML = `
            <p>Результат: ${data.result}</p>
        `;
    } catch (error) {
        document.getElementById('number-result').innerHTML = `
            <p class="text-danger">Ошибка: ${error.message}</p>
        `;
    }
}

// Решение квадратного уравнения
async function solveQuadratic() {
    const a = document.getElementById('a-coef').value;
    const b = document.getElementById('b-coef').value;
    const c = document.getElementById('c-coef').value;
    
    try {
        const response = await fetch('/solve_quadratic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ a, b, c })
        });
        const data = await response.json();
        document.getElementById('quadratic-result').innerHTML = `
            <p>Корни уравнения: ${data.roots.join(', ')}</p>
        `;
    } catch (error) {
        document.getElementById('quadratic-result').innerHTML = `
            <p class="text-danger">Ошибка: ${error.message}</p>
        `;
    }
}

// Создание полей ввода для матрицы
function createMatrixInputs() {
    const rows = parseInt(document.getElementById('matrix-rows').value);
    const cols = parseInt(document.getElementById('matrix-cols').value);
    let html = '<table class="table table-bordered">';
    
    for (let i = 0; i < rows; i++) {
        html += '<tr>';
        for (let j = 0; j < cols; j++) {
            html += `<td><input type="number" class="form-control matrix-cell" data-row="${i}" data-col="${j}" value="0"></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    
    document.getElementById('matrix-inputs').innerHTML = html;
}

// Операции с матрицей
async function calculateMatrix() {
    const rows = parseInt(document.getElementById('matrix-rows').value);
    const cols = parseInt(document.getElementById('matrix-cols').value);
    const operation = document.getElementById('matrix-operation').value;
    
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
            matrix[i][j] = parseFloat(cell.value);
        }
    }
    
    try {
        const response = await fetch('/calculate_matrix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix, operation })
        });
        const data = await response.json();
        
        if (operation === 'determinant') {
            document.getElementById('matrix-result').innerHTML = `
                <p>Определитель: ${data.result}</p>
            `;
        } else {
            let resultHtml = '<p>Результат:</p><table class="table table-bordered">';
            data.result.forEach(row => {
                resultHtml += '<tr>';
                row.forEach(cell => {
                    resultHtml += `<td>${cell}</td>`;
                });
                resultHtml += '</tr>';
            });
            resultHtml += '</table>';
            document.getElementById('matrix-result').innerHTML = resultHtml;
        }
    } catch (error) {
        document.getElementById('matrix-result').innerHTML = `
            <p class="text-danger">Ошибка: ${error.message}</p>
        `;
    }
} 