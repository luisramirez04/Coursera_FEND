// Start the score at 0 to start the game.
var score = 0;

// Adding the score to the page.
var span = document.createElement('span');
span.id = 'score';
span.style.fontSize = '40pt';
span.style.font = "Times New Roman";
span.appendChild(document.createTextNode(score));
document.body.appendChild(span);


// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // This checks for collisions and if one is detected
  // the player gets reset to starting position,
  // the score gets reset. This also resets the
  // enemy position back to starting position once
  // the enemy gets off screen.
  this.x += (this.speed() * dt);
  if (this.x < player.x + 40 && this.x + 70 > player.x && this.y < player.y + 70 && this.y + 40 > player.y) {
    player.reset();
    score = 0;
    document.getElementById('score').innerHTML = score;
  } else if (this.x > 505) {
    this.x = -300;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Generates a random number to use as the speed of the
// enemies. Each enemy gets their own speed. Max is the
// fastest the enemy can move. Min is the slowest. This
// function chooses a random number between max and min.
Enemy.prototype.speed = function() {
  var max = 300;
  var min = 20;
  return Math.random() * (max - min) + min;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 202;
  this.y = 404;
  this.sprite = 'images/char-boy.png';
};

// Resets player to starting location and increments
// score if the player gets to the water area of the canvas.
Player.prototype.update = function() {
  if (this.y < 10) {
    this.reset();
    score++;
    document.getElementById('score').innerHTML = score;
  }
};

Player.prototype.render = Enemy.prototype.render;

// Moves the player in the direction of they key that is pressed.
// Checks whether the movement will send player off canvas before
// moving the player.
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
    if (this.x > 50) {
      this.x -= 101;
      break;
    } else break;

    case 'up':
    this.y -= 90;
    break;

    case 'right':
    if (this.x < 404) {
      this.x += 101;
      break;
    } else break;

    case 'down':
    if (this.y < 404) {
      this.y += 90;
      break;
    } else break;
  }
};

// Resets the player back to the starting position.
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 404;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 50);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-300, 230);
var enemy4 = new Enemy(-400, 50);
var enemy5 = new Enemy(-500, 140);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
