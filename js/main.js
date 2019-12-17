import {Longrb} from "./Longrb.js";
let test = new Longrb();
test.subtotal = 14785000000;
test.basetoughness = 873034000;
test.nguygg = 78.9828;
test.fruitquirk = 3;
test.boostvalue = 639678.7;
test.largestboost = 5000;
test.respawnpercent = 19.95;
test.current = 30506000;
test.currentNGUa = 534081000;
test.currenteNGUa = 377627000;
test.currentNGUb = 325233000;
test.currenteNGUb = 262085000;
test.bps = 2.549E+12;
test.ppppk = 4894502;
test.adv_perk = 3;
test.adv_perk_levels = 155;
test.ironpillsucks1 = 26;
test.ironpillsucks2 = 4;

let count = 1.1;
let text = 0;
let button = {
  count: 1.1,
  text: 0,
  view : function(vnode) {
    return m("button", {
      className: "btn btn-primary",
      onclick: function () {
        test.goalmulti = 1 + (count++) / 10;
        text = test.run();
      }
      }, text.toFixed(2) + " days " +
         (1 + Math.round((count - 1) / 10 * 10) / 10) +
         " Goalmulti")
  }
};
let root = document.getElementById("row");
let Home = {
  view: function view() {
    return m("main", [// changed the next line
      m("div", {
        className: "col-12"
      }, m("div", {
        className: "card"
      }, m("div", {
        className: "card-header"
      }, "Inputs"), m("div", {
        className: "card-body"
      }, m(button)
        )))]);
  }
};
let Help = {
  view: function view() {
    return m("main", [// changed the next line
      m("div", {
        className: "col-12"
      }, m("div", {
        className: "card"
      }, m("div", {
        className: "card-header"
      }, "Inputs"), m("div", {
        className: "card-body"
      }, "This is a help page")))]);
  }
};
m.route(root, "/home", {
  "/home": Home,
  "/help": Help
});
