import { gpuEnabled } from './main.js';

export class Intro extends Phaser.Scene {
    constructor() {
        super("intro");

        this.bg = null;

        this.gauge = null;
        this.introAnim = null;

        this.lights = null;
        this.questions = null;
        this.qY = 400;
        this.nY = 942;
        this.bY = 1302;
        this.lY = 1140;

        this.next = null;

        this.buttonArray = [];

        this.scoreArray = [1, 0, -1];

        this.gpuEnabled = false;

        this.score = 0;
        this.prevScore = 0;

        this.firstRound = true;

        this.round = 0;
        this.roundTotal = 13;

        this.choiceMade = false;
        this.choiceIndex = -1;

        this.gameOver = false;

        this.mode = 'XL';

        this.dispMakeChoice = true;

        //audio
        this.clickD = null;
    }

    init() {
        // Register cleanup on scene shutdown
        this.events.once('shutdown', this.cleanup, this);
        this.events.once('destroy', this.cleanup, this);
    }

    create() {
        // this.sound.mute = true;// mutes all sound
        // console.log(" TDS:INTRO ");

        // this.choiceMade = false;

        this.clickD = this.sound.add('clickDown');

        if (this.mode === 'XL') {
            this.bg = this.add.image(window.game.config.width / 2, window.game.config.height / 2, "backgroundXL");
        } else {
            this.bg = this.add.image(window.game.config.width / 2, window.game.config.height / 2, "background");
        }

        if (this.mode != 'XL') {
            this.questions = this.add.image(window.game.config.width / 2, this.qY, "question0");
        } else {
            this.qY = 380;//adjust question y pos
            this.nY = 996;//adjust next y pos
            this.bY = 1334;//adjust buttons y pos
            this.lY = 1178;//adjust lights y pos
        }

        this.lights = this.add.sprite(window.game.config.width / 2, this.lY, "lights");

        this.next = this.add.image(window.game.config.width / 2, this.nY, "button").setScale(1.2).setAlpha(0.001);
        this.next.setInteractive();
        this.next.on('pointerdown', (pointer, localX, localY, event) => {
            if (pointer.leftButtonDown()) {
                this.nextEvent();
            }
            if (pointer.leftButtonUp) {
                // this.playClickUp();// too much
            }
        });

        for (let i = 0; i < 3; i++) {
            let butt = this.add.image(210 + (i * 330), this.bY, "button").setAlpha(0.001);
            butt.setData('index', String(i + 1));
            butt.setInteractive();
            butt.on('pointerdown', (pointer, localX, localY, event) => {
                if (pointer.leftButtonDown()) {
                    this.playClickDown();
                    if (this.round > 0 && this.gameOver == false) {
                        this.choiceMade = true;
                        let getIndex = parseInt(butt.getData('index')) - 1;
                        this.choiceIndex = getIndex;
                        this.lights.setFrame(butt.getData('index'));
                    }
                }
                if (pointer.leftButtonUp) {
                    // this.playClickUp();
                }
            });
            this.buttonArray.push(butt);
        }

        this.initiateAnimations();
    }

