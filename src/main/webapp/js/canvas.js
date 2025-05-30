const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const Xcanvas = canvas.width;
const Ycanvas = canvas.height;
let R = null;

function clearCanvas() {
    ctx.clearRect(0, 0, Xcanvas, Ycanvas);
}

function drawGrid() {
    const gridSpacing = Xcanvas / 10;
    ctx.strokeStyle = '#e0e0e0';
    ctx.beginPath();
    for (let x = 0; x <= Xcanvas; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Ycanvas);
    }
    for (let y = 0; y <= Ycanvas; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(Xcanvas, y);
    }
    ctx.stroke();
}

function drawAxes() {
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(Xcanvas / 2, 0);
    ctx.lineTo(Xcanvas / 2, Ycanvas);
    ctx.moveTo(0, Ycanvas / 2);
    ctx.lineTo(Xcanvas, Ycanvas / 2);
    ctx.stroke();
}

function drawShapes() {
    const scale = (Xcanvas / 2) * (R / 5);
    ctx.fillStyle = '#5f9ea0';

    ctx.beginPath();
    ctx.moveTo(Xcanvas / 2, Ycanvas / 2);
    ctx.arc(Xcanvas / 2, Ycanvas / 2, scale /2, Math.PI, -Math.PI / 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(Xcanvas / 2, Ycanvas / 2, -scale / 2, scale);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(Xcanvas / 2, Ycanvas / 2);
    ctx.lineTo(Xcanvas / 2 + scale, Ycanvas / 2);
    ctx.lineTo(Xcanvas / 2, Ycanvas / 2 - scale / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawLabels() {
    const scale = (Xcanvas / 2) * (R / 5);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';

    ctx.fillText('-R', Xcanvas / 2 - scale, Ycanvas / 2 + 20);
    ctx.fillText('-R/2', Xcanvas / 2 - scale / 2, Ycanvas / 2 + 20);
    ctx.fillText('R/2', Xcanvas / 2 + scale / 2, Ycanvas / 2 + 20);
    ctx.fillText('R', Xcanvas / 2 + scale, Ycanvas / 2 + 20);

    ctx.fillText('R', Xcanvas / 2 - 20, Ycanvas / 2 - scale);
    ctx.fillText('R/2', Xcanvas / 2 - 20, Ycanvas / 2 - scale / 2);
    ctx.fillText('-R/2', Xcanvas / 2 - 20, Ycanvas / 2 + scale / 2);
    ctx.fillText('-R', Xcanvas / 2 - 20, Ycanvas / 2 + scale);
}

function drawGraph() {
    if (R === null) return;

    clearCanvas();
    drawGrid();
    drawAxes();
    drawShapes();
    drawLabels();
}


document.addEventListener("DOMContentLoaded", () => {
    const rSelectionElement = document.querySelector('.rSelection');
    R = Number(rSelectionElement.value);
    drawGraph();
});


document.querySelector('.rSelection').addEventListener('change', (event) => {
    R = Number(event.target.value);
    drawGraph();
});