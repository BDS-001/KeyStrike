import Enemy from './enemy.js';

export default class Zombie extends Enemy {
	constructor(scene, id) {
		const zombieOptions = {
			moveSpeed: 40,
			knockback: 80,
			wordCategory: 'easy',
		};

		super(id, scene, 'zombie', zombieOptions);
	}
}
