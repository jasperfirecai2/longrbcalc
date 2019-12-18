import {Longrb} from "./Longrb.js";
let test = new Longrb();
let vars = test.get_vars();
vars['subtotal'] = 14785000000;
vars['basetoughness'] = 873034000;
vars['nguygg'] = 78.9828;
vars['fruitquirk'] = 3;
vars['boostvalue'] = 639678.7;
vars['largestboost'] = 5000;
vars['respawnpercent'] = 19.95;
vars['current'] = 30506000;
vars['currentNGUa'] = 534081000;
vars['currenteNGUa'] = 377627000;
vars['currentNGUb'] = 325233000;
vars['currenteNGUb'] = 262085000;
vars['bps'] = 2.549E+12;
vars['ppppk'] = 4894502;
vars['adv_perk'] = 3;
vars['adv_perk_levels'] = 155;
vars['ironpillsucks1'] = 26;
vars['ironpillsucks2'] = 4;
test.set_vars(vars);

let root = document.getElementById("container");

function onInputt(event) {
  if ((event.target.min <= event.target.value <= event.target.max)) {
    let id = event.target.id;
    console.log(id);
    vars[id] = event.target.value;
    //console.log(vars);
    //console.log(test.get_vars());
    //console.log(test.current);
    //let temp = test.run();
    //console.log(temp);
    //console.log(test.run());
  }

}

function submitForm(event) {
  console.log(event);
  console.log(vars);
  test.set_vars(vars);
  console.log(test.run());
}

let form = {
  view: function view() {
    return m("main", [m("form", {
      className: "form",
      action: "",
      method: "POST",
      onsubmit: function(event) {
        submitForm(event);
        return false;
      }
    }, m("div", {
      className: "form-row"
    }, m("div", {
      className: "col-md-12 col-lg-6"
      }, m("label", {
        htmlFor: "current"
      }, "Current AT/BEARd levels"
      ), m("input", {
        type: "number",
        name: "current",
        id: "current",
        className: "form-control",
        max: 200000000,
        min: 100000,
        required: true,
        oninput: function(event) {
          onInputt(event)
        }
      })
      ), m("div", {
        className: "col-md-12 col-lg-6"
      }, m("label", {
        htmlFor: "current"
      }, "Goalmulti"
      ), m("input", {
        type: "number",
        step: 0.05,
        name: "goalmulti",
        id: "goalmulti",
        className: "form-control",
        max: 100,
        min: 1.1,
        required: true,
        oninput: function(event) {
          onInputt(event)
        }
      }), m("button", {
        className: "btn btn-info",
        type: "submit"
      }, "Submit")
      )
    ))]);
  }
};



let Home = {
  view: function view() {
    return m("main", [// changed the next line
      m("div", {
        className: "row",
        id: "row"
      },
      m("div", {
        className: "col-12"
      }, m("div", {
        className: "card"
      }, m("div", {
        className: "card-header"
      }, "Inputs"), m("div", {
        className: "card-body"
      }, m(form)
        ))))]);
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
