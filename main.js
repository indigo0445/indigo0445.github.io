const resultBox = document.getElementById("result");

let weight; 
let heightFeet;
let heightInches;
let age;
let sex;
let activityLevel;
let calories;
let proteinRatio;
let dCalories;
let prioritizeProtein;
let targetCalories;

mainPage();

function mainPage() {
    resultBox.innerHTML = `

          <form id="userForm">
            <!-- Weight input -->
            <label for="weight">Weight (pounds):</label> <input type="number" step="0.01" id="weight" name="weight" placeholder="Enter your weight" min="0">

            <br>

            <!-- Age input -->
            <label for="age">Age:</label>
            <input type="number" step="0.01" id="age" name="age" placeholder="Enter your age" min="0">

            <br>

            <!-- <label>Height:</label>
            <label for="heightFeet">Ft:</label>
            <input type="number" id="heightFeet" name="heightFeet" placeholder="Feet" min="0" style="width:60px;"> 
            <label for="heightInches">In:</label>
            <input type="number" id="heightInches" name="heightInches" placeholder="Inches" min="0" max="11" style="width:60px;"> -->
            <label>Height:</label>
            <div class="height-row">
              <label for="heightFeet">Ft:</label>
              <input type="number" id="heightFeet" name="heightFeet" placeholder="Feet" min="0">
              
              <label for="heightInches">In:</label>
              <input type="number" step="0.01" id="heightInches" name="heightInches" placeholder="Inches" min="0" max="11">
            </div>

            <br>

            <!-- Gender dropdown -->
            <label for="sex">Sex:</label>
            <select id="sex" name="sex">
              <option value="" disabled selected>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <br>

            <!-- Activity level dropdown -->
            <label for="activityLevel">Activity Level:</label>
            <select id="activityLevel" name="activityLevel">
              <option value="" disabled selected>Select activity level</option>
              <option value="0">Sedentary</option>
              <option value="1">Lightly active</option>
              <option value="2">Moderately active</option>
              <option value="3">Very active</option>
              <option value="4">Extra active</option>
            </select>

            <!-- Submit button -->
            <button type="submit">Submit</button>
          </form>
`
    let form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        weight = parseFloat(document.getElementById('weight').value);
        heightFeet = parseInt(document.getElementById('heightFeet').value);
        heightInches = parseFloat(document.getElementById('heightInches').value);
        age = parseFloat(document.getElementById('age').value);
        sex = document.getElementById('sex').value;
        activityLevel = parseFloat(document.getElementById('activityLevel').value);

        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
        caloriesPage();
    })
}

function caloriesPage() {
    calories = calculateCalories(weight, 12*heightFeet+heightInches, age, sex, activityLevel);
    document.getElementById("result").style.display = "block";

    // show the result
    resultBox.style.display = "block";
    resultBox.classList.remove('fade-in'); // reset if it was used before
    void resultBox.offsetWidth;            // reflow to restart the animation
    resultBox.classList.add('fade-in');
    resultBox.innerHTML = `
      <div class="card">
        <h2>Daily Caloric Burn</h2>
        <p><strong>Calories:</strong> ${calories.toLocaleString()} kcal/day</p>

        <hr>

        <p>Are you trying to...</p>
        <div class="goal-buttons">
          <button id="bulk" class="goal">Bulk</button>
          <button id="cut" class="goal">Cut</button>
          <button id="maintain" class="goal">Maintain</button>
        </div>

        <hr>

        <button id="restart">Go Back</button>
      </div>
    `;
    document.getElementById("restart").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros";
        mainPage();
    });

    document.getElementById("bulk").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Bulking";
        bulkPage();
    })

    document.getElementById("cut").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Cutting";
        cutPage();
    });

    document.getElementById("maintain").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Maintaining";
        maintainPage();
    });
}

