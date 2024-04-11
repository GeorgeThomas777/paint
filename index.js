document.addEventListener('DOMContentLoaded', function() {
    const drawingCanvas = document.getElementById('main');
    const drawingContext = drawingCanvas.getContext('2d');
    let isPainting = false;
    let brushThickness = 5;
    let currentColor = '#000000'; // Default color is black

    function startDrawing(e) {
        isPainting = true;
        drawLine(e);
    }

    function finishDrawing() {
        isPainting = false;
        drawingContext.beginPath();
    }

    function drawLine(e) {
        if (!isPainting) return;

        drawingContext.lineWidth = brushThickness;
        drawingContext.lineCap = 'round';
        drawingContext.strokeStyle = currentColor;

        drawingContext.lineTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
        drawingContext.stroke();
        drawingContext.beginPath();
        drawingContext.moveTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
    }

    // Event Listeners for drawing
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mouseup', finishDrawing);
    drawingCanvas.addEventListener('mousemove', drawLine);

    // Color buttons
    document.querySelectorAll('.btn-action').forEach(button => {
        button.addEventListener('click', function() {
            currentColor = window.getComputedStyle(button, null).getPropertyValue('background-color');
            drawingContext.beginPath(); // Reset the path so color doesn't drag if switching mid-draw
        });
    });

    // Erase button
    document.getElementById('erase').addEventListener('click', function() {
        currentColor = '#FFFFFF'; // Change color to white for erasing
    });

    // New canvas
    document.getElementById('new').addEventListener('click', function() {
        drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    });

    // Brush size slider
    const sizeSlider = document.getElementById('slider');
    const brushSizeDisplay = document.getElementById('brushSize');
    sizeSlider.value = brushThickness; // Default brush size
    brushSizeDisplay.textContent = brushThickness;

    sizeSlider.addEventListener('input', function() {
        brushThickness = this.value;
        brushSizeDisplay.textContent = brushThickness;
    });
});
