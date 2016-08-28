var game = new Phaser.Game(216, 384, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var speed = 2;
var player;
var fallplayerleft;
var fallplayerright;
var back;
var pipe;
var piper;
var pipes;
var pipers;
var points = 0;
var glitches1;
var glitch1;
var glitches2;
var glitch2;
var scullsG;
var sculls;
var stonesG;
var stones;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemies1;
var enemies2;
var enemies3;
var flag = 1;
var gems;
var gem;
var dead = 0;
var textgo;
var t = 1;
var music;
var collide;
var coin;
var restart;

var style = { font: "bold 12px Arial", fill: "#fff" };
var stylego = { font: "16px Arial", fill: "#fff", align: "center" };

function preload() {

  //Sounds
  game.load.audio('collide', 'res/collide.wav');
  game.load.audio('coin', 'res/coin.wav');
  game.load.audio('restart', 'res/restart.wav');
  game.load.audio('music', 'res/music.mp3');

  game.load.image('playerright', 'res/fallplayer_right.png');
  game.load.image('playerleft', 'res/fallplayer_left.png');
  game.load.image('back', 'res/back2.png');
  game.load.image('pipe', 'res/pipe.png');
  game.load.image('piper', 'res/piper.png');
  game.load.image('gem', 'res/gem.png');

  //Environment
  game.load.image('glitch1', 'res/glitch1.png');
  game.load.image('glitch2', 'res/glitch2.png');
  game.load.image('stones', 'res/stones.png');
  game.load.image('sculls', 'res/sculls.png');

  //Enemies
  game.load.image('enemy1', 'res/enemy1.png');
  game.load.image('enemy2', 'res/enemy2.png');
  game.load.image('enemy3', 'res/enemy3.png');
  game.load.image('enemy4', 'res/enemy4.png');

}

function create() {

  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.scale.setUserScale(2, 2);

  game.renderer.renderSession.roundPixels = true;
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

  //Sounds
  collide = game.add.audio('collide');
  coin = game.add.audio('coin');
  restart = game.add.audio('restart');
  music = game.add.audio('music', 1, true);
  music.play();

  back = game.add.tileSprite(0, 0, 216, 384, 'back');

  player = game.add.sprite(100, 85, 'playerright');
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  //Generate Gems
  gems = game.add.group();
  gems.enableBody = true;
  gems.physicsBodyType = Phaser.Physics.ARCADE;

  gem = gems.create(120, 300, 'gem');
  gem.body.velocity.y = 0;

  //Left pipe
  pipes = game.add.group();
  pipes.enableBody = true;
  pipes.physicsBodyType = Phaser.Physics.ARCADE;

  pipe = pipes.create(0, 450, 'pipe');
  pipe.body.velocity.y = 0;

  //Right pipe
  pipers = game.add.group();
  pipers.enableBody = true;
  pipers.physicsBodyType = Phaser.Physics.ARCADE;

  piper = pipers.create(130, 600, 'piper');
  piper.body.velocity.y = 0;

  //Genetare Environment
  glitches1 = game.add.group();
  glitches1.enableBody = true;
  glitches1.physicsBodyType = Phaser.Physics.ARCADE;
  glitch1 = glitches1.create(100, 100, 'glitch1');

  glitches2 = game.add.group();
  glitches2.enableBody = true;
  glitches2.physicsBodyType = Phaser.Physics.ARCADE;
  glitch2 = glitches2.create(70, 700, 'glitch2');

  stonesG = game.add.group();
  stonesG.enableBody = true;
  stonesG.physicsBodyType = Phaser.Physics.ARCADE;
  stones = stonesG.create(60, 170, 'stones');

  scullsG = game.add.group();
  scullsG.enableBody = true;
  scullsG.physicsBodyType = Phaser.Physics.ARCADE;
  sculls = scullsG.create(140, 300, 'sculls');


  //Generate Enemies
  //Enemy 1
  enemies1 = game.add.group();
  enemies1.enableBody = true;
  enemies1.physicsBodyType = Phaser.Physics.ARCADE;

  enemy1 = enemies1.create(100, 1000, 'enemy1');
  enemy1.body.velocity.y = -100;

  //Enemy 2
  enemies2 = game.add.group();
  enemies2.enableBody = true;
  enemies2.physicsBodyType = Phaser.Physics.ARCADE;

  enemy2 = enemies1.create(100, 2000, 'enemy2');
  enemy2.body.velocity.y = -150;

  //Enemy 3
  enemies3 = game.add.group();
  enemies3.enableBody = true;
  enemies3.physicsBodyType = Phaser.Physics.ARCADE;

  enemy3 = enemies1.create(100, 1500, 'enemy3');
  enemy3.body.velocity.y = -100;

  //Text render
  text = game.add.text(100, 5, points, style);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

  //Timers
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (8 - 4)) + 4), 9000, createPipe, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (10 - 6)) + 6), 9000, createPiper, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (8 - 4)) + 4), 9000, createGlitch1, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (15 - 8)) + 8), 9000, createGlitch2, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (6 - 3)) + 3), 9000, createSculls, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (5 - 2)) + 2), 9000, createStones, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (4 - 3)) + 3), 9000, createEnemy1, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (8 - 4)) + 4), 9000, createEnemy2, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (12 - 8)) + 8), 9000, createEnemy3, this);
  game.time.events.repeat(Phaser.Timer.SECOND * ((Math.random() * (8 - 4)) + 4), 9000, createGems, this);
  game.time.events.repeat(Phaser.Timer.SECOND, 100, scoreIncrement, this);

}

