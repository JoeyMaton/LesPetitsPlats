const searchInput = document.getElementById('research');
const clearInput = document.getElementById('clear-input');

clearInput.addEventListener('click', () => {
  searchInput.value = '';
  event.preventDefault();
  const tags = addedTags;
  const query = document.getElementById("research").value;
  search(tags, query);
  clearInput.style.display = 'none';
});

searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    clearInput.style.display = 'none';
  } else {
    clearInput.style.display = 'block';
  }
});