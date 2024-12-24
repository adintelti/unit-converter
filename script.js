const translations = {
    en: {
        header: "Unit Converter",
        lengthTab: "Length",
        weightTab: "Weight",
        temperatureTab: "Temperature",
        valueLabel: "Value",
        invalidValueMessage: "Value informed is either empty or invalid, inform a valid one.",
        fromUnitLabel: "From Unit",
        toUnitLabel: "To Unit",
        convertButton: "Convert",
        lengthUnits: [ {value: "Meters", text: "Meters"}, {value: "Kilometers", text: "Kilometers"}, {value: "Feet", text: "Feet"}, {value: "Miles", text: "Miles"} ],
        weightUnits: [ {value: "Grams", text: "Grams"}, {value: "Kilograms", text: "Kilograms"}, {value: "Pounds", text: "Pounds"}, {value: "Ounces", text: "Ounces"} ],
        conversionMessage: `Converted {0}: {1} {2} in {3} is {4} {3}`
    },
    pt: {
        header: "Conversor de Unidades",
        lengthTab: "Comprimento",
        weightTab: "Peso",
        temperatureTab: "Temperatura",
        valueLabel: "Valor",
        invalidValueMessage: "O valor informado é vazio ou inválido, informe um valor válido.",
        fromUnitLabel: "Da Unidade",
        toUnitLabel: "Para Unidade",
        convertButton: "Converter",
        lengthUnits: [ {value: "Meters", text: "Metros"}, {value: "Kilometers", text: "Kilometros"}, {value: "Feet", text: "Pés"}, {value: "Miles", text: "Milhas"} ],
        weightUnits: [ {value: "Grams", text: "Gramas"}, {value: "Kilograms", text: "Kilogramas"}, {value: "Pounds", text: "Libras"}, {value: "Ounces", text: "Onças"} ],
        conversionMessage: `Conversão de {0}: {1} {2} em {3} é {4} {3}`
    }
};

function formatString(template, ...values) {
    return template.replace(/{(\d+)}/g, (match, index) => values[index] || "");
}

let currentLanguage = "en";
let selectedLenghtFromUnitValue = "";
let selectedLenghtToUnitValue = "";
let selectedWeigthFromUnitValue = "";
let selectedWeigthToUnitValue = "";

// Set default language
applyTranslations(currentLanguage);

function applyTranslations(language) {
    document.getElementById("header").textContent = translations[language].header;
    document.getElementById("length-tab").textContent = translations[language].lengthTab;
    document.getElementById("weight-tab").textContent = translations[language].weightTab;
    document.getElementById("temperature-tab").textContent = translations[language].temperatureTab;
    document.getElementById("length-value-label").textContent = translations[language].valueLabel;
    document.getElementById("weight-value-label").textContent = translations[language].valueLabel;
    document.getElementById("temp-value-label").textContent = translations[language].valueLabel;
    document.getElementById("length-fromUnit-label").textContent = translations[language].fromUnitLabel;
    document.getElementById("weight-fromUnit-label").textContent = translations[language].fromUnitLabel;
    document.getElementById("temp-fromUnit-label").textContent = translations[language].fromUnitLabel;
    document.getElementById("length-toUnit-label").textContent = translations[language].toUnitLabel;
    document.getElementById("weight-toUnit-label").textContent = translations[language].toUnitLabel;
    document.getElementById("temp-toUnit-label").textContent = translations[language].toUnitLabel;
    document.getElementById("length-convert-btn").textContent = translations[language].convertButton;
    document.getElementById("weight-convert-btn").textContent = translations[language].convertButton;
    document.getElementById("temp-convert-btn").textContent = translations[language].convertButton;
    currentLanguage = language;

    createDropdownOptions("lengthFrom", translations[language].lengthUnits, selectedLenghtFromUnitValue);
    createDropdownOptions("lengthTo", translations[language].lengthUnits, selectedLenghtToUnitValue); 
    createDropdownOptions("weightFrom", translations[language].weightUnits, selectedWeigthFromUnitValue);
    createDropdownOptions("weightTo", translations[language].weightUnits, selectedWeigthToUnitValue); 

    let lengthResultElement = document.getElementById("lengthResult");
    if(lengthResultElement.style.display == "block")
    {
        if(!isValueValid(document.getElementById("lengthValue").value))
            lengthResultElement.textContent = translations[language].invalidValueMessage;
        else
            convertLength();
    }

    let weightResultElement = document.getElementById("weightResult");
    if(weightResultElement.style.display == "block")
    {
        if(!isValueValid(document.getElementById("weightValue").value))
            weightResultElement.textContent = translations[language].invalidValueMessage;
        else
            convertWeight();
    }

    let temperatureResultElement = document.getElementById("temperatureResult");
    if(temperatureResultElement.style.display == "block")
    {
        if(!isValueValid(document.getElementById("tempValue").value))
            temperatureResultElement.textContent = translations[language].invalidValueMessage;
        else
            convertTemperature();   
    }
}

