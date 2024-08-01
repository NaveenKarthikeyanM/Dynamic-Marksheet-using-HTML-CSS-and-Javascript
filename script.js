document.addEventListener('DOMContentLoaded', () => {
    const theoryInputs = document.querySelectorAll('.theory');
    const practicalInputs = document.querySelectorAll('.practical');
    const totalCells = document.querySelectorAll('.total');
    const wordsCells = document.querySelectorAll('.words');
    const grandTotalSpan = document.getElementById('grandTotal');
    const percentageSpan = document.getElementById('percentage');
    const gradeSpan = document.getElementById('grade');
    const totalInWords = document.getElementById('totalInWords');
    const resultCell = document.getElementById('result');

    function numberToWords(num) {
        const a = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (num < 20) return a[num];
        let word = b[Math.floor(num / 10)];
        if (num % 10 > 0) word += ' ' + a[num % 10];
        return word;
    }

    function calculateTotals() {
        let grandTotal = 0;
        theoryInputs.forEach((theoryInput, index) => {
            const theory = parseInt(theoryInput.value) || 0;
            const practical = parseInt(practicalInputs[index].value) || 0;

            const validTheory = Math.min(theory, 80);
            const validPractical = Math.min(practical, 20);
            
            const total = validTheory + validPractical;
            totalCells[index].textContent = total;
            wordsCells[index].textContent = numberToWords(total);
            grandTotal += total;
        });

        const percentage = (grandTotal / (theoryInputs.length * 100)) * 100;
        let grade;
        if (percentage >= 90) grade = 'A';
        else if (percentage >= 80) grade = 'B';
        else if (percentage >= 70) grade = 'C';
        else if (percentage >= 60) grade = 'D';
        else if (percentage >= 50) grade = 'E';
        else grade = 'F';

        grandTotalSpan.textContent = grandTotal;
        percentageSpan.textContent = `${percentage.toFixed(2)}%`;
        gradeSpan.textContent = grade;
        totalInWords.textContent = numberToWords(grandTotal);

        resultCell.textContent = percentage >= 50 ? 'PASS' : 'FAIL';
    }

    theoryInputs.forEach(input => input.addEventListener('input', calculateTotals));
    practicalInputs.forEach(input => input.addEventListener('input', calculateTotals));
});
