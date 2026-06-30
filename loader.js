// loader.js
export class Loader extends Phaser.Scene {
    constructor() {
        super('loader');
    }

    init() {
        // Register cleanup on scene shutdown
        this.events.once('shutdown', this.cleanup, this);
        this.events.once('destroy', this.cleanup, this);
    }

    preload() {
        // Sprites
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('backgroundXL', 'assets/images/backgroundXL.jpg');

        this.load.image('button', 'assets/images/button.png');
        
        //small
        // this.load.image('question0', 'assets/images/question0.png');
        // this.load.image('question1', 'assets/images/question1.png');
        // this.load.image('question2', 'assets/images/question2.png');
        // this.load.image('question3', 'assets/images/question3.png');
        // this.load.image('question4', 'assets/images/question4.png');
        // this.load.image('question5', 'assets/images/question5.png');
        // this.load.image('question6', 'assets/images/question6.png');
        // this.load.image('question7', 'assets/images/question7.png');
        // this.load.image('question8', 'assets/images/question8.png');
        // this.load.image('question9', 'assets/images/question9.png');
        // this.load.image('question10', 'assets/images/question10.png');
        // this.load.image('question11', 'assets/images/question11.png');
        // this.load.image('question12', 'assets/images/question12.png');
        // this.load.image('question13', 'assets/images/question13.png');
        
        // this.load.image('results1', 'assets/images/results1.png');
        // this.load.image('results2', 'assets/images/results2.png');
        // this.load.image('results3', 'assets/images/results3.png');
        // this.load.image('results4', 'assets/images/results4.png');

        //XL
        this.load.image('question1XL', 'assets/images/question1XL.png');
        this.load.image('question2XL', 'assets/images/question2XL.png');
        this.load.image('question3XL', 'assets/images/question3XL.png');
        this.load.image('question4XL', 'assets/images/question4XL.png');
        this.load.image('question5XL', 'assets/images/question5XL.png');
        this.load.image('question6XL', 'assets/images/question6XL.png');
        this.load.image('question7XL', 'assets/images/question7XL.png');
        this.load.image('question8XL', 'assets/images/question8XL.png');
        this.load.image('question9XL', 'assets/images/question9XL.png');
        this.load.image('question10XL', 'assets/images/question10XL.png');
        this.load.image('question11XL', 'assets/images/question11XL.png');
        this.load.image('question12XL', 'assets/images/question12XL.png');
        this.load.image('question13XL', 'assets/images/question13XL.png');
        
        //make a choice 
        this.load.image('question1XLb', 'assets/images/question1b.png');
        this.load.image('question2XLb', 'assets/images/question2b.png');
        this.load.image('question3XLb', 'assets/images/question3b.png');
        this.load.image('question4XLb', 'assets/images/question4b.png');
        this.load.image('question5XLb', 'assets/images/question5b.png');
        this.load.image('question6XLb', 'assets/images/question6b.png');
        this.load.image('question7XLb', 'assets/images/question7b.png');
        this.load.image('question8XLb', 'assets/images/question8b.png');
        this.load.image('question9XLb', 'assets/images/question9b.png');
        this.load.image('question10XLb', 'assets/images/question10b.png');
        this.load.image('question11XLb', 'assets/images/question11b.png');
        this.load.image('question12XLb', 'assets/images/question12b.png');
        this.load.image('question13XLb', 'assets/images/question13b.png');
        
        this.load.image('results1XL', 'assets/images/results1XL.png');
        this.load.image('results2XL', 'assets/images/results2XL.png');
        this.load.image('results3XL', 'assets/images/results3XL.png');
        this.load.image('results4XL', 'assets/images/results4XL.png');

        // Spritesheets
        this.load.spritesheet('lights', 'assets/images/lights.png', { frameWidth: 750, frameHeight: 98 });

        // Animations
        this.load.multiatlas('introAnim', 'assets/animations/introAnim.json', 'assets/animations');
        this.load.multiatlas('gauge', 'assets/animations/gauge.json', 'assets/animations');
        
        // this.load.audio('gameMusic1', ["assets/audio/music/gameMusic1.mp3"]);

        // Fonts
        // this.load.bitmapFont('fontJoystix', '/assets/fonts/joystix.png', '/assets/fonts/joystix.xml');

        //audio
        // this.load.audio('coin', [
        //     "assets/audio/coin.mp3",
        //     "assets/audio/coin.ogg"
        // ]);

        // SFX
        this.load.audio('clickDown', ["assets/audio/clickDown.mp3"]);
        this.load.audio('clicUp', ["assets/audio/clickUp.mp3"]);

        // Loading bar UI
        const barContainer = this.add.container(window.game.config.width / 2, 500);
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(-250, 0, 500, 60);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: 0,
            y: -34,
            text: 'loading...',
            style: {
                font: '32px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: 0,
            y: 30,
            text: '0%',
            style: {
                font: '30px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: 0,
            y: 88,
            text: '',
            style: {
                font: '24px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        barContainer.add([progressBox, progressBar, loadingText, percentText, assetText]);

        // Load event listeners
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x2e62ca, 1);
            progressBar.fillRect(-240, 10, 480 * value, 40);
            percentText.setText(`${Math.round(value * 100)}%`);
        });

        this.load.on('fileprogress', (file) => {
            if (window.logInfo === true) { // Use global window.logInfo
                // console.log(`asset: ${file.src}`);
            }
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create() {
        this.scene.stop('loader');
        this.scene.start('intro');
    }

    cleanup() {        
        // Remove event listeners
        this.load.off('progress');
        this.load.off('fileprogress');
        this.load.off('complete');
        this.events.off('shutdown');
        this.events.off('destroy');

        // Destroy all children
        const children = [...this.children.list];
        children.forEach(child => {
            if (child && child.destroy) {
                child.destroy();
            }
        });
    }
}

// Export an instance for Phaser to use with dynamic import
export const loader = new Loader();