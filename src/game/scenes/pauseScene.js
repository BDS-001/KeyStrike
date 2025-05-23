export class PauseScene extends Phaser.Scene {
	constructor() {
		super({ key: 'PauseScene', active: true, visible: false });
	}
	create() {
		// transparent backround for the scene so i can still see gameplay
		this.cameras.main.setBackgroundColor('rgba(0,0,0,0.3)');

		// lsiten for esc to toggle pause
		this.input.keyboard.on('keydown-ESC', () => {
			//gamescene name
			const key = 'GameScene';
			if (this.scene.isPaused(key)) {
				this.scene.resume(key);
				this.scene.setVisible(false, 'PauseScene');
			} else {
				this.scene.pause(key);
				this.scene.setVisible(true, 'PauseScene');
			}
		});
		// Add pause-menu UI here (text/buttons), e.g.:
		this.add.text(400, 300, 'PAUSED', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
	}
}
