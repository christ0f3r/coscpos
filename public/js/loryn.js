// JavaScript to handle the plus and minus buttons for the "Add" form
const addQuantityInput = document.getElementById('add-quantity');
const addIncrementButton = document.getElementById('add-increment');
const addDecrementButton = document.getElementById('add-decrement');

addIncrementButton.addEventListener('click', () => {
    addQuantityInput.value = parseInt(addQuantityInput.value) + 1;
});

addDecrementButton.addEventListener('click', () => {
    addQuantityInput.value = parseInt(addQuantityInput.value) - 1;
});

// JavaScript to handle the plus and minus buttons for the "Remove" form
const removeQuantityInput = document.getElementById('remove-quantity');
const removeIncrementButton = document.getElementById('remove-increment');
const removeDecrementButton = document.getElementById('remove-decrement');

removeIncrementButton.addEventListener('click', () => {
    removeQuantityInput.value = parseInt(removeQuantityInput.value) + 1;
});

removeDecrementButton.addEventListener('click', () => {
    removeQuantityInput.value = parseInt(removeQuantityInput.value) - 1;
});
