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
function generateListItems(meal, property) {
  //an empty string to store list items
  let listItems = '';
  for (let i = 1; i <= 20; i++) {
      const ingredient = meal[property + i];
      if (ingredient) {
          listItems += `<li>${ingredient}</li>`;
      }
  }
  return listItems;
}
//apply dark theme 
(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    window.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()