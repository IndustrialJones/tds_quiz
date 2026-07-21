import { gpuEnabled } from './main.js';

export class Intro extends Phaser.Scene {
    constructor() {
        super("intro");

        this.bg = null;

        this.gauge = null;
        this.introAnim = null;

        this.playButton = null;

        this.lights = null;
        this.questions = null;
        this.qY = 400;
        this.nY = 942;
        this.bY = 1302;
        this.lY = 1140;

        this.processing = null;

        this.next = null;

        this.buttonArray = [];

        this.scoreArray = [1, 0, -1];

        this.gpuEnabled = false;

        this.score = 0;
        this.prevScore = 0;

        this.firstRound = true;

        this.round = 0;
        this.roundTotal = 12;

        this.choiceMade = false;
        this.choiceIndex = -1;

        this.gameOver = false;

        this.mode = 'XL';

        this.dispMakeChoice = true;

        //audio
        this.meterSnd = null;
        this.meterVolume = 0.25;

        this.humSnd = null;

        this.endSnd = null;

        this.detuneAmount = 0;
        this.detuneInc = 25;

        this.clickN = null;//click next
        this.clickD = null;//yes/maybe/no clicks

        this.godGivenMix = null;

        this.linkArray = [
            ['End Prologue video', 'https://vimeo.com/1211100743?share=copy&fl=sv&fe=ci'],
            ['Last New York Times', 'https://drive.google.com/file/d/1hheZLK_KQSc5RKAyxaQWlUxCPsa8jCs2/view?usp=drive_link'],
            ['Atlantic Article Screengrab', 'https://drive.google.com/file/d/1xJFoKP6wQleURRPNyl2N1Ln2sfRbkNRp/view?usp=drive_link'],
            ['Black Hole Poster', 'https://drive.google.com/file/d/1gYGiyMKjqbiIlc2z_7PRhlmTkfM86CdA/view?usp=drive_link'],
            ['Black Hole Article', 'https://drive.google.com/file/d/1vqYC8rq8A1R0uO2eiDjMrbeNAlIoz8Id/view?usp=drive_link'],
            ['Vessel Remix', 'https://drive.google.com/file/d/1u6_qHIl_8zQnnP5KtBhVmgz90ng-HpeM/view?usp=drive_link'],
            ['Regent Corps Brochure', 'https://drive.google.com/file/d/1t5H8ADtgN3VqH2pu7_iFedF-rmSlmton/view?usp=drive_link'],
            ['Ophelia Manifesto', 'https://drive.google.com/file/d/1JXipHk2P6_5AqVvHCgHySKHfVykiXwD0/view?usp=drive_link'],
            ['Stingray: Solace Meeting', 'https://drive.google.com/file/d/1DiaGgdlX7fagEeDeFJeH79mm9HCSt2eB/view?usp=drive_link'],
            ['Stingray: Displacee', 'https://drive.google.com/file/d/1A8h8R_Lkb0cq8FEYv_cmwVSRdFZYCtFI/view?usp=drive_link'],
            ['Stingray: T-Shirt Kid', 'https://drive.google.com/file/d/1qwsoT_Ti-hRSWDS_qUc5G8_oLdTD_XZ4/view?usp=drive_link'],
            ['Ares III Article', 'https://drive.google.com/file/d/1C1AuwuvV3gS85sigRhPT0UZhF_rENkm2/view?usp=drive_link'],
            ['Zach Transcript', 'https://drive.google.com/file/d/1fzR33WY-BOI7fgU6U3DB2j0h6Lrn6avy/view?usp=drive_link'],
            ['The Good Soldier Remix', 'https://drive.google.com/file/d/1k2A8I0c2gdKmwIkWWqW1wzYdizthuz78/view?usp=drive_link'],
            ['Presence Sighting A', 'https://drive.google.com/file/d/1aD9Tl1wJWX4aiM8DAwVTfI2uwK0Aw7kr/view?usp=drive_link'],
            ['USBI File: Ophelia Letter 1', 'https://drive.google.com/file/d/1dGqBCE5dYSu7E8I-uSqrTyUjPlbW2HIY/view?usp=drive_link'],
            ['51-Star Flag Press Release', 'https://drive.google.com/file/d/1UJkQa-whpRODIBpnRvgZnP54ury-j8Sw/view?usp=drive_link'],
            ['AIR Manifesto', 'https://drive.google.com/file/d/1fPOPkuxC2zvsCCBw_v94f4EaiXdilOq9/view?usp=drive_link'],
            ['NYC Protest Massacre', 'https://drive.google.com/file/d/1VExM323xXfMiRewQJg8mOeC_LQedkTFL/view?usp=drive_link'],
            ['USBI File: Ophelia Letter 2', 'https://drive.google.com/file/d/1oQeKN0ohuMEsGhxgdhAdP-sCTqGQWLp9/view?usp=drive_link'],
            ['Forum Capture', 'https://drive.google.com/file/d/1PEDK-J_pe-B1mU1AExrTrbXcJx1xozOp/view?usp=drive_link'],
            ['Stingray: Twins', 'https://drive.google.com/file/d/1CYpKZaQfcPqKQm2xWlMm5hhezo7UrCH4/view?usp=drive_link'],
            ['Stingray: Ares III', 'https://drive.google.com/file/d/1Q67BUzkFhq8_m5k_T5tPDn-PK9UsAqUF/view?usp=drive_link'],
            ['Stingray: No One', 'https://drive.google.com/file/d/139WXFxO-OKMjJ4Tu6g116fnpa0KL9-sR/view?usp=drive_link'],
            ['Stingray: Burn', 'https://drive.google.com/file/d/1LP31czAK9EV2Dpp-1_-qg5kpNg4KyN8Q/view?usp=drive_link'],
            ['Stingray: Mike', 'https://drive.google.com/file/d/17OULK_ykn_XUVZcFaCkybw7kwuxXsBDL/view?usp=drive_link'],
            ['Stingray: Lady on TV', 'https://drive.google.com/file/d/1-rgFUi57qBKmNFNn3-nPH-749CVKWmO1/view?usp=drive_link'],
            ['Stingray: Glasses', 'https://drive.google.com/file/d/1u1tBJ43Xte63E9UnkyI8zbMl0YFzfUWL/view?usp=drive_link'],
            ['Stingray: Phone', 'https://drive.google.com/file/d/16EkZyddcCXB3KMdbF-VKcI7p48MZiAL1/view?usp=drive_link'],
            ['USBI LOGIN 1', 'https://drive.google.com/file/d/17d3oY7k0bt2VfC7PYVbTAa947t0Kw66o/view?usp=drive_link'],
            ['USBI LOGIN 2', 'https://drive.google.com/file/d/1WiJd_0_AWCVt8uk9ZmFljhn7gHcCJYW6/view?usp=drive_link'],
            ['Next Stars Poster', 'https://drive.google.com/file/d/1_p_-7qh1rTD8mDpILIYQusl54SR9CFj-/view?usp=drive_link'],
            ['Displacee Poster', 'https://drive.google.com/file/d/1ygv6xLVic4222qwThkOZcriRlNnHpqbJ/view?usp=drive_link'],
            ['Ares III Poster', 'https://drive.google.com/drive/folders/1DWh8MC6pY5fzXn-L_K9i4AphLltcGQfb?usp=drive_link']
        ];
    }