document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener("change", (event) => {
        applyTranslations(event.target.value);
    });
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(tab.dataset.target).classList.remove('hidden');
    });
});

function createDropdownOptions(elementId, itemList, selectedValue)
{
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = "";

    itemList.forEach((obj) => {
        const option = document.createElement("option");
        option.value = obj.value;
        option.text = obj.text;
        if(selectedValue == obj.value)
            option.selected = true;
        dropdown.add(option);
    });
}

function isValueValid(value) {
    return value.toString().length > 0 && !isNaN(value);
}

function convertLength() {
    const value = parseFloat(document.getElementById('lengthValue').value);
    const fromUnit = document.getElementById('lengthFrom');
    const toUnit = document.getElementById('lengthTo');
    const resultElement = document.getElementById('lengthResult');
    resultElement.style.display = 'block';
    resultElement.style.color = 'black';

    if(!isValueValid(value))
    {
        resultElement.style.color = 'red';
        resultElement.textContent = translations[currentLanguage].invalidValueMessage;
        return;
    }

    //so length ddl's wont loose their selected values
    selectedLenghtToUnitValue = fromUnit.value;
    selectedLenghtToUnitValue = toUnit.value;

    let convertedValue = convertLength2(value, fromUnit.value.toLowerCase(), toUnit.value.toLowerCase());
    let text = formatString(translations[currentLanguage].conversionMessage, translations[currentLanguage].lengthTab, value, fromUnit.options[fromUnit.selectedIndex].text, toUnit.options[toUnit.selectedIndex].text, convertedValue);
    resultElement.textContent = text;
}

function convertWeight() {
    const value = parseFloat(document.getElementById('weightValue').value);
    const fromUnit = document.getElementById('weightFrom');
    const toUnit = document.getElementById('weightTo');
    const resultElement = document.getElementById('weightResult');
    resultElement.style.display = 'block';
    resultElement.style.color = 'black';

    if(!isValueValid(value))
    {
        resultElement.style.color = 'red';
        resultElement.textContent = translations[currentLanguage].invalidValueMessage;
        return;
    }

    //so length ddl's wont loose their selected values
    selectedWeigthToUnitValue = fromUnit.value;
    selectedWeigthToUnitValue = toUnit.value;

    let convertedValue = convertWeight2(value, fromUnit.value.toLowerCase(), toUnit.value.toLowerCase());
    let text = formatString(translations[currentLanguage].conversionMessage, translations[currentLanguage].weightTab, value, fromUnit.options[fromUnit.selectedIndex].text, toUnit.options[toUnit.selectedIndex].text, convertedValue);
    resultElement.textContent = text;
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('tempValue').value);
    const fromUnit = document.getElementById('tempFrom').value.toLowerCase();
    const toUnit = document.getElementById('tempTo').value.toLowerCase();
    const resultElement = document.getElementById('temperatureResult');
    resultElement.style.display = 'block';
    resultElement.style.color = 'black';

    if(!isValueValid(value))
    {
        resultElement.style.color = 'red';
        resultElement.textContent = translations[currentLanguage].invalidValueMessage;
        return;
    }

    let convertedValue = convertTemperature2(value, fromUnit, toUnit);
    let text = formatString(translations[currentLanguage].conversionMessage, translations[currentLanguage].temperatureTab, value, fromUnit, toUnit, convertedValue);
    resultElement.textContent = text;
}

function convertLength2(value, fromUnit, toUnit) {
    const lengthUnits = {
        'meters': 1,
        'kilometers': 0.001,
        'feet': 3.28084,
        'miles': 0.000621371
    };
    const valueInMeters = value / lengthUnits[fromUnit];
    return valueInMeters * lengthUnits[toUnit];
}

function convertWeight2(value, fromUnit, toUnit) {
    const weightUnits = {
        'grams': 1,
        'kilograms': 0.001,
        'pounds': 0.00220462,
        'ounces': 0.035274
    };
    const valueInGrams = value / weightUnits[fromUnit];
    return valueInGrams * weightUnits[toUnit];
}

function convertTemperature2(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    let celsiusValue;
    if (fromUnit === 'celsius') {
        celsiusValue = value;
    } else if (fromUnit === 'fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    } else if (fromUnit === 'kelvin') {
        celsiusValue = value - 273.15;
    }

    if (toUnit === 'celsius') return celsiusValue;
    if (toUnit === 'fahrenheit') return celsiusValue * 9 / 5 + 32;
    if (toUnit === 'kelvin') return celsiusValue + 273.15;
}