    nextEvent() {
        this.playClickDown();
        // console.log(" ROUND / choice made / choice index : ", this.round, this.choiceMade, this.choiceIndex);
        let qName = '';
        if (this.gameOver === false) {
            if (this.firstRound === true) {
                this.firstRound = false;
                this.round++;

                qName = "question" + String(this.round);

                if (this.mode === 'XL') {
                    this.introAnim.destroy();
                    qName = "question" + String(this.round) + "XL";
                } else {
                    this.questions.destroy();
                }

                this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);
            } else if (this.round <= this.roundTotal) {
                if (this.choiceMade && this.choiceIndex !== -1) {
                    this.choiceMade = false;
                    this.lights.setFrame(0);
                    this.score = this.scoreArray[this.choiceIndex] + this.score;
                    // console.log(" ROUND / SCORE : ", this.round, this.score);
                    this.choiceIndex = -1;

                    if (this.score > 0) {
                        if (this.score > this.prevScore) {
                            this.gauge.anims.play("gauge" + String(this.score));
                        } else if (this.score < this.prevScore) {
                            this.gauge.anims.playReverse("gauge" + String(this.prevScore));
                        }
                    } else if (this.score < 0) {
                        if (this.score < this.prevScore) {
                            this.gauge.anims.play("gauge" + String(this.score));
                        } else if (this.score > this.prevScore) {
                            this.gauge.anims.playReverse("gauge" + String(this.prevScore));
                        }
                    } else if (Math.abs(this.prevScore) == 1) {
                        this.gauge.anims.playReverse("gauge" + String(this.prevScore));
                    }

                    this.prevScore = this.score;

                    if (this.round === this.roundTotal) {
                        this.gameOver = true;
                        this.time.delayedCall(1000, () => {
                            //results here
                            //processing then...?

                            let resultIndex = -1;
                            if (this.score <= -4) {
                                resultIndex = 1;//mostly no//link here
                                // console.log(" link should work ? ");

                            } else if (this.score <= 5 && this.score != 0) {
                                resultIndex = 2;//not zero//inconclusive
                            } else if (this.score <= 13 && this.score != 0) {
                                resultIndex = 3;//yeses but no zero
                            } else {
                                resultIndex = 4;//all maybes
                            }

                            qName = "results" + String(resultIndex);

                            if (this.mode === 'XL') {
                                qName = "results" + String(resultIndex) + "XL";
                            }

                            this.questions.destroy();
                            this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);
                            if (this.score <= -4) {
                                this.questions.setInteractive();
                                this.questions.on('pointerdown', (pointer, localX, localY, event) => {
                                    if (pointer.leftButtonDown()) {
                                        window.open('https://youtu.be/4rm3AZ9v2fs?si=Kyf0F7_Y9qHrfpTM', '_blank');
                                    }
                                });
                            }
                        });
                    } else {
                        // advance to the next round, then display that question
                        this.round++;
                        this.dispMakeChoice = true;
                        qName = "question" + String(this.round);

                        if (this.mode === 'XL') {
                            qName = "question" + String(this.round) + "XL";
                        }

                        this.questions.destroy();
                        this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);
                    }
                } else {
                    if (this.dispMakeChoice === true) {
                        this.dispMakeChoice = false;

                        qName = "question" + String(this.round);

                        if (this.mode === 'XL') {
                            qName = "question" + String(this.round) + "XLb";
                        }

                        this.questions.destroy();
                        this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);

                        // console.log(" ROUND : ", this.round);
                        // console.log("MAKE A CHOICE");
                    }
                }
            }
        }
    }

    keyboardInput() {
        this.introKeys = this.input.keyboard.addKeys({
            space: 'SPACE',
            zero: 'ZERO',
            one: 'ONE',
            two: 'TWO',
            three: 'THREE',
            four: 'FOUR',
            five: 'FIVE',
            six: 'SIX',
            seven: 'SEVEN',
            eight: 'EIGHT',
            nine: 'NINE',
            a: 'A',
            r: 'R',
            f: 'F',
            l: 'L',
            z: 'Z',
            x: 'X',
            c: 'C',
            v: 'V',
            b: 'B',
            n: 'N',
            m: 'M',
            comma: 'COMMA'
        });
    }

    playClickUp() {
        // if (this.clickU) {
        //     this.clickU.stop();
        //     this.clickU.play();
        // }
        // if (this.clickD) {
        //     this.clickD.stop();
        // }
    }

    playClickDown() {
        if (this.clickU) {
            this.clickU.stop();
        }
        if (this.clickD) {
            this.clickD.stop();
            this.clickD.play();
        }
    }

    playIdleSound() {
        // this.sndPlaying = true;

        // if (this.idleSoundPool.length === 0) {
        //     this.idleSoundPool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // }

        // let rndIndex = Phaser.Math.Between(0, this.idleSoundPool.length - 1);
        // let rndIdle = this.idleSoundPool.splice(rndIndex, 1)[0];
        // // console.log(" idle # : " + String(rndIdle), this.idleSoundPool);

        // this.sndIdle = this.sound.add('idle' + String(rndIdle));
        // this.sndIdle.play();
        // this.sndIdle.on('complete', () => {
        //     this.sndPlaying = false;
        // });
    }

    skipIntro() {
        // this.introTracking = false;
        // this.cleanup();

        // this.scene.stop('intro');
        // this.scene.start('scene');
    }

    updateKeys() {
        if (this.introKeys) {
            if (Phaser.Input.Keyboard.JustDown(this.introKeys.space)) {
                console.log(" key : space bar ");
            }

            if (Phaser.Input.Keyboard.JustDown(this.introKeys.a)) {
                console.log(" key : a ");
            }

            if (Phaser.Input.Keyboard.JustDown(this.introKeys.c)) {
                console.log(" key : c ");
            }

            if (Phaser.Input.Keyboard.JustDown(this.introKeys.r)) {
                console.log(" key : r ");
            }

            if (Phaser.Input.Keyboard.JustDown(this.introKeys.m)) {
                console.log(" key : m ");
            }
        }
    }

    update(time, delta) {
        // Prevent update from running if scene is being cleaned up
        if (!this.sys || !this.sys.isActive()) {
            return;
        }

        this.updateKeys();
    }

    resetIntro() {
        this.cleanup();

        console.clear();

        window.location.reload();
    }

    initiateAnimations() {
        if (this.mode === 'XL') {
            this.introAnim = this.add.sprite(window.game.config.width / 2, this.qY, "introAnim", "introAnim_00000.png");
            var introFrames = this.anims.generateFrameNames("introAnim", {
                start: 0, end: 29, zeroPad: 5,
                prefix: 'introAnim_', suffix: '.png'
            });
            this.anims.create({ key: "introAnimate", frames: introFrames, frameRate: 10 });
            this.introAnim.anims.play("introAnimate");
        }

        this.gauge = this.add.sprite(window.game.config.width / 2, window.game.config.height / 2, "gauge", "gauge_pos_0001.png").setDepth(2);
        var gaugeFrames = null;
        var framesPerAnim = 30;
        var framePadding = 15;
        for (let i = 0; i < 13; i++) {
            //pos
            gaugeFrames = this.anims.generateFrameNames("gauge", {
                start: 1 + (i * framePadding), end: framePadding + (i * framePadding), zeroPad: 4,
                prefix: 'gauge_pos_', suffix: '.png'
            });
            let ind = String(i + 1);
            this.anims.create({ key: "gauge" + ind, frames: gaugeFrames, frameRate: framesPerAnim });

            //neg
            gaugeFrames = this.anims.generateFrameNames("gauge", {
                start: 1 + (i * framePadding), end: framePadding + (i * framePadding), zeroPad: 4,
                prefix: 'gauge_neg_', suffix: '.png'
            });
            let negInd = "-" + ind;
            this.anims.create({ key: "gauge" + negInd, frames: gaugeFrames, frameRate: framesPerAnim });
        }
    }

    cleanup() {
        // console.log("Cleaning up intro scene...");

        // Stop all audio
        this.sound.stopAll();

        // Clean up text objects
        // if (this.txtIntro) {
        //     this.txtIntro.destroy();
        //     this.txtIntro = null;
        // }

        // Remove all timers
        this.time.removeAllEvents();

        // Remove event listeners
        this.events.off('update');
        this.events.off('shutdown');
        this.events.off('destroy');
        this.input.off('pointerdown');

        // Remove keyboard listeners

        // Reset animation flags so they can be recreated next time
        this.logoAnim = false;
        this.cAnimInit = false;

        // Destroy all children
        const children = [...this.children.list]; // Create copy to avoid mutation during iteration
        children.forEach(child => {
            if (child && child.destroy) {
                child.destroy();
            }
        });

        // Clean up physics
        if (this.physics && this.physics.world) {
            this.physics.world.shutdown();
        }

        console.log("Intro scene cleanup complete");
    }

    fitText(textObj, maxWidth) {
        const textWidth = textObj.width;
        if (textWidth > maxWidth) {
            textObj.setScale(maxWidth / textWidth);
        } else {
            textObj.setScale(1);
        }
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

export const intro = new Intro();