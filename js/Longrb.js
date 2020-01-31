export class Longrb
{



  //init
  constructor() {
    this.Boosts = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    this.largestboost = 5000; //largest boost
    this.boostvalue= 5000;
    this.adv_perks = [[100, 0.001], [1000, 0.001], [10000, 0.0005], [100000, 0.0005], [1000000, 0.0005]];
    this.adv_perk = 1;
    this.level_perks = true;
    this.adv_perk_levels = 0;
    this.current = 100000; //current
    this.basetoughness = 100000; //toughness
    this.respawnpercent = 40;
    this.nguygg = 100;
    this.fruitquirk = 0;
    this.bps = 0;
    this.ironpillsucks1 = 1;
    this.ironpillsucks2 = 1;
    this.currentNGUa = 1000000;
    this.currenteNGUa = 1000000;
    this.currentNGUb = 1000000;
    this.currenteNGUb = 1000000;
    this.subtotal = 1000000000;
    this.goalmulti = 2;
    this.ppppk = 100000;
    this.bbeNGUa = true;
    this.bbeNGUb = true;
    this.evil_normal_quirk = true;
    this.doironpill = true;
    this.eatfruit = true;
    this.pre_cube = 500000000;
    this.cube_wish = 0;
  }

  get_vars() {
    return {
      "current AT lvls": this.current,
      "goal multiplier": this.goalmulti,
      "largest boost": this.largestboost,
      "boost value": this.boostvalue,
      "Cube boosting wish levels": this.cube_wish,
      "subtotal P+T": this.subtotal,
      "subtotal Pre-cube": this.pre_cube,
      "respawn percentage": this.respawnpercent,
      "push adv perk?": this.level_perks,
      "pp progress per kill": this.ppppk,
      "adv perk tier": this.adv_perk,
      "adv perk current levels": this.adv_perk_levels,
      "eat adv fruit?": this.eatfruit,
      "base toughness": this.basetoughness,
      "ngu ygg percentage": this.nguygg,
      "fertiliser quirk levels": this.fruitquirk,
      "cast iron pill?": this.doironpill,
      "blood per second": this.bps,
      "iron pill sucks 1 multiplier": this.ironpillsucks1,
      "iron pill sucks 2 multiplier": this.ironpillsucks2,
      "evil->normal quirk?": this.evil_normal_quirk,
      "current NGU a levels": this.currentNGUa,
      "can BB evil ngu adv a": this.bbeNGUa,
      "current evil NGU a levels": this.currenteNGUa,
      "current NGU b levels": this.currentNGUb,
      "can BB evil ngu adv b": this.bbeNGUb,
      "current evil NGU b levels": this.currenteNGUb

    };
  }

  set_vars(vars) {
    this.largestboost = parseInt(vars['largest boost']);
    this.boostvalue = parseFloat(vars['boost value']);
    this.cube_wish = parseInt(vars["Cube boosting wish levels"]);
    this.adv_perk = parseInt(vars['adv perk tier']);
    this.adv_perk_levels = parseInt(vars['adv perk current levels']);
    this.level_perks = vars['push adv perk?'];
    this.current = parseInt(vars['current AT lvls']);
    this.basetoughness = parseInt(vars['base toughness']);
    this.respawnpercent = parseFloat(vars['respawn percentage']);
    this.nguygg = parseFloat(vars['ngu ygg percentage']);
    this.fruitquirk = parseInt(vars['fertiliser quirk levels']);
    this.bps = parseInt(vars['blood per second']);
    this.ironpillsucks1 = parseInt(vars['iron pill sucks 1 multiplier']);
    this.ironpillsucks2 = parseInt(vars['iron pill sucks 2 multiplier']);
    this.currentNGUa = parseInt(vars['current NGU a levels']);
    this.currenteNGUa = parseInt(vars['current evil NGU a levels']);
    this.currentNGUb = parseInt(vars['current NGU b levels']);
    this.currenteNGUb = parseInt(vars['current evil NGU b levels']);
    this.subtotal = parseInt(vars['subtotal P+T']);
    this.pre_cube = parseInt(vars['subtotal Pre-cube']);
    this.goalmulti = parseFloat(vars['goal multiplier']);
    this.ppppk = parseInt(vars['pp progress per kill']);
    this.bbeNGUa = vars["can BB evil ngu adv a"];
    this.bbeNGUb = vars["can BB evil ngu adv b"];
    this.evil_normal_quirk = vars["evil->normal quirk?"];
    this.doironpill = vars["cast iron pill?"];
    this.eatfruit = vars["eat adv fruit?"];
    this.pre_cube = parseInt(vars["subtotal Pre-cube"]);
  }

  /**
   * @return {number}
   */
  ATstats(x) {
    return 1 + Math.pow(x, 0.4) / 10;
  }

  /**
   * @return {number}
   */
  BEARdstats(x) {
    return 1 + Math.pow(x, 0.3) * 125.9 / 10;
  }

  /**
   * @return {number}
   */
  NGUastats(x) {
    if (x > 1e9) x = 1e9;
    if (!this.evil_normal_quirk && this.bbeNGUa) {
      return 1;
    }
    return 1 + Math.sqrt(x) * 3.17 / 100;
  }

  /**
   * @return {number}
   */
  eNGUastats(x) {
    if (x > 1e9) x = 1e9;
    if (!this.bbeNGUa) {
      return 1;
    }
    return 1 + Math.pow(x, 0.25) * 8.8945 / 100;
  }

  /**
   * @return {number}
   */
  NGUbstats(x) {
    if (x > 1e9) x = 1e9;
    if (!this.evil_normal_quirk && this.bbeNGUb) {
      return 1;
    }
    return 1 + Math.pow(x, 0.4) * 1.894 / 100;
  }

  /**
   * @return {number}
   */
  eNGUbstats(x) {
    if (x > 1e9) x = 1e9;
    if (!this.bbeNGUb) {
      return 1;
    }
    return 1 + Math.pow(x, 0.25) * 2.6675 / 100;
  }

  cubegains(value, time_in_pod, recycling, respawn, cube_wish = 0, base_cube_ratio = 0.01 /*The base is 0.01 but the script uses 0.02 since i would assume you have 100pp to spend*/, idle_cd = 0.8) {
    const cube_ratio = base_cube_ratio * (1 + cube_wish * 0.05);
    const cube_equivalent = value * recycling * cube_ratio;
    return Math.floor(time_in_pod / (respawn + idle_cd) * 0.14) * cube_equivalent;
  }

  fruitgains(basetoughness, firstHarvest = 1.5, yggyield_equip = 1.63, tier = 24, blueheart = 1.1, poop = 1.5) {
    return Math.floor(Math.ceil(Math.pow(tier, 1.5)) *
      (poop * blueheart) *
      Math.pow(basetoughness, 0.2) *
      (this.nguygg/100) *
      yggyield_equip * firstHarvest);
  }


  ironpill(time_making_blood = 11.5 * 60 * 60) {
    const blood_spent = this.bps * time_making_blood;
    return Math.floor(Math.pow(blood_spent, 0.25) * this.ironpillsucks1 * this.ironpillsucks2);
  }

  ppgains(time_in_pod, respawn, idle_cd = 0.8) {
    const pp = Math.floor(time_in_pod / (respawn + idle_cd)) * this.ppppk / 1000000;
    const perklevels = Math.floor(pp / this.adv_perks[parseInt(this.adv_perk) - 1][0]);
    return this.adv_perk_current_bonus + this.adv_perks[parseInt(this.adv_perk) - 1][1] * perklevels;
  }


  run() {
    let sum = 0;
    this.index = this.Boosts.indexOf(this.largestboost);
    this.Boosts.slice(this.index).forEach(function (item) {
      sum += item;
    });
    const recycling = sum / this.largestboost;
    let basetoughness = this.basetoughness;
    const respawn = Math.ceil(50 * (4 * this.respawnpercent / 100)) / 50; //actual respawn
    this.adv_perk_current_bonus = 1 + this.adv_perks[parseInt(this.adv_perk) - 1][1] * this.adv_perk_levels;
    const currentAT = this.ATstats(this.current);
    const currentBEARd = this.BEARdstats(this.current);
    const totalmulti = currentBEARd * currentAT *
      this.eNGUastats(this.currenteNGUa) *
      this.NGUastats(this.currentNGUa) *
      this.eNGUbstats(this.currenteNGUb) *
      this.NGUbstats(this.currentNGUb) *
      this.adv_perk_current_bonus;
    const cubevalue = this.subtotal-this.pre_cube;

    let fruit;
    let ironstats;
    let counters = [0, 0];
    let harvests;
    for (let i = this.current + 50; i < 50 * 60 * 60 * 24 * 100 + this.current; i += 50 * 60) {
      const start = i - this.current;
      if (start / 50 / 60 / 60 / 11.5 >= 1) {
        harvests = this.eatfruit ? Math.floor(start / 50 / 60 / (60 - this.fruitquirk) / 24) : 0;
        const ironpills = this.doironpill ? Math.floor(start / 50 / 60 / 60 / 11.5) : 0;
        if (harvests === 1) {
          fruit = this.fruitgains(basetoughness);
        } else if (harvests > 1) {
          fruit = this.fruitgains(basetoughness) + (harvests - 1) * this.fruitgains(basetoughness, 1);
        }
          ironstats = this.ironpill() * ironpills;
          if (harvests > counters[0]) {
            counters[0] = harvests;
            basetoughness += this.fruitgains(basetoughness, harvests > 1 ? 1 : 1.5);
          } if (ironpills > counters[1]) {
            counters[1] = ironpills;
            basetoughness += this.ironpill();
          }

      } else {
        fruit = 0;
        ironstats = 0.0;
      }
      let cube = this.cubegains(this.boostvalue, ((i - this.current) / 50), recycling, respawn, this.cube_wish, 0.02);
      const perks = this.level_perks ? this.ppgains(((start) / 50), respawn) : this.adv_perk_current_bonus;
      let statincrease = this.pre_cube + fruit + ironstats;
      if ((cubevalue + cube) > statincrease) {
        let leftover = cubevalue + cube - statincrease;
        cube = cube - leftover + Math.sqrt(leftover);
      }
      statincrease = (this.subtotal + fruit + ironstats + cube) / this.subtotal;
      const ttemp = this.ATstats(i) *
        this.BEARdstats(i) *
        this.NGUastats(start + this.currentNGUa) *
        this.eNGUastats(start + this.currenteNGUa) *
        this.NGUbstats(start + this.currentNGUb) *
        this.eNGUbstats(start + this.currenteNGUb) *
        perks *
        statincrease;
      if (ttemp >= totalmulti * this.goalmulti) {
        const ttime = (i - this.current) / (50 * 60 * 60 * 24);
        // console.log(`\n\nYou would need ${ttime} days (estimate)\n\n\n` +
        //   'This script currently still does not account for:\n' +
        //   'Money pit (and probably won\'t cuz it\'s rng\n' +
        //   'Buying base stats\n' +
        //   'Cube softcap\n' +
        //   'Non-adv NGU gains\n' +
        //   'Pretty much anything sadistic\n' +
        //   'This script DOES account for:\n' +
        //   'Cube gains\n' +
        //   'Adv perk levels\n' +
        //   'Fruit of adventure (lol)(first harvest assumed for first one)\n' +
        //   'Iron pills\n' +
        //   'Ngu (a, b, evil, normal)\n' +
        //   'AT/BEARd levels\n'
        // );
        if (this.eatfruit && harvests > 0) {
          console.log(`your amazing fruit of adventure yielded you ${fruit} base stats!`);
        }
        return ttime;
      }
    }
    return "too long";
  }
}
