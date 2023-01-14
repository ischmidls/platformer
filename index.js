// window attributes
let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;
// canvas attributes
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
context.canvas.height = viewportHeight;
context.canvas.width = viewportWidth;
// The attributes of the player.
const player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 20,
    width: 20
    };
// The status of the arrow keys
let keys = {
    right: false,
    left: false,
    up: false,
    };
// The friction and gravity to show realistic movements
const gravity = 0.6;
const friction = 0.7;
// The number of platforms
const numberPlatforms = 2;
// The platforms
let platforms = [];

// general render function
function renderRect(
    color = "black",
    x = 0,
    y = 0,
    width = 0,
    height = 0
    ) {
    context.fillStyle = color;
    context.fillRect(
        x = x,
        y = y,
        width = width,
        height = height
        );
}

// Function to render platforms
function renderPlatforms(platforms) {
    for ( let index = 0; index < platforms.length; index++) {
        renderRect(
            color = "#45597E",
            x = platforms[index].x,
            y = platforms[index].y,
            width = platforms[index].width,
            height = platforms[index].height
            )
    }
};

// Function to create platforms
function placePlat() {
    for(i = 0; i < numberPlatforms; i++) {
        platforms.push(
            {
            x: 100 * i,
            y: 200 + (30 * i),
            width: 110,
            height: 15
            }
        );
    }
};

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(player.jump == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
};

// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
};

function loop() {
    // If the player is not jumping apply the effect of frictiom
    if(player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        player.x_v = -2.5;
    }
    if(keys.right) {
        player.x_v = 2.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
    platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
        i = 0;
    }
    if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
    platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
        i = 1;
    }
    if (i > -1){
        player.jump = false;
        player.y = platforms[i].y;    
    }
    // Rendering the canvas, 
    renderRect(
        color = "black",
        x = 0,
        y = 0,
        width = viewportWidth,
        height = viewportHeight
        );
    // the player 
     renderRect(
        color = "white",
        x = (player.x)-20,
        y = (player.y)-20,
        width = player.width,
        height = player.height
        );
    // and the platforms
     renderPlatforms(platforms);
};

placePlat()

// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);