var Splash = function () {
};

Splash.prototype = {

    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('GameMenu', 'states/GameMenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('Win', 'states/Win.js');
        game.load.script('GameOver', 'states/GameOver.js');
        game.load.script('Options', 'states/Options.js');
    },

    loadBgm: function () {
        game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },

    loadImages: function () {
        game.load.image('menu-bg', 'assets/images/sky.png');
        game.load.image('Options-bg', 'assets/images/menu-bg.jpg');
        game.load.image('WinBG', 'assets/images/menu-bg.jpg');
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['gamerfont'],
                urls: ['assets/style/gamerfont.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');

        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {
            font: 'bold 20px Arial',
            fill: '#fff',
            align: 'center'
        });

        utils.centerGameObjects([this.logo, this.status]);
    },

    preload: function () {
        game.stage.backgroundColor = 0x4A70B9;
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    addGameStates: function () {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("Win", Win);
        game.state.add("GameOver", GameOver);
        game.state.add("Options", Options);
    },

    addGameMusic: function () {
        music = game.add.audio('dangerous');
        music.loop = true;
        music.play();
    },

    create: function () {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();

        setTimeout(function () {
            game.state.start("GameMenu");
        }, 1000);
    }
};
