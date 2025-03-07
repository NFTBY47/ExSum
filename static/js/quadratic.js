export function solveQuadratic(a, b, c) {
    try {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        if (a === 0) {
            if (b === 0) {
                throw new Error("Не является квадратным уравнением");
            }
            return [-c / b];
        }

        const discriminant = b * b - 4 * a * c;

        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return [x1, x2];
        } else if (discriminant === 0) {
            return [-b / (2 * a)];
        } else {
            const real = -b / (2 * a);
            const imag = Math.sqrt(Math.abs(discriminant)) / (2 * a);
            return [
                `${real.toFixed(2)}+${imag.toFixed(2)}i`,
                `${real.toFixed(2)}-${imag.toFixed(2)}i`
            ];
        }
    } catch (error) {
        throw new Error("Ошибка вычисления: " + error.message);
    }
}

export function initQuadratic() {
    const solveBtn = document.querySelector('#solve-btn');
    const aInput = document.querySelector('#a-coef');
    const bInput = document.querySelector('#b-coef');
    const cInput = document.querySelector('#c-coef');
    const resultDiv = document.querySelector('#quadratic-result');

    solveBtn.addEventListener('click', () => {
        try {
            const roots = solveQuadratic(aInput.value, bInput.value, cInput.value);
            resultDiv.innerHTML = `<p>Корни уравнения: ${roots.join(', ')}</p>`;
        } catch (error) {
            resultDiv.innerHTML = `<p class="text-danger">Ошибка: ${error.message}</p>`;
        }
    });
} 