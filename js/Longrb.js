export class Longrb
{



  //init
  constructor() {
    this.Boosts = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    this.largestboost = 5000; //largest boost
    this.boostvalue= 5000;
    this.base_blood = [50.0, 40.0, 30.0, 20.0, 15.0, (250 / 18), (320 / 25)];  // how much more blood the next ritual gives
    this.base_blood.reverse();
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
    this.eatfruit = false;
    this.pre_cube = 500000000;
  }

  get_vars() {
    return {
      "largestboost": this.largestboost,
      "boostvalue": this.boostvalue,
      "adv_perk_tier": this.adv_perk,
      "adv_perk_current_levels": this.adv_perk_levels,
      "push_adv_perk": this.level_perks,
      "currentATlvls": this.current,
      "basetoughness": this.basetoughness,
      "respawnpercent": this.respawnpercent,
      "nguyggpercent": this.nguygg,
      "fruitquirklevels": this.fruitquirk,
      "bps": this.bps,
      "ironpillsucks1multi": this.ironpillsucks1,
      "ironpillsucks2multi": this.ironpillsucks2,
      "currentNGUalevels": this.currentNGUa,
      "currenteNGUalevels": this.currenteNGUa,
      "currentNGUblevels": this.currentNGUb,
      "currenteNGUblevels": this.currenteNGUb,
      "subtotalP+T": this.subtotal,
      "subtotal_Pre-cube": this.pre_cube,
      "goalmulti": this.goalmulti,
      "pp progress per kill": this.ppppk,
      "evil->normal quirk": this.evil_normal_quirk,
      "BB evil ngu adv a": this.bbeNGUa,
      "BB evil ngu adv b": this.bbeNGUb,
      "cast iron pill": this.doironpill,
      "eat adv fruit": this.eatfruit
    };
  }

  set_vars(vars) {
    this.largestboost = parseInt(vars['largestboost']);
    this.boostvalue = parseFloat(vars['boostvalue']);
    this.adv_perk = parseInt(vars['adv_perk_tier']);
    this.adv_perk_levels = parseInt(vars['adv_perk_current_levels']);
    this.level_perks = vars['push_adv_perk'];
    this.current = parseInt(vars['currentATlvls']);
    this.basetoughness = parseInt(vars['basetoughness']);
    this.respawnpercent = parseFloat(vars['respawnpercent']);
    this.nguygg = parseFloat(vars['nguyggpercent']);
    this.fruitquirk = parseInt(vars['fruitquirklevels']);
    this.bps = parseInt(vars['bps']);
    this.ironpillsucks1 = parseInt(vars['ironpillsucks1multi']);
    this.ironpillsucks2 = parseInt(vars['ironpillsucks2multi']);
    this.currentNGUa = parseInt(vars['currentNGUalevels']);
    this.currenteNGUa = parseInt(vars['currenteNGUalevels']);
    this.currentNGUb = parseInt(vars['currentNGUblevels']);
    this.currenteNGUb = parseInt(vars['currenteNGUblevels']);
    this.subtotal = parseInt(vars['subtotalP+T']);
    this.pre_cube = parseInt(vars['subtotal_Pre-cube']);
    this.goalmulti = parseFloat(vars['goalmulti']);
    this.ppppk = parseInt(vars['pp progress per kill']);
    this.bbeNGUa = vars["BB evil ngu adv a"];
    this.bbeNGUb = vars["BB evil ngu adv b"];
    this.evil_normal_quirk = vars["evil->normal quirk"];
    this.doironpill = vars["cast iron pill"];
    this.eatfruit = vars["eat adv fruit"];
    this.pre_cube = parseInt(vars["subtotal_Pre-cube"]);
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
    return 1 + Math.pow(x, 0.3) * 125.9 / 10
  }

  /**
   * @return {number}
   */
  NGUastats(x) {
    if (x > 1e9) {x = 1e9}
    if (!this.evil_normal_quirk && this.bbeNGUa) {
      return 1;
    }
    return 1 + Math.sqrt(x) * 3.17 / 100
  }

  /**
   * @return {number}
   */
  eNGUastats(x) {
    if (x > 1e9) {x = 1e9}
    if (!this.bbeNGUa) {
      return 1;
    }
    return 1 + Math.pow(x, 0.25) * 8.8945 / 100
  }

  /**
   * @return {number}
   */
  NGUbstats(x) {
    if (x > 1e9) {x = 1e9}
    if (!this.evil_normal_quirk && this.bbeNGUb) {
      return 1;
    }
    return 1 + Math.pow(x, 0.4) * 1.894 / 100
  }

  /**
   * @return {number}
   */
  eNGUbstats(x) {
    if (x > 1e9) {x = 1e9}
    if (!this.bbeNGUb) {
      return 1;
    }
    return 1 + Math.pow(x, 0.25) * 2.6675 / 100
  }

  cubegains(value, time_in_pod, recycling, respawn, cube_wish = 0, base_cube_ratio = 0.01, idle_cd = 0.8) {
    let cube_ratio = base_cube_ratio * (1 + cube_wish * 0.05);
    let cube_equivalent = value * recycling * cube_ratio;
    return Math.floor(time_in_pod / (respawn + idle_cd) * 0.14) * cube_equivalent;
  }

  fruitgains(basetoughness, firstHarvest = 1.5, yggyield_equip = 1.63, tier = 24, blueheart = 1.1, poop = 1.5) {
    return Math.ceil(Math.pow(tier, 1.5)) *
      (poop * blueheart) *
      Math.pow(basetoughness, 0.2) *
      (this.nguygg/100) *
      yggyield_equip * firstHarvest;
  }


  ironpill(time_making_blood = 11.5 * 60 * 60) {
    let blood_spent = this.bps * time_making_blood;
    let temp = this.bps;
    this.base_blood.forEach(function (b) {
      temp = temp / b;
      blood_spent += temp * time_making_blood;
    });
    return Math.pow(blood_spent, 0.25) * this.ironpillsucks1 * this.ironpillsucks2;
  }

  ppgains(time_in_pod, respawn, idle_cd = 0.8) {
    let pp = Math.floor(time_in_pod / (respawn + idle_cd)) * this.ppppk / 1000000;
    let perklevels = Math.floor(pp / this.adv_perks[parseInt(this.adv_perk) - 1][0]);
    return this.adv_perk_current_bonus + this.adv_perks[parseInt(this.adv_perk) - 1][1] * perklevels;
  }


  run() {
    let sum = 0;
    this.index = this.Boosts.indexOf(this.largestboost);
    this.Boosts.slice(this.index).forEach(function (item) {
      sum += item;
    });
    let recycling = sum / this.largestboost;
    let basetoughness = this.basetoughness;
    let respawn = Math.ceil(50 * (4 * this.respawnpercent / 100)) / 50; //actual respawn
    this.adv_perk_current_bonus = 1 + this.adv_perks[parseInt(this.adv_perk) - 1][1] * this.adv_perk_levels;
    let currentAT = this.ATstats(this.current);
    let currentBEARd = this.BEARdstats(this.current);
    let totalmulti = currentBEARd * currentAT *
      this.eNGUastats(this.currenteNGUa) *
      this.NGUastats(this.currentNGUa) *
      this.eNGUbstats(this.currenteNGUb) *
      this.NGUbstats(this.currentNGUb) *
      this.adv_perk_current_bonus;
    let cubevalue = this.subtotal-this.pre_cube;

    let fruit;
    let ironstats;
    for (let i = this.current + 50; i < 50 * 60 * 60 * 24 * 100 + this.current; i += 50 * 60) {
      let start = i - this.current;
      if (start / 60 / 60 / 11.5 >= 1) {
        let harvests = this.eatfruit ? Math.floor(start / 60 / (60 - this.fruitquirk) / 24) : 0;
        let ironpills = this.doironpill ? Math.floor(start / 60 / 60 / 11.5) : 0;
        if (harvests === 1) {
          fruit = this.fruitgains(basetoughness);
        } else {
          fruit = this.fruitgains(basetoughness) + (harvests - 1) * this.fruitgains(basetoughness, 1);
        }
          ironstats = this.ironpill() * ironpills;
          basetoughness = this.basetoughness + fruit + ironstats;

      } else {
        fruit = 0;
        ironstats = 0.0;
      }
      let cube = this.cubegains(this.boostvalue, ((i - this.current) / 50), recycling, respawn, 20, 0.02);
      let perks = this.level_perks ? this.ppgains(((start) / 50), respawn) : this.adv_perk_current_bonus;
      let statincrease = this.pre_cube + fruit + ironstats;
      if ((cubevalue + cube) > statincrease) {
        let leftover = cubevalue + cube - statincrease;
        cube = cube - leftover + Math.sqrt(leftover);
      }
      statincrease = (this.subtotal + fruit + ironstats + cube) / this.subtotal;
      let ttemp = this.ATstats(i) *
        this.BEARdstats(i) *
        this.NGUastats(start + this.currentNGUa) *
        this.eNGUastats(start + this.currenteNGUa) *
        this.NGUbstats(start + this.currentNGUb) *
        this.eNGUbstats(start + this.currenteNGUb) *
        perks *
        statincrease;
      if (ttemp >= totalmulti * this.goalmulti) {
        let ttime = (i - this.current) / (50 * 60 * 60 * 24);
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
        console.log(`your amazing fruit of adventure yielded you ${fruit} base stats!`);
        return ttime;
      }
    }
    return "too long";
  }
}
