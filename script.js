const display = document.querySelector('.container input');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            display.value = '';
        } 
        else if (value === 'A') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } 
        else if (value === '=') {
            if (!currentInput) return;
            try {
                // Convert screen characters to JavaScript math symbols
                let expression = currentInput.replace(/x/g, '*').replace(/%/g, '/100');
                
                let result = new Function(`return ${expression}`)();
                
                if (!isFinite(result)) {
                    display.value = 'Error';
                    currentInput = '';
                } else {
                    // Strips trailing zeros and caps decimal precision safely
                    result = parseFloat(result.toFixed(7));
                    display.value = result;
                    currentInput = result.toString();
                }
            } catch {
                display.value = 'Error';
                currentInput = '';
            }
        } 
        else {
            const ops = ['+', '-', 'x', '/', '.', '%'];
            const lastChar = currentInput.slice(-1);

            // Prevent entering consecutive operators
            if (ops.includes(value) && ops.includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }
    });
});