function bulkPage() {
    resultBox.innerHTML = `
        <select id="calorieSurplus">
            <option value="" disabled selected>Select your calorie surplus</option>
            <option value="250">Small (≈250 kcal/day) → lean bulk, minimal fat gain</option>
            <option value="500">Moderate (≈500 kcal/day) → balanced muscle + fat gain</option>
            <option value="750">Large (≈750+ kcal/day) → faster mass, more fat risk</option>
        </select>
        <select id="proteinRatio">
            <option value="" disabled selected>Select your protein ratio</option>
            <option value="0.7">0.7 g/lb → beginners, big surplus, easier gains</option>
            <option value="1.0">1.0 g/lb → standard bulk, maximizes growth efficiently</option>
            <option value="1.2">1.2 g/lb → lean bulk, advanced lifters, higher satiety</option>
        </select>
        <label for="proteinOnly">Do you only care about protein and not the other macros?</label>
        <input type="checkbox" id="proteinOnly">
        <button type="button" id="submit">Submit</button>
        <button id="restart">Go Back</button>
    `;

    document.getElementById("restart").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
        caloriesPage();
    });

    document.getElementById("submit").addEventListener("click", () => {
        proteinRatio = parseFloat(document.getElementById("proteinRatio").value);
        dCalories = parseInt(document.getElementById("calorieSurplus").value);
        proteinOnly = document.getElementById("proteinOnly").checked;

        targetCalories = calories + dCalories;
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Recommended Food";
        foodPage();
    })
}

function cutPage() {
    resultBox.innerHTML = `<select id="calorieDeficit"> <option value="" disabled selected>Select your calorie deficit</option> <option value="300">Small (≈300 kcal/day) → slow fat loss, mostly muscle preserved</option> <option value="500">Moderate (≈500 kcal/day) → steady fat loss, some muscle risk</option> <option value="750">Moderate-Large (≈750 kcal/day) → slightly fast fat loss, moderate muscle risk</option> <option value="1000">Large (≈1000 kcal/day) → fast fat loss, higher muscle loss risk</option> </select> <select id="proteinRatio"> <option value="" disabled selected>Select your protein ratio</option> <option value="0">I don't care about protein</option> <option value="0.6">0.6 g/lb → mild deficit, muscle mostly preserved</option> <option value="0.8">0.8 g/lb → standard cut, good muscle retention</option> <option value="1.0">1.0 g/lb → aggressive cut, max muscle preservation</option> </select> <button type="button" id="submit">Submit</button> <button id="restart">Go Back</button>` ;

    document.getElementById("restart").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
        caloriesPage();
    });

    document.getElementById("submit").addEventListener("click", () => {
        proteinRatio = parseFloat(document.getElementById("proteinRatio").value);
        dCalories = -1 * parseInt(document.getElementById("calorieDeficit").value);

        targetCalories = calories + dCalories;

        // TODO: MAKE SYMM TO BULK?
        proteinOnly = false;
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Recommended Food";
        foodPage();
    });
}

function maintainPage() {
  resultBox.innerHTML = `
        <select id="proteinRatio">
            <option value="" disabled selected>Select your protein ratio</option>
            <option value="0">I don't care about protein</option>
            <option value="0.7">0.7 g/lb → basic coverage, supports general health</option>
            <option value="1.0">1.0 g/lb → balanced intake, supports muscle maintenance</option>
            <option value="1.2">1.2 g/lb → higher intake, aids recovery and growth</option>
        </select>
        <button type="button" id="submit">Submit</button>
        <button id="restart">Go Back</button>
  `;

    document.getElementById("restart").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
        caloriesPage();
    });

    document.getElementById("submit").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Recommended Food";

        proteinRatio = parseFloat(document.getElementById("proteinRatio").value);
        dCalories = 0;

        targetCalories = calories + dCalories;

        foodPage();
    });
}

function foodPage() {
    resultBox.innerHTML = `
        <p id='timeP'>Here are your recommended meals for </p>
        <button id="restart">Go Back</button>
    `;

    fetchData().then(macros => {
        meals = getMeals2Items(macros, getMealByTime());
        showMeals(macros, meals);

    });

}

