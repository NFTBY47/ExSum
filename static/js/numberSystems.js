export function convertNumber(number, fromBase, toBase) {
    try {
        // Преобразование в десятичную систему
        const decimal = fromBase === 10 ? parseInt(number) : parseInt(number, fromBase);

        // Преобразование из десятичной в целевую систему
        if (toBase === 10) {
            return decimal.toString();
        } else if (toBase === 16) {
            return decimal.toString(16).toUpperCase();
        } else if (toBase === 8) {
            return decimal.toString(8);
        } else if (toBase === 2) {
            return decimal.toString(2);
        }
        throw new Error("Неподдерживаемая система счисления");
    } catch (error) {
        throw new Error("Ошибка конвертации: " + error.message);
    }
}

export function initNumberSystems() {
    const convertBtn = document.querySelector('#convert-btn');
    const numberInput = document.querySelector('#number-input');
    const fromBaseSelect = document.querySelector('#from-base');
    const toBaseSelect = document.querySelector('#to-base');
    const resultDiv = document.querySelector('#number-result');

    convertBtn.addEventListener('click', () => {
        try {
            const result = convertNumber(
                numberInput.value,
                parseInt(fromBaseSelect.value),
                parseInt(toBaseSelect.value)
            );
            resultDiv.innerHTML = `<p>Результат: ${result}</p>`;
        } catch (error) {
            resultDiv.innerHTML = `<p class="text-danger">Ошибка: ${error.message}</p>`;
        }
    });
} 