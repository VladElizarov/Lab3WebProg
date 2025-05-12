document.querySelector(".xSelection").addEventListener("input", function (e) {
    let value = e.target.value;

    if (!/^-?\d*\.?\d{0,10}$/.test(value)) {
        e.target.value = value.slice(0, -1);
    }
});

document.querySelectorAll('.ySelection input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        isGraphClick = false; // Сбрасываем флаг графика
        document.querySelectorAll('.ySelection input[type="checkbox"]').forEach((box) => {
            if (box !== this) box.checked = false;
        });
    });
});

let isGraphClick = false;

canvas.addEventListener('click', function (event) {
    event.preventDefault();

    isGraphClick = true;

    const rHTML = document.querySelector('.rSelection');
    const selectedValue = rHTML ? rHTML.value : null;

    if (!selectedValue || isNaN(parseFloat(selectedValue))) {
        showMessage("Выберите радиус!", false);
        return;
    }

    const rValue = parseFloat(selectedValue);
    const rect = canvas.getBoundingClientRect();
    const xClick = event.clientX - rect.left;
    const yClick = event.clientY - rect.top;

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;
    const scale = canvasCenterX / 5;

    // Вычисляем X и Y
    const xValue = (xClick - canvasCenterX) / scale;
    const yValue = -(yClick - canvasCenterY) / scale;

    console.log(`Координаты клика: X: ${xValue.toFixed(2)}, Y: ${yValue.toFixed(2)}, R: ${rValue}`);

    if (!validateAndShowMessage(xValue, yValue, rValue)) {
        return;
    }

    const status = isHit(xValue, yValue, rValue);

    const graphXField = document.getElementById('graph-form:graph-x');
    const graphYField = document.getElementById('graph-form:graph-y');
    const graphRField = document.getElementById('graph-form:graph-r');

    if (graphXField && graphYField && graphRField) {
        graphXField.value = xValue.toFixed(2);
        graphYField.value = yValue.toFixed(2);
        graphRField.value = rValue.toFixed(2);
        drawPoint(xValue, yValue, rValue, status);
    } else {
        console.error("Не найдены скрытые поля формы!");
        return;
    }

    // Отправляем форму скрытой формы
    const graphButton = document.getElementById('graph-form:graph-button');
    if (graphButton) {
        graphButton.click();
    } else {
        console.error("Кнопка отправки формы не найдена!");
    }
});

document.querySelector('.submitButton').addEventListener('click', function (event) {
    event.preventDefault();

    const xValue = parseFloat(document.querySelector('.xSelection').value);
    const yCheckbox = document.querySelector('.ySelection input[type="checkbox"]:checked');
    const rValue = parseFloat(document.querySelector('.rSelection').value);

    if (!yCheckbox) {
        showMessage("Выберите значение Y!", false);
        return;
    }

    const yValue = parseFloat(yCheckbox.labels[0]?.textContent.trim() || NaN);

    if (validateAndShowMessage(xValue, yValue, rValue)) {
        processButtons(xValue, yValue, rValue);
    }
});
function checkY(value) {
    return (-5 <= value && value <= 3);
}

function checkR(value) {
    return [1, 1.5, 2, 2.5, 3].includes(parseFloat(value));
}

function checkX(value) {
    return (value > -5 && value < 5);
}

function drawPoint(xValue, yValue, rValue, status) {
    const canvas = document.getElementById('pointsCanvas');
    const ctx = canvas.getContext('2d');

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;
    const scale = canvasCenterX / 5;

    const plotX = canvasCenterX + xValue * scale;
    const plotY = canvasCenterY - yValue * scale;

    ctx.beginPath();
    ctx.arc(plotX, plotY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = status ? 'green' : 'red';
    ctx.fill();
    ctx.closePath();
}
function processButtons(xValue, yValue, rValue) {
    console.log("Обработка данных... X:", xValue, "Y:", yValue, "R:", rValue);

    setTimeout(() => {
        const status = isHit(xValue, yValue, rValue);
        drawPoint(xValue, yValue, rValue, status);
    }, 1000);
}
function isHit(x, y, r) {
    return (
        (x <= 0 && y <= 0 && y >= -r && x >= -r / 2) || // Прямоугольник
        (x  >= 0 && y  >= 0 && y <= -0.5 * x + r /2) ||  // Треугольник
        (x <= 0 && y >= 0 && x * x + y * y <= (r / 2) * (r / 2)) // Сектор (четверть круга)
    );
}

function redrawPoints() {
    console.log(document.querySelectorAll('.tableContainer table tbody tr'));

    const rElement = document.querySelector('.rSelection');
    if (!rElement) {
        console.error('Элемент с id mainForm:rSelection не найден!');
        return;
    }

    const rValue = parseFloat(rElement.value); // Текущее значение R
    if (isNaN(rValue)) {
        console.error('Некорректное значение R:', rValue);
        return;
    }

    const rows = document.querySelectorAll('.tableContainer table tbody tr');
    const canvas = document.getElementById('pointsCanvas');
    const ctx = canvas.getContext('2d');

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rows.forEach(row => {
        const x = parseFloat(row.cells[0].innerText.trim());
        const y = parseFloat(row.cells[1].innerText.trim());
        const status = isHit(x, y, rValue);

        console.log(`Перерисовка точки: X=${x}, Y=${y}, R=${rValue}, Попадание=${status}`);
        drawPoint(x, y, rValue, status);
    });
}



document.querySelector('.rSelection').addEventListener('input', function () {
    setTimeout(() => {
        redrawPoints();
    }, 100);
});

const validationMessage = document.getElementById("validationMessage");

function showMessage(text, isValid) {
    validationMessage.textContent = text;
    validationMessage.style.backgroundColor = isValid ? "green" : "red";
    validationMessage.style.color = "white";
    validationMessage.style.display = "block";
}

function validateAndShowMessage(x, y, r) {
    if (isNaN(x) || isNaN(y) || isNaN(r)) {
        showMessage("Некорректные данные! Проверьте ввод.", false);
        return false;
    }

    if (checkX(x) && checkY(y) && checkR(r)) {
        showMessage("Все данные корректны!", true);
        return true;
    } else {
        let xString = checkX(x) ? "" : "|X| <= 5";
        let yString = checkY(y) ? "" : "-5 <= Y <= 3";
        let rString = checkR(r) ? "" : "R: 1, 1.5, 2, 2.5, 3";

        showMessage(`Ошибка! Проверьте значения: ${xString} ${yString} ${rString}`.trim(), false);
        return false;
    }
}

