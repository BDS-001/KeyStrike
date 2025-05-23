import Phaser from 'phaser';

export const phaserConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#222',
	pixelArt: true,

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
	render: {
		fps: {
			min: 10,
			target: 60,
			limit: 120,
			forceSetTimeOut: false,
			deltaHistory: 10,
		},
	},
};

export const gameSettings = {
	SPRITE_SCALE: 4,
};
