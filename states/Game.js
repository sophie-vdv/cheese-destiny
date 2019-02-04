var Game = function (game) {
};

var player,
    bear,
    bear2,
    bear3,
    dead,
    ground,
    lifeSaves,
    platformsJump,
    collided,
    enemies,
    background,
    platforms,
    obstacles,
    timer,
    total = 0,
    cursors,
    stars,
    lifeIcon,
    bearHit,
    starsHit,
    deadHit,
    score = 0,
    life = 2,
    lifeHit,
    scoreText,
    lifeText;

Game.prototype = {

    preload: function () {
        this.optionCount = 1;
        game.load.image('background', 'assets/images/sky.png');
        game.load.image('ground', 'assets/images/ground.png');
        game.load.image('star', 'assets/images/star.png');
        game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        game.load.spritesheet('bear', 'assets/images/bear.png', 63, 65, 8);
        game.load.image('tileLeft', 'assets/images/tile-left.png');
        game.load.image('tileMiddle', 'assets/images/tile-middle.png');
        game.load.image('tileRight', 'assets/images/tile-right.png');
        game.load.image('diams', 'assets/images/diams.png');
        game.load.image('iceBox', 'assets/images/IceBox.png');
        game.load.image('lifeSave', 'assets/images/firstaid.png');
        game.load.image('life', 'assets/images/life.png');
        game.load.audio('bearSound', ['assets/bgm/NFF-bear-hit.wav']);
        game.load.audio('starsSound', ['assets/bgm/NFF-coin.wav']);
        game.load.audio('dead', ['assets/bgm/button-10.wav']);
        game.load.audio('lifeUp', ['assets/bgm/126422__cabeeno-rossley__level-up.wav']);
    },

    create: function () {
        this.stage.disableVisibilityChange = false;

        game.world.setBounds(0, 0, 2500, game.height);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bearHit = game.add.audio('bearSound');
        starsHit = game.add.audio('starsSound');
        deadHit = game.add.audio('dead');
        lifeHit = game.add.audio('lifeUp');

        background = game.add.tileSprite(0, 0, 2500, game.height, 'background');

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.height - 64, 'ground');
        ground.scale.setTo(game.width, 1);
        ground.body.immovable = true;

        var ledge = platforms.create(400, game.height - 250, 'tileLeft');
        ledge.body.immovable = true;

        var ledge = platforms.create(528, game.height - 250, 'tileMiddle');
        ledge.body.immovable = true;

        var ledge = platforms.create(656, game.height - 250, 'tileRight');
        ledge.body.immovable = true;

        var ledge = platforms.create(50, game.height - 400, 'tileLeft');
        ledge.body.immovable = true;

        var ledge = platforms.create(178, game.height - 400, 'tileRight');
        ledge.body.immovable = true;

        var ledge = platforms.create(1000, game.height - 450, 'tileLeft');
        ledge.body.immovable = true;

        var ledge = platforms.create(1128, game.height - 450, 'tileMiddle');
        ledge.body.immovable = true;

        var ledge = platforms.create(1256, game.height - 450, 'tileRight');
        ledge.body.immovable = true;

        var ledge = platforms.create(1500, game.height - 500, 'tileLeft');
        ledge.body.immovable = true;

        var ledge = platforms.create(1628, game.height - 500, 'tileMiddle');
        ledge.body.immovable = true;

        var ledge = platforms.create(1728, game.height - 500, 'tileRight');
        ledge.body.immovable = true;

        var ledge = platforms.create(1850, game.height - 350, 'tileLeft');
        ledge.body.immovable = true;

        var ledge = platforms.create(1928, game.height - 350, 'tileRight');
        ledge.body.immovable = true;

        platformsJump = game.add.group();
        platformsJump.enableBody = true;

        var iceBox = platformsJump.create(700, game.height - 450, 'iceBox');
        iceBox.body.immovable = true;

        var iceBox = platformsJump.create(250, game.height - 600, 'iceBox');
        iceBox.body.immovable = true;

        var iceBox = platformsJump.create(1200, game.height - 600, 'iceBox');
        iceBox.body.immovable = true;

        var iceBox = platformsJump.create(2000, game.height - 600, 'iceBox');
        iceBox.body.immovable = true;

        lifeSaves = game.add.group();
        lifeSaves.enableBody = true;

        var lifeSave = lifeSaves.create(740, game.height - 480, 'lifeSave');
        lifeSave.body.immovable = true;
        lifeSave.body.bounce.y = 0.2 + Math.random() * 0.2;

        var lifeSave = lifeSaves.create(290, game.height - 630, 'lifeSave');
        lifeSave.body.immovable = true;
        lifeSave.body.bounce.y = 0.2 + Math.random() * 0.2;

        var lifeSave = lifeSaves.create(1240, game.height - 630, 'lifeSave');
        lifeSave.body.immovable = true;
        lifeSave.body.bounce.y = 0.2 + Math.random() * 0.2;

        var lifeSave = lifeSaves.create(2040, game.height - 630, 'lifeSave');
        lifeSave.body.immovable = true;
        lifeSave.body.bounce.y = 0.2 + Math.random() * 0.2;

        obstacles = game.add.group();
        obstacles.enableBody = true;

        var obst = obstacles.create(800, game.height - 130, 'diams');
        obst.body.immovable = true;

        bear = game.add.sprite(800, game.world.height - 150, 'bear');
        bear.anchor.setTo(0.5, 0.5);
        game.physics.enable(bear, Phaser.Physics.ARCADE);
        bear.body.immovable = true;
        bear.body.collideWorldBounds = true;
        bear.body.allowGravity = false;

        bear.x = 100;
        bear.y = game.world.height - 95;

        bear.animations.add('right', [4, 5, 6, 7], 10, true);
        bear.animations.add('left', [0, 1, 2, 3], 10, true);

        bear2 = game.add.sprite(800, game.world.height - 150, 'bear');
        bear2.anchor.setTo(0.5, 0.5);
        game.physics.enable(bear2, Phaser.Physics.ARCADE);
        bear2.body.immovable = true;
        bear2.body.collideWorldBounds = true;
        bear2.body.allowGravity = false;

        bear2.x = 850;
        bear2.y = game.world.height - 95;

        bear2.animations.add('right', [4, 5, 6, 7], 10, true);
        bear2.animations.add('left', [0, 1, 2, 3], 10, true);

        bear3 = game.add.sprite(800, game.world.height - 150, 'bear');
        bear3.anchor.setTo(0.5, 0.5);
        game.physics.enable(bear3, Phaser.Physics.ARCADE);
        bear3.body.immovable = true;
        bear3.body.collideWorldBounds = true;
        bear3.body.allowGravity = false;

        bear3.x = 1400;
        bear3.y = game.world.height - 95;

        bear3.animations.add('right', [4, 5, 6, 7], 10, true);
        bear3.animations.add('left', [0, 1, 2, 3], 10, true);

        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        stars = game.add.group();
        stars.enableBody = true;

        for (var i = 0; i < 52; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 4000;
            star.body.bounce.y = 0.2 + Math.random() * 0.2;
        }

        scoreText = game.add.text(16, 16, 'score: 0', {font: 'bold 20px gamerfont', fill: '#fff'});
        scoreText.fixedToCamera = true;

        lifeText = game.add.text(54, 52, '3', {font: 'bold 28px gamerfont', fill: '#fff'});
        lifeText.fixedToCamera = true;

        lifeIcon = game.add.image(16, 52, 'life');
        lifeIcon.fixedToCamera = true;

        cursors = game.input.keyboard.createCursorKeys();
        collided = false;
        life = 3;
    },
    update: function () {
        background.tilePosition.x = 0.5;

        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitPlatformJump = game.physics.arcade.collide(player, platformsJump);

        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(lifeSaves, platformsJump);
        game.physics.arcade.collide(stars, obstacles);
        game.physics.arcade.collide(player, obstacles);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, lifeSaves, collectLife, null, this);
        game.physics.arcade.overlap(player, bear, checkOverlap);
        game.physics.arcade.overlap(player, bear2, checkOverlap2);
        game.physics.arcade.overlap(player, bear3, checkOverlap3);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatformJump) {
            player.body.velocity.y = -350;
        }

        if (bear.x === 100) {
            game.add.tween(bear).to( { x: '+800' }, 8000, 'Linear', true, 0, 100, true);
            bear.animations.play('right');
        }
        else if (bear.x === 900) {
            game.add.tween(bear).to( { x: '-800' }, 8000, 'Linear', true, 0, 100, true);
            bear.animations.play('left');
        }

        if (bear2.x === 850) {
            game.add.tween(bear2).to( { x: '+500' }, 8000, 'Linear', true, 0, 100, true);
            bear2.animations.play('right');
        }
        else if (bear2.x === 1350) {
            game.add.tween(bear2).to( { x: '-500' }, 8000, 'Linear', true, 0, 100, true);
            bear2.animations.play('left');
        }

        if (bear3.x === 1400) {
            game.add.tween(bear3).to( { x: '+600' }, 8000, 'Linear', true, 0, 100, true);
            bear3.animations.play('right');
        }
        else if (bear3.x === 2000) {
            game.add.tween(bear2).to( { x: '-600' }, 8000, 'Linear', true, 0, 100, true);
            bear3.animations.play('left');
        }

        function resetPlayer() {
            player.reset(32, game.world.height - 150);
            collided = false;
        }

        function checkOverlap() {
            if (player.body.touching.down && bear.body.touching.up) {
                player.body.velocity.y = -150;
                bear.body.enable = false;
                bear.kill();
                bearHit.play();

            } else {
                player.frame = 9;
                player.body.velocity.y = -150;
                game.time.events.add(800, resetPlayer, this);

                if (!collided) {
                    collided = true;
                    life -= 1;
                    lifeText.text = life;
                    deadHit.play();
                }
            }
        }

        function checkOverlap2() {
            if (player.body.touching.down && bear2.body.touching.up) {
                player.body.velocity.y = -150;
                bear2.body.enable = false;
                bear2.kill();
                bearHit.play();

            } else {
                player.frame = 9;
                player.body.velocity.y = -150;
                game.time.events.add(800, resetPlayer, this);

                if (!collided) {
                    collided = true;
                    life -= 1;
                    lifeText.text = life;
                    deadHit.play();
                }
            }
        }

        function checkOverlap3() {
            if (player.body.touching.down && bear3.body.touching.up) {
                player.body.velocity.y = -150;
                bear3.body.enable = false;
                bear3.kill();
                bearHit.play();

            } else {
                player.frame = 9;
                player.body.velocity.y = -150;
                game.time.events.add(800, resetPlayer, this);

                if (!collided) {
                    collided = true;
                    life -= 1;
                    lifeText.text = life;
                    deadHit.play();
                }
            }
        }

        if (life === 0) {
            game.state.start("GameOver");

        }

        function collectStar(player, star) {
            star.kill();
            score += 10;
            scoreText.text = 'score:' + score;
            starsHit.play();
        }

        function collectLife(player, lifeSave) {
            lifeSave.kill();
            lifeHit.play();
            if (!collided) {
                collided = true;
                life += 1;
                lifeText.text = life;
            }
        }

        if (score === 360) {
            game.state.start("Win");
        }

        game.camera.follow(player);
    }
};
