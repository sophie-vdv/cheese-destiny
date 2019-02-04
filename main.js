// Global Variables
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game'),
    Main = function () {
    },
    gameOptions = {
        playSound: true,
        playMusic: true
    },
    musicPlayer;

Main.prototype = {

    preload: function () {
        game.load.image('loadingBG', 'assets/images/loading-bg.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/logo.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('splash', 'states/Splash.js');
    },

    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');

        game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.setShowAll();
        game.scale.refresh();
    }
};

game.state.add('Main', Main);
game.state.start('Main');
