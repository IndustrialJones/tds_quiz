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
        this.load.image('backgroundXL', 'assets/images/backgroundXL.jpg');

        this.load.image('button', 'assets/images/button.png');

        //XL
        this.load.image('question1XL', 'assets/images/question1XL.webp');
        this.load.image('question2XL', 'assets/images/question2XL.webp');
        this.load.image('question3XL', 'assets/images/question3XL.webp');
        this.load.image('question4XL', 'assets/images/question4XL.webp');
        this.load.image('question5XL', 'assets/images/question5XL.webp');
        this.load.image('question6XL', 'assets/images/question6XL.webp');
        this.load.image('question7XL', 'assets/images/question7XL.webp');
        this.load.image('question8XL', 'assets/images/question8XL.webp');
        this.load.image('question9XL', 'assets/images/question9XL.webp');
        this.load.image('question10XL', 'assets/images/question10XL.webp');
        this.load.image('question11XL', 'assets/images/question11XL.webp');
        this.load.image('question12XL', 'assets/images/question12XL.webp');
        
        //make a choice 
        this.load.image('question1XLb', 'assets/images/question1b.webp');
        this.load.image('question2XLb', 'assets/images/question2b.webp');
        this.load.image('question3XLb', 'assets/images/question3b.webp');
        this.load.image('question4XLb', 'assets/images/question4b.webp');
        this.load.image('question5XLb', 'assets/images/question5b.webp');
        this.load.image('question6XLb', 'assets/images/question6b.webp');
        this.load.image('question7XLb', 'assets/images/question7b.webp');
        this.load.image('question8XLb', 'assets/images/question8b.webp');
        this.load.image('question9XLb', 'assets/images/question9b.webp');
        this.load.image('question10XLb', 'assets/images/question10b.webp');
        this.load.image('question11XLb', 'assets/images/question11b.webp');
        this.load.image('question12XLb', 'assets/images/question12b.webp');
        
        this.load.image('results1XL', 'assets/images/results1XL.webp');
        // this.load.image('results1aXL', 'assets/images/results1aXL.webp');
        // this.load.image('results1bXL', 'assets/images/results1bXL.webp');
        this.load.image('results2XL', 'assets/images/results2XL.webp');
        this.load.image('results3XL', 'assets/images/results3XL.webp');
        this.load.image('results4XL', 'assets/images/results4XL.webp');
        this.load.image('results4aXL', 'assets/images/results4aXL.webp');
        this.load.image('results4bXL', 'assets/images/results4bXL.webp');

        // Spritesheets
        this.load.spritesheet('lights', 'assets/images/lights.png', { frameWidth: 750, frameHeight: 98 });
        this.load.spritesheet('btnPlay', 'assets/images/buttonPlay.png', { frameWidth: 156, frameHeight: 87 });

        // Animations
        this.load.multiatlas('introAnim', 'assets/animations/introAnim.json', 'assets/animations');
        this.load.multiatlas('gauge', 'assets/animations/gauge.json', 'assets/animations');
        this.load.multiatlas('proc', 'assets/animations/processing.json', 'assets/animations');

        // Fonts
        // this.load.bitmapFont('fontJoystix', '/assets/fonts/joystix.png', '/assets/fonts/joystix.xml');

        // SFX
        this.load.audio('click2', ["assets/audio/clickDown.mp3"]);
        this.load.audio('click1', ["assets/audio/click2.mp3"]);
        this.load.audio('meterSnd', ["assets/audio/meter.mp3"]);
        this.load.audio('humSnd', ["assets/audio/theHum2.mp3"]);
        this.load.audio('dialup', ["assets/audio/dialup.mp3"]);

        // this.load.audio('GodGivenPGRemix', ["assets/audio/Nine Inch Nails - God Given (Pixelgrinder Remix).mp3"]);

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