import TypedEntity from '../typedEntity';
import wordBank from '../../data/wordbank';
import { gameSettings } from '../../core/constants';

function calculateRandomPosition(camera) {
	const width = camera.width;
	const height = camera.height;

	const centerX = width / 2;
	const centerY = height / 2;
	const angle = Math.random() * Math.PI * 2;
	const maxRadius = Math.sqrt(width * width + height * height) / 2 + 50;

	let x = centerX + Math.cos(angle) * maxRadius;
	let y = centerY + Math.sin(angle) * maxRadius;

	return { x, y };
}

const defaultOptions = {
	moveSpeed: 50,
	knockback: 10,
	wordCategory: 'easy',
	damage: 10,
};

export default class Enemy extends TypedEntity {
	constructor(id, scene, spriteImage, options = {}) {
		const enemyOptions = { ...defaultOptions, ...options };

		const wordBankIndex = Math.floor(Math.random() * wordBank[enemyOptions.wordCategory].length);
		const word = wordBank[enemyOptions.wordCategory][wordBankIndex];

		const { x: spawnX, y: spawnY } = calculateRandomPosition(scene.cameras.main);

		super(scene, spawnX, spawnY, spriteImage, word, id);

		if (this.x > scene.player.x) this.flipX = true;

		this.moveSpeed = enemyOptions.moveSpeed;
		this.knockback = enemyOptions.knockback;
		this.damage = enemyOptions.damage;
		this.displayedWord = this.word;

		this.setScale(gameSettings.SPRITE_SCALE);
	}

	isEnemyOnScreen() {
		const camera = this.scene.cameras.main;
		const margin = 50;

		return (
			this.x > camera.scrollX - margin &&
			this.x < camera.scrollX + camera.width + margin &&
			this.y > camera.scrollY - margin &&
			this.y < camera.scrollY + camera.height + margin
		);
	}

	moveEnemy() {
		if (this.isDestroyed) return;

		const player = this.scene.player;
		const directionX = player.x - this.x;
		const directionY = player.y - this.y;
		const length = Math.sqrt(directionX * directionX + directionY * directionY);

		if (length > 0) {
			const normalizedX = directionX / length;
			const normalizedY = directionY / length;
			this.setVelocity(normalizedX * this.moveSpeed, normalizedY * this.moveSpeed);
		}
	}

	knockbackEnemy() {
		if (this.isDestroyed || this.knockback === 0) return;

		const player = this.scene.player;
		const directionX = player.x - this.x;
		const directionY = player.y - this.y;
		const length = Math.sqrt(directionX * directionX + directionY * directionY);

		if (length > 0) {
			const normalizedX = directionX / length;
			const normalizedY = directionY / length;
			this.x -= normalizedX * this.knockback;
			this.y -= normalizedY * this.knockback;
		}
	}

	hitEffect() {
		this.setTint(0xff0000);

		this.scene.time.delayedCall(100, () => {
			if (!this.isDestroyed) {
				this.clearTint();
			}
		});

		this.knockbackEnemy();
	}

	update(letter) {
		if (this.isDestroyed) return;

		if (this.isEnemyOnScreen() && letter) {
			this.updateWord(letter);
		}

		this.moveEnemy();

		if (this.healthText) {
			this.healthText.setPosition(this.x, this.y - this.displayHeight / 2 - 10);
		}
		if (this.debugText) {
			this.debugText.setPosition(this.x, this.y + 40);
		}
	}
}