function showMeals(macros, meals) {
   // Shell with left grid and an empty right panel (outside the 9-card grid)
   resultBox.innerHTML = `
     <div id="mealsLayout">
       <div class="meals-left">
         <p id='mealsTitle' class="meals-title"></p>
         <ul id="mealsBox"></ul>
         <button id="restart">Go Back</button>
       </div>
       <div class="meals-right" id="macroPanel" aria-hidden="true">
         <div class="macro-placeholder">
           <div>📊 Select a meal to open details</div>
         </div>
       </div>
     </div>
   `;
 
    document.getElementById('mealsTitle').innerText += `Here are your recommended meals for ${getMealByTime()} (${getCurrentTimeFormatted()})...`;

   document.getElementById("restart").addEventListener("click", () => {
     document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
     caloriesPage();
   });
 
   const ul = document.getElementById("mealsBox");
   const counter = {};
   let added = 0;
 
   // Fill up to 9 cards (max 2 per restaurant)
   for (let i = 0; i < meals.length && added < 9; i++) {
     const [, key, iIdx, jIdx] = meals[i];
     counter[key] = counter[key] || 0;
     if (counter[key] >= 2) continue;
 
     const restName = mdata[key]["name"];
     const itemA = macros[key][iIdx][0];
     const itemB = macros[key][jIdx][0];
     const cals = findValue(macros[key], iIdx, "calories") + findValue(macros[key], jIdx, "calories");
     const prot = findValue(macros[key], iIdx, "protein") + findValue(macros[key], jIdx, "protein");
 
     const li = document.createElement("li");
     li.className = "meal-card";
     li.dataset.key = key;
     li.dataset.iidx = iIdx;
     li.dataset.jidx = jIdx;
     li.innerHTML = `
       <div class="restaurant">${restName}</div>
       <div class="items">${itemA}, ${itemB}</div>
       <div class="macros"><span class="cal">Calories: ${cals}</span> · <span class="prot">Protein: ${prot}g</span></div>
     `;
 
     li.addEventListener("click", () => {
       const layout = document.getElementById("mealsLayout");
       const panel = document.getElementById("macroPanel");
 
       // Toggle: if this card is already selected, collapse back to single column
       if (li.classList.contains("selected")) {
         li.classList.remove("selected");
         layout.classList.remove("has-selection");
         panel.setAttribute("aria-hidden", "true");
         panel.innerHTML = `
           <div class="macro-placeholder">
             <div>📊 Select a meal to open details</div>
           </div>
         `;
         return;
       }
 
       // New selection: mark, open right panel, fade in content
       document.querySelectorAll(".meal-card.selected").forEach(el => el.classList.remove("selected"));
       li.classList.add("selected");
       layout.classList.add("has-selection");
       panel.setAttribute("aria-hidden", "false");
 
       const other = getOtherMacros(macros, key, iIdx, jIdx); // placeholder – replace later
       renderMacroBars(panel, { restaurant: restName, items: [itemA, itemB], data: other });
 
       // trigger fade-in animation on fresh content (centered panel)
 panel.classList.remove("fade-in-right");
 panel.classList.remove("fade-in-up");   // reset if already applied
 void panel.offsetWidth;                 // reflow to restart animation
 panel.classList.add("fade-in-up");
 
     });
 
     ul.appendChild(li);
     counter[key]++; added++;
   }
 
   // Optional: keep your randomization
   const shuffled = shuffleArray(Array.from(ul.children));
   ul.innerHTML = "";
   shuffled.forEach(li => ul.appendChild(li));
 }
 
function getOtherMacros(macros, key, iIdx, jIdx) {
    loc = macros[key];
    let carbs = findValue(loc, iIdx, 'carb') + findValue(loc, jIdx, 'carb');
    let sat = findValue(loc, iIdx, 'sat') + findValue(loc, jIdx, 'sat');
    let fiber = findValue(loc, iIdx, 'fiber') + findValue(loc, jIdx, 'fiber');
    let sugar = findValue(loc, iIdx, 'sugar') + findValue(loc, jIdx, 'sugar');

   return { "Carbs (g)": carbs, "Fat (g)": sat, "Fiber (g)": fiber, "Sugar (g)": sugar};
}

 function renderMacroBars(panel, payload) {
   const { restaurant, items, data } = payload;
   const entries = Object.entries(data);
   const values = entries.map(([, v]) => Math.max(0, Number(v) || 0));
   const maxVal = Math.max(1, ...values);
 
   panel.innerHTML = `
     <div class="macro-card">
       <div class="macro-head">
         <div class="macro-title">Other Macros</div>
         <div class="macro-sub">${restaurant}</div>
         <div class="macro-items">${items.join(", ")}</div>
       </div>
       <div class="bars" id="bars"></div>
     </div>
   `;
 
   const bars = panel.querySelector("#bars");
   entries.forEach(([label, value]) => {
     const v = Math.max(0, Number(value) || 0);
     const pct = Math.round((v / maxVal) * 100);
     const row = document.createElement("div");
     row.className = "bar-row";
     row.innerHTML = `
       <div class="bar-label">${label}</div>
       <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
       <div class="bar-value">${v}</div>
     `;
     bars.appendChild(row);
   });
 }
 

