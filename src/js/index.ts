import sum from './sum';

window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('calculateSumBtn');

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const showError = document.getElementById('showError');
    const showSum = document.getElementById('showSum');

    showError.innerText = "";
    showSum.innerText = "";

    try {
      const aValue = (document.getElementById('a') as HTMLInputElement).value
      const bValue = (document.getElementById('b') as HTMLInputElement).value

      if (aValue === '' || bValue === '') {
        showError.innerText = "Please enter valid numbers!";
        return;
      }

      const a = Number(aValue);
      const b = Number(bValue);
      const calculatedSum = sum(a, b);

      showSum.innerText = calculatedSum.toString();
    } catch {
      showError.innerText = "Please enter valid numbers!";
    }
  });
});