function update() {

  if ((dead == 1) && (t == 1)) {
    textgo = game.add.text(35, 100, points, stylego);
    textgo.setShadow(1, 1, 'rgba(0,0,0,0.5)', 1);
    textgo.setText('Game Over\n\nYour score: ' + points + '\n\nPress "R" to restart');
    t = 0;
  }

  if ((dead == 1) && (game.input.keyboard.isDown(Phaser.Keyboard.R))) {
    dead = 0;
    t = 1;
    points = 0;
    music.stop();
    restart.play();
    game.state.restart();
  }

  back.tilePosition.y -= 3;

  if (pipe.alive) {
    pipe.y -= 3;
  }

  if (piper.alive) {
    piper.y -= 3;
  }

  glitch1.y -= 3;
  glitch2.y -= 3;
  stones.y -= 3;
  sculls.y -= 3;
  gem.y -= 3;

  enemy1.y -= 3;

  //Enemy 2 Movement
  enemy2.y -= 3;
  if (enemy2.x == 196) {
    enemy2.x -= 2;
    flag = 1;
  }
  if (enemy2.x == 20) {
    enemy2.x += 2;
    flag = 0;
  }
  if (flag == 1) {
    enemy2.x -= 2;
  }
  if (flag == 0) {
    enemy2.x += 2;
  }

  //Enemy 3 Movement
  enemy3.y -= 3;
  enemy3.x = 30 + Math.abs(Math.sin(enemy3.y)) * 200;

  //Controls
  if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) && (dead == 0))
  {
    player.destroy();
    player = game.add.sprite(player.x, player.y, 'playerleft');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.x -= speed;
  }
  if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (dead == 0))
  {
    player.destroy();
    player = game.add.sprite(player.x, player.y, 'playerright');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.x += speed;
  }
  if (player.x <= 20)
  {
    player.x = 22;
  }
  if (player.x >= 196)
  {
    player.x = 194;
  }

  //Check collision
  game.physics.arcade.overlap(player, pipe, collisionHandler, null, this);
  game.physics.arcade.overlap(player, piper, collisionHandler, null, this);
  game.physics.arcade.overlap(player, enemy1, collisionEnemies1, null, this);
  game.physics.arcade.overlap(player, enemy2, collisionEnemies2, null, this);
  game.physics.arcade.overlap(player, enemy3, collisionEnemies3, null, this);

  game.physics.arcade.overlap(player, gem, collectGem, null, this);

  if (pipe.y == -50) {
    pipe.kill();
    pipe.destroy();
  }

  if (piper.y == -50) {
    piper.kill();
    piper.destroy();
  }

  if (glitch1.y == -50) {
    glitch1.kill();
    glitch1.destroy();
  }

  if (glitch2.y == -100) {
    glitch2.kill();
    glitch2.destroy();
  }
}

function collectGem(player, gem) {
  gem.kill();
  points = points + 10;
  text.setText(points);
  coin.play();
}

function collisionHandler(player, pipe) {
  player.kill();
  dead = 1;
  player.destroy();
  game.camera.shake(0.05, 500);
  collide.play();
}

function collisionEnemies1(player, enemy1) {
  player.kill();
  dead = 1;
  player.destroy();
  enemy1.kill();
  game.camera.shake(0.05, 500);
  collide.play();
}

function collisionEnemies2(player, enemy2) {
  player.kill();
  dead = 1;
  player.destroy();
  enemy2.kill();
  game.camera.shake(0.05, 500);
  collide.play();
}

function collisionEnemies3(player, enemy3) {
  player.kill();
  dead = 1;
  player.destroy();
  enemy3.kill();
  game.camera.shake(0.05, 500);
  collide.play();
}

function createPipe() {
  pipe = pipes.create(0, 400, 'pipe');
  pipe.body.velocity.y = 0;
}

function createPiper() {
  piper = pipes.create(130, 400, 'piper');
  piper.body.velocity.y = 0;
}

function createGlitch1() {
  glitch1 = glitches1.create((Math.random() * (160 - 40)) + 40, 400, 'glitch1');
  glitch1.body.velocity.y = 0;
}

function createGlitch2() {
  glitch2 = glitches2.create((Math.random() * (160 - 40)) + 40, 400, 'glitch2');
  glitch2.body.velocity.y = 0;
}

function createSculls() {
  sculls = scullsG.create((Math.random() * (160 - 40)) + 40, 400, 'sculls');
  sculls.body.velocity.y = 0;
}

function createStones() {
  stones = stonesG.create((Math.random() * (160 - 40)) + 40, 400, 'stones');
  stones.body.velocity.y = 0;
}

function createGems() {
  gem = stonesG.create((Math.random() * (160 - 40)) + 40, 400, 'gem');
  gem.body.velocity.y = 0;
}

function createEnemy1() {
  enemy1 = enemies1.create((Math.random() * (160 - 40)) + 40, 400, 'enemy1');
  enemy1.body.velocity.y = -100;
}

function createEnemy2() {
  enemy2 = enemies2.create((Math.random() * (160 - 40)) + 40, 400, 'enemy2');
  enemy2.body.velocity.y = -100;
  flag = Math.floor(Math.random());
}

function createEnemy3() {
  enemy3 = enemies3.create((Math.random() * (160 - 40)) + 40, 400, 'enemy3');
  enemy3.body.velocity.y = -100;
}

function scoreIncrement() {
  if (dead == 0) {
    points++;
    text.setText(points);
  }
}
