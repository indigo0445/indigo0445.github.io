let mdata = {
    "ABP": {
        "name": "Au Bon Pain at Skibo Café",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/abp_menu_macros.csv",
    },
    "REV": {
        "name": "Revolution Noodle",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Revolution_Noodle___Prebuilt_Nutrition_Estimates.csv",
    },
    "GALLO": {
        "name": "El Gallo De Oro",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/El_Gallo___Entr_es_x_Protein_Nutrition_Estimates.csv",    
    },
    "EAT": {
        "name": "E.A.T. (Evenings At Tepper)",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Evenings_at_Tepper_nutrition_estimates.csv",
    },
    "EXCHANGE": {
        "name": "The Exchange",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Exchange_Menu___Breakfast__Sandwiches__Specialty_Sandwiches__and_Salads.csv",
    },
    "HUNAN": {
        "name": "Hunan Express",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Hunan_Visix___Nutrition_Estimates.csv",
    },
    "TAHINI": {
        "name": "Tahini",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Mediterranean_prebuilt_nutrition_estimates.csv",
    },
    "NOURISH": {
        "name": "Nourish",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Nourish___Prebuilt_Nutrition_Estimates.csv",
    },
    "OLAOLA": {
        "name": "Ola Ola",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Ola_Ola___Prebuilt_Nutrition_Estimates.csv",
    },
    "CIAO": {
        "name": "Ciao Bella",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Premade_Pasta_Nutrition_with_Saturated_Fat.csv",
    },
    "SCOTTYS": {
        "name": "Scotty's Market",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Salem_s___Combined_Nutrition_Estimates.csv",
    },
    "SHAKESMART": {
        "name": "Shake Smart",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Shake_Smart___Shakes___Acai_Bowls_Nutrition_Estimates.csv",
    },
    "STACKD": {
        "name": "Stack'd Underground",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Stackd_prebuilt_nutrition_estimates.csv",
    },
    "FOODTRUCK": {
        "name": "Tartan Express Food Truck",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Tartan_Express___Full_Combo_Nutrition_Estimates.csv",
    },
    "TAQUERIA": {
        "name": "Tepper Taqueria",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Tepper_Taqueria___Full_Nutrition_Estimates.csv",
    },
    "SUSHI": {
        "name": "Wild Blue Sushi",
        "url": "https://raw.githubusercontent.com/azhou22/HackCMU/refs/heads/main/Wild_Blue_premades_and_drinks_estimates.csv",
    }
};

function fetchData() {
    const promises = Object.keys(mdata).map(key => 
        fetch(mdata[key]["url"])
        .then(response => response.text())
        .then(text => {
            // split into rows and columns
            return [key, text.trim().split("\n").map(row => row.split(","))];
        })
    );

    return Promise.all(promises).then(Object.fromEntries);
}

function findValue(loc_macros, row, colName) {
    // 'protein' is fine for colName
    // BUGGY: does not properly match
    let headerRow = loc_macros[0];
    let regex = new RegExp(colName, 'i');
    let colIndex = headerRow.findIndex(header => regex.test(header));
    return parseInt(loc_macros[row][colIndex]);
}