    init() {
        // Register cleanup on scene shutdown
        this.events.once('shutdown', this.cleanup, this);
        this.events.once('destroy', this.cleanup, this);
    }

    create() {
        // this.sound.mute = true;// mutes all sound
        // console.log(" TDS:INTRO ");

        this.sound.pauseOnBlur = false;

        this.meterSnd = this.sound.add('meterSnd');

        this.clickN = this.sound.add('click1');
        this.clickD = this.sound.add('click2');

        this.humSnd = this.sound.add('humSnd');

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

    randomArchivalLink() {
        let linkInd = Phaser.Math.Between(0, this.linkArray.length - 1);
        console.log(" ARCH1V3 ID:", linkInd);
        this.questions.setInteractive();
        this.questions.on('pointerdown', (pointer, localX, localY, event) => {
            if (pointer.leftButtonDown()) {
                window.open(this.linkArray[linkInd][1], '_blank');
            }
        });
        // let hoverText = this.add.text(0, 0, this.linkArray[linkInd][1], {
        //     fontFamily: 'Arial',
        //     fontSize: '16px',
        //     color: '#000000',
        //     backgroundColor: '#ffffff',
        //     padding: { x: 8, y: 8 }
        // }).setOrigin(0.5).setVisible(false);

        // this.questions.on('pointerover', function (pointer) {
        //     hoverText.setPosition(this.questions.x, this.questions.y - this.questions.height / 2 - 20);
        //     hoverText.setVisible(true);
        // });

        // this.questions.on('pointerout', function (pointer) {
        //     hoverText.setVisible(false);
        // });
    }

    nextEvent() {
        this.playClickNext();
        // console.log(" ROUND / choice made / choice index : ", this.round, this.choiceMade, this.choiceIndex);
        let qName = '';
        if (this.gameOver === false) {
            if (this.firstRound === true) {
                this.firstRound = false;
                this.round++;

                this.humSnd.play({ loop: true });
                this.humSnd.setVolume(0.4);

                qName = "question" + String(this.round);

                if (this.mode === 'XL') {
                    this.introAnim.destroy();
                    qName = "question" + String(this.round) + "XL";
                } else {
                    this.questions.destroy();
                }

                this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);
                // this.randomArchivalLink(); // testing
            } else if (this.round <= this.roundTotal) {
                if (this.choiceMade && this.choiceIndex !== -1) {
                    this.choiceMade = false;
                    this.lights.setFrame(0);
                    this.score = this.scoreArray[this.choiceIndex] + this.score;
                    console.log(" ROUND / SCORE : ", this.round, this.score);
                    this.choiceIndex = -1;

                    if (this.score > 0) {
                        if (this.score > this.prevScore) {
                            this.gauge.anims.play("gauge" + String(this.score));

                            this.detuneAmount = this.detuneAmount + this.detuneInc;
                        } else if (this.score < this.prevScore) {
                            this.gauge.anims.playReverse("gauge" + String(this.prevScore));

                            this.detuneAmount = this.detuneAmount - this.detuneInc;
                        }

                        this.meterSnd.play();
                        this.meterSnd.setVolume(this.meterVolume);

                    } else if (this.score < 0) {
                        if (this.score < this.prevScore) {
                            this.gauge.anims.play("gauge" + String(this.score));

                            this.detuneAmount = this.detuneAmount - this.detuneInc;
                        } else if (this.score > this.prevScore) {
                            this.gauge.anims.playReverse("gauge" + String(this.prevScore));

                            this.detuneAmount = this.detuneAmount + this.detuneInc;
                        }

                        this.meterSnd.play();
                        this.meterSnd.setVolume(this.meterVolume);

                    } else if (Math.abs(this.prevScore) == 1) {
                        this.detuneAmount = 0;
                        this.gauge.anims.playReverse("gauge" + String(this.prevScore));

                        this.meterSnd.play();
                        this.meterSnd.setVolume(this.meterVolume);
                    }

                    this.humSnd.detune = this.detuneAmount;

                    this.prevScore = this.score;

                    if (this.round === this.roundTotal) {
                        this.gameOver = true;
                        // this.time.delayedCall(1000, () => {
                        //results here
                        //processing then...?

                        let resultIndex = -1;
                        if (this.score <= -4) {
                            resultIndex = 1;//mostly no
                        } else if (this.score <= 5 && this.score != 0) {
                            resultIndex = 2;//not zero//inconclusive//mid
                        } else if (this.score <= this.roundTotal && this.score != 0) {
                            resultIndex = 3;//yesses but no zero
                        } else {
                            resultIndex = 4;//scored zero
                        }

                        qName = "results" + String(resultIndex);

                        if (this.mode === 'XL') {
                            qName = "results" + String(resultIndex) + "XL";
                        }

                        this.questions.destroy();
                        this.questions = this.add.image(window.game.config.width / 2, this.qY, qName);
                        if (resultIndex == 1) {
                            this.questions.setInteractive();
                            this.questions.on('pointerdown', (pointer, localX, localY, event) => {
                                if (pointer.leftButtonDown()) {
                                    window.open('https://discord.gg/RuPGdjm7mV', '_blank');
                                }
                            });
                        }
                        if (resultIndex == 2 || resultIndex == 3) {
                            this.randomArchivalLink();
                        }
                        if (resultIndex == 4) {//results 4
                            // this.questions.setTexture("results4bXL");
                            if (this.humSnd) {
                                this.humSnd.destroy();
                            }

                            this.questions.setInteractive();
                            this.questions.on('pointerdown', (pointer, localX, localY, event) => {
                                if (pointer.leftButtonDown()) {
                                    const link4 = document.createElement('a');
                                    link4.href = 'assets/audio/Nine%20Inch%20Nails%20-%20God%20Given%20(Pixelgrinder%20Remix).mp3';
                                    link4.download = 'Nine Inch Nails - God Given (Pixelgrinder Remix).mp3';
                                    document.body.appendChild(link4);
                                    link4.click();
                                    document.body.removeChild(link4);
                                }
                            });

                            this.playButton = this.add.sprite(865, 601, 'btnPlay').setFrame(1);
                            this.playButton.setInteractive();
                            this.playButton.on('pointerdown', (pointer, localX, localY, event) => {
                                if (pointer.leftButtonDown()) {

                                    if (this.godGivenMix.isPlaying) {
                                        this.playButton.setFrame(0);
                                        this.godGivenMix.pause();
                                    } else if (this.godGivenMix.isPaused) {
                                        this.playButton.setFrame(1);
                                        this.godGivenMix.resume();
                                    }
                                }
                            });
                        }

                        this.processing = this.add.sprite(window.game.config.width / 2, this.qY, "proc", "proc1.png");
                        this.processing.anims.play("procAnimate");

                        this.endSnd = this.sound.add("dialup");
                        this.endSnd.once('complete', () => {
                            if (resultIndex == 4) {//results 4
                                if (this.cache.audio.exists('GodGivenPGRemix')) {

                                    this.startGodGiven();

                                } else {
                                    this.processing.setVisible(true);

                                    this.load.audio(
                                        'GodGivenPGRemix',
                                        'assets/audio/Nine Inch Nails - God Given (Pixelgrinder Remix).mp3'
                                    );

                                    this.load.once('complete', () => {
                                        this.processing.setVisible(false);
                                        this.startGodGiven();
                                    });

                                    this.load.start();
                                }
                            } else {
                                this.processing.destroy();
                            }
                        });

                        this.endSnd.play();
                        this.endSnd.setVolume(0.25);

                        //});//time delay end
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

    startGodGiven() {
        this.godGivenMix = this.sound.add('GodGivenPGRemix');

        this.godGivenMix.play();

        this.godGivenMix.setVolume(0.1);

        this.tweens.add({
            targets: this.godGivenMix,
            volume: 1,
            duration: 10000,
            ease: 'Quad'
        });
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

    playClickNext() {
        if (this.clickN) {
            this.clickN.stop();
            this.clickN.play();
        }
    }

    playClickDown() {
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

        var procFrames = this.anims.generateFrameNames("proc", {
            start: 1, end: 4, zeroPad: 0,
            prefix: 'proc', suffix: '.png'
        });
        this.anims.create({ key: "procAnimate", frames: procFrames, frameRate: 4, repeat: -1 });

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