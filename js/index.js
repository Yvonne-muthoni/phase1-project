//adding event listener to the id "btn"
document.getElementById("btn").addEventListener("click", () => {
  let user = document.getElementById("userInput").value;
// Fetch meal data from the API
  let mealAPI = fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
  );