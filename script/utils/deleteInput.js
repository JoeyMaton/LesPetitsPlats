const searchInput = document.getElementById('research');
const clearInput = document.getElementById('clear-input');



clearInput.addEventListener('click', () => {
  searchInput.value = '';
  event.preventDefault();
  const tags = addedTags;
  const query = document.getElementById("research").value;
  search(tags, query);
  clearInput.style.display = 'none';
  console.log(clearInput);
});

searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    clearInput.style.display = 'none';
  } else {
    clearInput.style.display = 'block';
  }
});


const inputIngredient = document.getElementById('search-input-ingredient');

inputIngredient.addEventListener('input', function() {
  const inputValue = this.value;
  if (inputValue) {
    console.log(inputValue);
  }
});