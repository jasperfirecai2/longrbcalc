export class Longrb {


	// init
	constructor() {
		this.Boosts = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
		this.largestBoost = 5000;
		this.boostValue = 5000;
		this.advPerks = [[100, 0.001], [1000, 0.001], [10000, 0.0005], [100000, 0.0005], [1000000, 0.0005]];
		this.advPerk = 1;
		this.levelPerks = true;
		this.advPerkLevels = 0;
		this.current = 100000;
		this.baseToughness = 100000;
		this.respawnPercent = 40;
		this.nguYgg = 100;
		this.fruitQuirk = 0;
		this.bps = 0;
		this.ironPillSucks1 = 1;
		this.ironPillSucks2 = 1;
		this.currentNGUa = 1000000;
		this.currenteNGUa = 1000000;
		this.currentNGUb = 1000000;
		this.currenteNGUb = 1000000;
		this.subTotal = 1000000000;
		this.goalMulti = 2;
		this.ppppk = 100000;
		this.bbeNGUa = true;
		this.bbeNGUb = true;
		this.evilToNormalQuirk = true;
		this.doIronPill = true;
		this.eatFruit = true;
		this.poopFruit = false;
		this.preCube = 500000000;
		this.cubeWish = 0;
	}
	/**
   * @method getVars
   * @public
   * @returns {Object}
   */
	getVars() {
		return {
			'current AT lvls': this.current,
			'goal multiplier': this.goalMulti,
			'largest boost': this.largestBoost,
			'boost value': this.boostValue,
			'Cube boosting wish levels': this.cubeWish,
			'subtotal P+T': this.subTotal,
			'subtotal Pre-cube': this.preCube,
			'respawn percentage': this.respawnPercent,
			'push adv perk?': this.levelPerks,
			'pp progress per kill': this.ppppk,
			'adv perk tier': this.advPerk,
			'adv perk current levels': this.advPerkLevels,
			'eat adv fruit?': this.eatFruit,
			'base toughness': this.baseToughness,
			'ngu ygg percentage': this.nguYgg,
			'fertiliser quirk levels': this.fruitQuirk,
			'poop adv fruit?': this.poopFruit,
			'cast iron pill?': this.doIronPill,
			'blood per second': this.bps,
			'iron pill sucks 1 multiplier': this.ironPillSucks1,
			'iron pill sucks 2 multiplier': this.ironPillSucks2,
			'evil->normal quirk?': this.evilToNormalQuirk,
			'current NGU a levels': this.currentNGUa,
			'can BB evil ngu adv a': this.bbeNGUa,
			'current evil NGU a levels': this.currenteNGUa,
			'current NGU b levels': this.currentNGUb,
			'can BB evil ngu adv b': this.bbeNGUb,
			'current evil NGU b levels': this.currenteNGUb

		};
	}
	/**
   * @method setVars
   * @public
   * @param {Object} vars the js object/dict containing the properties to be setting
   */
	setVars(vars) {
		this.largestBoost = parseInt(vars['largest boost']);
		this.boostValue = parseFloat(vars['boost value']);
		this.cubeWish = parseInt(vars['Cube boosting wish levels']);
		this.advPerk = parseInt(vars['adv perk tier']);
		this.advPerkLevels = parseInt(vars['adv perk current levels']);
		this.levelPerks = vars['push adv perk?'];
		this.current = parseInt(vars['current AT lvls']);
		this.baseToughness = parseInt(vars['base toughness']);
		this.respawnPercent = parseFloat(vars['respawn percentage']);
		this.nguYgg = parseFloat(vars['ngu ygg percentage']);
		this.fruitQuirk = parseInt(vars['fertiliser quirk levels']);
		this.bps = parseInt(vars['blood per second']);
		this.ironPillSucks1 = parseInt(vars['iron pill sucks 1 multiplier']);
		this.ironPillSucks2 = parseInt(vars['iron pill sucks 2 multiplier']);
		this.currentNGUa = parseInt(vars['current NGU a levels']);
		this.currenteNGUa = parseInt(vars['current evil NGU a levels']);
		this.currentNGUb = parseInt(vars['current NGU b levels']);
		this.currenteNGUb = parseInt(vars['current evil NGU b levels']);
		this.subTotal = parseInt(vars['subtotal P+T']);
		this.preCube = parseInt(vars['subtotal Pre-cube']);
		this.goalMulti = parseFloat(vars['goal multiplier']);
		this.ppppk = parseInt(vars['pp progress per kill']);
		this.bbeNGUa = vars['can BB evil ngu adv a'];
		this.bbeNGUb = vars['can BB evil ngu adv b'];
		this.evilToNormalQuirk = vars['evil->normal quirk?'];
		this.doIronPill = vars['cast iron pill?'];
		this.eatFruit = vars['eat adv fruit?'];
		this.preCube = parseInt(vars['subtotal Pre-cube']);
		this.poopFruit = vars['poop adv fruit?'];
	}

	/**
   * @method getATstats
   * @private
   * @returns {number}
   * @param {number} levels Levels in Advanced Training
   */
	getATstats(levels) {
		const bonus = Math.pow(levels, 0.4) / 10;
		return 1 + bonus;
	}

	/**
   * @method getBEARdstats
   * @private
   * @returns {number}
   * @param {number} levels Levels in BEARd
   */
	getBEARdstats(levels) {
		const bonus = Math.pow(levels, 0.3) * 125.9 / 10;
		return 1 + bonus;
	}

	/**
   * @method nNGUastats
   * @private
   * @returns {number}
   * @param {number} levels Levels in normal NGU adv α
   */
	nNGUastats(levels) {
		if (levels > 1e9) levels = 1e9;
		if (!this.evilToNormalQuirk && this.bbeNGUa) {
			return 1;
		}
		const bonus = Math.sqrt(levels) * 3.17 / 100;
		return 1 + bonus;
	}

	/**
   * @method eNGUastats
   * @private
   * @returns {number}
   * @param {number} levels Levels in evil NGU adv α
   */
	eNGUastats(levels) {
		if (levels > 1e9) levels = 1e9;
		if (!this.bbeNGUa) {
			return 1;
		}
		const bonus = Math.pow(levels, 0.25) * 8.8945 / 100;
		return 1 + bonus;
	}

	/**
   * @method nNGUbstats
   * @private
   * @returns {number}
   * @param {number} levels Levels in normal NGU adv β
   */
	nNGUbstats(levels) {
		if (levels > 1e9) levels = 1e9;
		if (!this.evilToNormalQuirk && this.bbeNGUb) {
			return 1;
		}
		const bonus = Math.pow(levels, 0.4) * 1.894 / 100;
		return 1 + bonus;
	}

	/**
   * @method eNGUbstats
   * @private
   * @returns {number}
   * @param {number} levels Levels in evil NGU adv β
   */
	eNGUbstats(levels) {
		if (levels > 1e9) levels = 1e9;
		if (!this.bbeNGUb) {
			return 1;
		}
		const bonus = Math.pow(levels, 0.25) * 2.6675 / 100;
		return 1 + bonus;
	}
	/**
   * @method cubegains
   * @private
   * @summary Calculates the P/T gained from boosting cube before softcap
   * @returns {number}
   * @param {number} boostValue how much P/T/S a boost gives
   * @param {number} podTime how much time was spent in the ITOPOD
   * @param {number} recycling The ratio of how much more a boost gives due to recycling
   * @param {number} respawn The time it takes in seconds for an enemy to respawn in the ITOPOD
   * @param {number} cubeWish The levels gained in the cube boosting wish
   * @param {number} cubeRatioBase The base ratio of boost conversion into the Infinity Cube
   * @param {number} idleCD The cooldown of idle attack. This cooldown applies before the initial attack of a new enemy
   */
	cubegains(boostValue, podTime, recycling, respawn, cubeWish = 0, cubeRatioBase = 0.01, idleCD = 0.8) {
		const spawnTime = respawn + idleCD;
		const cubeRatio = cubeRatioBase * (1 + (cubeWish * 0.05));
		const cubeEquivalent = boostValue * recycling * cubeRatio;
		return Math.floor(podTime / spawnTime * 0.14) * cubeEquivalent;
	}
	/**
   * @method fruitgains
   * @private
   * @summary Calculates the P/T gained from harvesting fruit of adventure
   * @returns {number}
   * @param {number} baseToughness the current base toughness
   * @param {number} firstHarvest the multiplier from the first harvest perk
   * @param {number} equipYggYield the bonus to Yggdrasil yield from equipment
   * @param {number} tier the tier of the harvested fruit
   * @param {number} blueheart whether or not the blue heart set bonus is obtained
   * @param {number} poop whether or not poop is used
   */
	fruitgains(baseToughness, firstHarvest = 1.5, equipYggYield = 1.63, tier = 24, blueheart = 1.1, poop = 1.0) {
		if (this.poopFruit) poop = 1.5;
		return Math.floor(Math.ceil(Math.pow(tier, 1.5))
      * (poop * blueheart)
      * Math.pow(baseToughness, 0.2)
      * (this.nguYgg / 100)
      * equipYggYield * firstHarvest);
	}

	/**
   * @method ironpill
   * @private
   * @summary Calculates the P/T gained from casting iron pill
   * @returns {number}
   * @param {number} ritualCastDuration how long rituals have been going before the next pill
   */
	ironpill(ritualCastDuration = 11.5 * 60 * 60) {
		const spentBlood = this.bps * ritualCastDuration;
		return Math.floor(Math.pow(spentBlood, 0.25) * this.ironPillSucks1 * this.ironPillSucks2);
	}

	/**
   * @method ppgains
   * @private
   * @summary Calculates the relative P/T gained from levelling up 'adv stats for rich perks'
   * @returns {number}
   * @param {number} podTime the time spent in the ITOPOD
   * @param {number} respawn The time it takes in seconds for an enemy to respawn in the ITOPOD
   * @param {number} idleCD The cooldown of idle attack. This cooldown applies before the initial attack of a new enemy
   */
	ppgains(podTime, respawn, idleCD = 0.8) {
		const spawnTime = respawn + idleCD;
		const pp = Math.floor(podTime / spawnTime) * this.ppppk / 1000000;
		const perkLevels = Math.floor(pp / this.advPerks[parseInt(this.advPerk) - 1][0]);
		const bonus = this.advPerks[parseInt(this.advPerk) - 1][1] * perkLevels;
		return this.currentAdvPerkBonus + bonus;
	}

	/**
   * @method run
   * @public
   * @summary does the magic
   * @returns {number|string}
   */
	run() {
		let sum = 0;
		this.index = this.Boosts.indexOf(this.largestBoost);
		this.Boosts.slice(this.index).forEach((item) => {
			sum += item;
		});
		const recycling = sum / this.largestBoost;
		let { baseToughness } = this;
		const respawn = Math.ceil(50 * (4 * this.respawnPercent / 100)) / 50;
		this.currentAdvPerkBonus = 1 + (this.advPerks[parseInt(this.advPerk) - 1][1] * this.advPerkLevels);
		const currentAT = this.getATstats(this.current);
		const currentBEARd = this.getBEARdstats(this.current);
		const initialMulti = currentBEARd * currentAT
      * this.eNGUastats(this.currenteNGUa)
      * this.nNGUastats(this.currentNGUa)
      * this.eNGUbstats(this.currenteNGUb)
      * this.nNGUbstats(this.currentNGUb)
      * this.currentAdvPerkBonus;
		const cubeValue = this.subTotal - this.preCube;

		let fruit;
		let ironStats;
		const counters = [0, 0];
		let harvests;
		for (let i = this.current + 50; i < (50 * 60 * 60 * 24 * 100) + this.current; i += 50 * 60) {
			const start = i - this.current;
			if (start / 50 / 60 / 60 / 11.5 >= 1) {
				harvests = this.eatFruit ? Math.floor(start / 50 / 60 / (60 - this.fruitQuirk) / 24) : 0;
				const ironPills = this.doIronPill ? Math.floor(start / 50 / 60 / 60 / 11.5) : 0;
				if (harvests === 1) {
					fruit = this.fruitgains(baseToughness);
				} else if (harvests > 1) {
					fruit = this.fruitgains(baseToughness) + ((harvests - 1) * this.fruitgains(baseToughness, 1));
				}
				ironStats = this.ironpill() * ironPills;
				if (harvests > counters[0]) {
					counters[0] = harvests;
					baseToughness += this.fruitgains(baseToughness, harvests > 1 ? 1 : 1.5);
				} if (ironPills > counters[1]) {
					counters[1] = ironPills;
					baseToughness += this.ironpill();
				}
			} else {
				fruit = 0;
				ironStats = 0.0;
			}
			let cube = this.cubegains(this.boostValue, (i - this.current) / 50, recycling, respawn, this.cubeWish, 0.02);
			const perks = this.levelPerks ? this.ppgains(start / 50, respawn) : this.currentAdvPerkBonus;
			let statIncrease = this.preCube + fruit + ironStats;
			if ((cubeValue + cube) > statIncrease) {
				const leftover = cubeValue + cube - statIncrease;
				cube = cube - leftover + Math.sqrt(leftover);
			}
			statIncrease = (this.subTotal + fruit + ironStats + cube) / this.subTotal;
			const currentMulti = this.getATstats(i)
        * this.getBEARdstats(i)
        * this.nNGUastats(start + this.currentNGUa)
        * this.eNGUastats(start + this.currenteNGUa)
        * this.nNGUbstats(start + this.currentNGUb)
        * this.eNGUbstats(start + this.currenteNGUb)
        * perks
        * statIncrease;
			if (currentMulti >= initialMulti * this.goalMulti) {
				const timeNeeded = (i - this.current) / (50 * 60 * 60 * 24);
				if (this.eatFruit && harvests > 0) {
					console.log(`your amazing fruit of adventure yielded you ${fruit} base stats!`);
				}
				return timeNeeded;
			}
		}
		return 'too long';
	}

}
