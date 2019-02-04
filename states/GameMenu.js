var GameMenu = function () {
};
var bg;
GameMenu.prototype = {
    menuConfig: {
        startY: 260,
        startX: "center"
    },

    init: function () {
        this.titleText = game.make.text(game.world.centerX, 100, "Laurens &", {
            font: 'bold 30pt gamerfont',
            fill: '#fff',
            align: 'center'
        });

        this.subTitleText = game.make.text(game.world.centerX, 150, "The Cheese of Destiny", {
            font: 'bold 20pt gamerfont',
            fill: '#fff',
            align: 'center'
        });

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);

        this.subTitleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.subTitleText.anchor.set(0.5);

        this.optionCount = 1;
    },

    create: function () {
        if (music.name !== "dangerous" && playMusic) {
            music.stop();
            music = game.add.audio('dangerous');
            music.loop = true;
            music.play();
        }

        game.stage.disableVisibilityChange = true;
        bg = game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);
        game.add.existing(this.subTitleText);

        bg.width = game.width;
        bg.height = game.height;

        this.addMenuOption('Start', function () {
            game.state.start("Game");
        });

        this.addMenuOption('Options', function () {
            game.state.start("Options");
        });
    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
