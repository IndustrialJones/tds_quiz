window.TESTING = true;
window.logInfo = false;

function parseBooleanParam(value) {
    if (value == null) return false;

    const normalized = String(value).trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

const startupParams = new URLSearchParams(window.location.search);
export const gpuEnabled = parseBooleanParam(startupParams.get('gpuenabled'));
window.gpuEnabled = gpuEnabled;

async function initializeGame() {
    try {
        // console.log('gpuenabled URL param:', gpuEnabled);
        const cacheBust = `?v=${Date.now()}`;
        const { loader } = await import(`./loader.js${cacheBust}`);
        const { intro } = await import(`./intro.js${cacheBust}`);
        // const { scene } = await import(`./scene.js${cacheBust}`);

        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-app',
            width: 1080,
            height: 1920,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: 'phaser-app'
            },
            backgroundColor: 0x000000,
            fps: { target: 60, forceSetTimeOut: true },
            input: { gamepad: true },
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 0.4 },//0.25
                    debug: false,
                    enableSleeping: false,
                    positionIterations: 6,
                    velocityIterations: 2,
                    constraintIterations: 2
                }
            },
            audio: { disableWebAudio: false },
            scene: [loader, intro]
        };

        window.game = new Phaser.Game(config);
    } catch (error) {
        // console.error('error loading scripts:', error);
    }
}

window.stopGame = function () {
    if (window.game) {
        window.game.destroy(true);
        window.game = null;
    }
};

initializeGame();