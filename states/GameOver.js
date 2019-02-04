var GameOver = function () {
};
var button;
GameOver.prototype = {
    menuConfig: {
        startY: 260,
        startX: "center"
    },
    preload: function () {
        game.load.image('button', 'assets/images/button.png');
        game.load.audio('winAudio', ['assets/bgm/happy.mp3']);
        game.load.audio('dangerous', ['assets/bgm/Dangerous.mp3']);
    },

    init: function () {
        game.world.setBounds(0, 0, game.width, game.height);

        this.titleText = game.make.text(game.world.centerX, 100, "GAME OVER", {
            font: 'bold 50pt gamerfont',
            fill: '#fff',
            align: 'center'
        });

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);

        this.optionCount = 1;
    },

    create: function () {
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'WinBG');

        if (music.name === "dangerous") {
            music.stop();
            music = game.add.audio('winAudio');
            music.loop = true;
            music.play();
        }

        bg = game.add.sprite(0, 0, 'WinBG');
        bg.width = game.width;
        bg.height = game.height;

        game.add.existing(this.titleText);

        button = game.add.button(game.world.centerX - 150, 400, 'button', actionOnClick, this, 2, 1, 0);

        function actionOnClick () {
            this.restartGame();

            if (music.name === "winAudio") {
                music.stop();
                music = game.add.audio('dangerous');
                music.loop = true;
                music.play();
            }
        }
    },
    restartGame: function() {
        game.state.start('Main');
    }
};

Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
