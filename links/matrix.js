
document.addEventListener('DOMContentLoaded', function () {
    // Initialising the canvas
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß0123456789!%&|<>=,;.:-_+*~#^°@€🥺';
    letters = letters.split('');

    // Setting up the columns
    var fontSize = 18,
        columns = canvas.width / fontSize;

    // Setting up the drops
    var drops = [];
    for (var i = 0; i < columns; i++) {
        // start above screen -100% to 0%
        drops[i] = (Math.random() - 1.0) * canvas.height / fontSize;
    }

    // Setting up the draw function
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drops.length; i++) {
            var text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillStyle = '#90c';//'#c0f';
            ctx.font = "" + fontSize + "px monospace";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
                drops[i] = 0;
            }
        }
    }

    // Loop the animation
    var refreshIntervalId = setInterval(draw, 50);
    var lastWidth = window.innerWidth;
    addEventListener("resize", (event) => {

        // prevent resize on mobile (scroll hides/shows bar) from firing the reset
        const currentWidth = window.innerWidth;
        if (currentWidth !== lastWidth) {
            lastWidth = currentWidth;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drops = [];
            for (var i = 0; i < columns; i++) {
                // start above screen -100% to 0%
                drops[i] = (Math.random() - 1.0) * canvas.height / fontSize;
            }
            clearInterval(refreshIntervalId);
            // Loop the animation
            refreshIntervalId = setInterval(draw, 50);
        }
    });
});
