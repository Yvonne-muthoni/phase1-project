//adding event listener to the id "btn"
document.getElementById("btn").addEventListener("click", () => {
  let user = document.getElementById("userInput").value;
// Fetch meal data from the API
  let mealAPI = fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
  );
  //proces the API response
  mealAPI.then((getData) => {
      if (!getData.ok) {
          throw new Error('Meal not found');
      }
      //convert response data to JSON format
      return getData.json();
  }).then((sendData) => {
      console.log(sendData)
      let data = '';
      sendData.meals.forEach((meal, i) => {
          data += `
              <h2 class='text-center text-light mt-5'>Food Area: ${meal.strArea}</h2>
              <h2 class='text-center text-warning'>Food Name: ${meal.strMeal}</h2>
              <div class="row">
                  <div class="col-md-4">
                      <img src="${meal.strMealThumb}" alt="" class='w-100 img'>
                  </div>
                  <div class="col-md-4">
                      <h2>Ingredients:</h2>
                      <ul>
                          ${generateListItems(meal, 'strIngredient')}
                      </ul>
                  </div>
                  <div class="col-md-4">
                      <h2>Measurements:</h2>
                      <ul>
                          ${generateListItems(meal, 'strMeasure')}
                      </ul>
                  </div>
              </div>
              <div class="col-12">
                  <h2>Instructions:</h2>
                  <p>${meal.strInstructions}</p>
              </div>
          `;
          heading.innerHTML = `<h1 class='text-center text-primary'>Food Category: ${sendData.meals[0].strCategory}</h1>`;
          appendData.innerHTML = data;
      });
  }).catch((error) => {
      document.querySelector('.find').style.display = 'none';
      document.querySelector('.notfound').innerHTML = "Meal Not Found 😥";
      document.querySelector('.try').innerHTML = "Try Something Else 😉";
  });
});