/*
function showMeals(macros, meals) {
    resultBox.innerHTML = `
        <p id='timeP'>Here are your recommended meals for</p>

        <ul id='mealsBox'>
        </ul>

        <button id="restart">Go Back</button>
    `;

    document.getElementById('timeP').innerText += ` ${getMealByTime()} (${getCurrentTimeFormatted()})...`;

    document.getElementById("restart").addEventListener("click", () => {
        document.querySelector("#siteHeader h1").textContent = "CMU Macros: Your BMR";
        caloriesPage();
    });

    let counter = {};

    let ul = document.getElementById("mealsBox");
    for (let i = 0; ul.children.length < 5; i++) {
        let li = document.createElement("li");
        li.textContent += mdata[meals[i][1]]["name"];
        li.textContent += " - ";
        li.textContent += macros[meals[i][1]][meals[i][2]][0];
        li.textContent += ", ";
        li.textContent += macros[meals[i][1]][meals[i][3]][0];
        li.textContent += " - Calories = ";
        li.textContent += findValue(macros[meals[i][1]], meals[i][2], 'calories') + findValue(macros[meals[i][1]], meals[i][3], 'calories');
        li.textContent += ", Protein = ";
        li.textContent += findValue(macros[meals[i][1]], meals[i][2], 'protein') + findValue(macros[meals[i][1]], meals[i][3], 'protein');

        if (counter[meals[i][1]] === undefined) {
            counter[meals[i][1]] = 1;
            ul.appendChild(li);
        } else if (counter[meals[i][1]] < 2) {
            counter[meals[i][1]]++;
            ul.appendChild(li);
        }
    }

    let shuffled = shuffleArray(Array.from(ul.children));
    ul.innerHTML = "";
    shuffled.forEach(li => ul.appendChild(li));
}
*/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getMeals2Items(macros, period) {
    let lambda;
    if (period === "breakfast") lambda = 0.35;
    else if (period === "lunch") lambda = 0.35;
    else lambda = 0.3;

    let meals = []; // [score, i, j]
    

    for (let key of Object.keys(macros)) {
        let loc_macros = macros[key];
        // loop thru all pairs of items
        for (let i = 1; i < loc_macros.length; i++) {
            for(let j = i + 1; j < loc_macros.length; j++) {
                // TODO: filter lb
                let iCalories = findValue(loc_macros, i, "calories");
                let iProtein = findValue(loc_macros, i, "protein");
                let jCalories = findValue(loc_macros, j, "calories");
                let jProtein = findValue(loc_macros, j, "protein");

                let score = 2 * (iProtein + jProtein) - Math.abs(iCalories + jCalories - lambda * targetCalories);
                if (!Number.isNaN(score) && (iProtein + jProtein) >= lambda * (proteinRatio - 0.2) * weight && (iProtein + jProtein) <= lambda * (proteinRatio + 0.2) * weight) {
                    meals.push([score, key, i, j]);
                }
            }
        }
    }

    meals.sort((a, b) => b[0] - a[0]);
    console.log(meals);
    return meals;
}

function calculateCalories(weightLb, heightIn, age, sex, activityLevel) {
    // Convert to metric
    const weight = weightLb * 0.453592; // pounds → kg
    const height = heightIn * 2.54;     // inches → cm

    activityLevel = getActivityMultiplier(activityLevel)

    let BMR;

    if (sex === "male") {
        // Mifflin-St Jeor Equation for men
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (sex === "female") {
        // Mifflin-St Jeor Equation for women
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Total Energy Expenditure (TEE)
    return Math.round(BMR * activityLevel);
}

function getActivityMultiplier(index) {
    const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];

    if (index < 0 || index > 4) {
        throw new Error("Index must be between 0 and 4");
    }

    return multipliers[index];
}

function getMealByTime() {
    const now = new Date();
    const hour = now.getHours(); // 0-23

    if (hour >= 5 && hour < 11) {
        return "breakfast";
    } else if (hour >= 11 && hour < 16) {
        return "lunch";
    } else {
        return "dinner";
    }
}

function getCurrentTimeFormatted() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12

    // Pad minutes with leading zero if needed
    const minutesStr = minutes.toString().padStart(2, "0");

    return `${hours}:${minutesStr} ${ampm}`;
}

