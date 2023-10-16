function convert() {
    const value = parseFloat(document.getElementById("value").value);
    const unit_from = document.getElementById("unit_from").value;
    const unit_to = document.getElementById("unit_to").value;

    const conversion_factors = {
        "meters": 1,
        "feet": 0.3048,
        "inches": 0.0254,
        "centimeters": 0.01,
        "Kilometer":1000,
    };

    if (unit_from in conversion_factors && unit_to in conversion_factors) {
        const result = value * (conversion_factors[unit_from] / conversion_factors[unit_to]);
        document.getElementById("result").innerHTML = `${value} ${unit_from} is equal to ${result} ${unit_to}<br><br>`;
    } else {
        document.getElementById("result").innerHTML = "Invalid units. Please select valid units.<br><br>";
    }
}

const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", convert);
