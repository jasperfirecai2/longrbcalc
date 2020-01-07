import {Longrb} from "./Longrb.js";
let test = new Longrb();
let vars = test.get_vars();
let result = 0;
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

// thank you @osban
let app = () => {
  const values = [
    {id: 1, name: 'foo', placeholder: 'foo'},
    {id: 2, name: 'bar', placeholder: 'bar'},
    {id: 3, name: 'baz', placeholder: 'baz'}
  ];
  return {
    view: () =>
      m('form',
        values.map(({id,name,placeholder}) =>
          m('p',
            m('input', {id,name,placeholder}, 'click')
          )
        )
      )
  }
};


function onInputt(event) {
  if ((event.target.min <= event.target.value <= event.target.max)) {
    let name = event.target.name;
    vars[name] = event.target.value;
    //console.log(vars);
    //console.log(test.get_vars());
    //console.log(test.current);
    //let temp = test.run();
    //console.log(temp);
    //console.log(test.run());
  }

}

function inputobjects(key, index) {
  let values = [];
  //console.log(key + " " + index);
  if (key.includes('NGU')) {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      max: 1000000000,
      min: 1000000,
      type: "number",
      step: 1,
      required: true,
      defaultValue: 1000000
    }

  } else if (key === "current") {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      max: 200000000,
      min: 100000,
      type: "number",
      step: 50,
      required: true,
      defaultValue: 100000
    }
  } else if (key === "goalmulti") {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      max: 100,
      min: 1.1,
      type: "number",
      step: 0.01,
      required: true,
      defaultValue: 2
    }
  } else if (key.includes("ironpill")) {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      max: (key === "ironpillsucks1" ? 26 : 4),
      min: 1,
      type: "number",
      step: 1,
      required: true,
      defaultValue: 1
    }
  } else {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      min: 0,
      type: "number",
      step: 0.01,
      required: false,
    }
  }
}

// thank you @osban
let inputs = () => {
  let values = [];
  Object.keys(vars).forEach((key, index) =>  values.push( inputobjects(key, index)));
  return {
    view: () =>
      m("form", {
        className: "form needs-validation",
        method: "POST",
        novalidate: "",
          onsubmit: function(event) {
          event.preventDefault();
          if (!event.target.checkValidity()) {
            return false
          }
          submitForm(event);
          return false
        }
      },
        m("div", {
          className: "form-row"
        },
          values.map(({id,name,placeholder,className,max,min,type,step,required, defaultValue}) =>
            m("div", {
              className: "col-sm-12 col-md-6 col-lg-3"
            },
              m("label", {
                  htmlFor: id
                }, name
              ),
              m('input', {id,name,placeholder,min,max,type,step,required,className, defaultValue})
            )
          ),
            m("button", {
            className: "btn btn-info",
              type: "submit"
          }, "Submit")
        )
      )
  }
};

function submitForm(event) {
  let elements = event.target.elements;
  console.log(event);
  for(let i = 0; i < elements.length; i++) {
    if (elements[i].value !== "") {
      vars[elements[i].name] = elements[i].valueAsNumber;
    }

  }
  console.log(vars);
  test.set_vars(vars);
  result = test.run();
}

let form = {
  view: function view() {
    return m("main", [m("form", {
      className: "form needs-validation",
      method: "POST",
      novalidate: "",
      onsubmit: function(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
          return false
        }
        submitForm(event);
        return false
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
            }, m(inputs)
          ), m("p", {
            id: "Time"
          }, "Time needed: ", m("b", null, `${result} days`))
          )
        )
      )]);
  }
};
let Help = {
  view: () => {
    return m("main", [
      m("div", {
      className: "col-12"
    }, m("div", {
      className: "card"
    }, m("div", {
      className: "card-header"
    }, "Help"), m("div", {
      className: "card-body"
    }, m("h2", {
      className: "card-title"
    }, "Welcome to this very barebones long rb calculator"), "Warning: this script currently does not account for a few select features, and basically wont be very useful in sadistic. It is mostly intended to be used for the last push of exile versions to get to sad.", m("p", null, m("b", null, "THIS SCRIPT CURRENTLY DOES NOT CACHE YOUR INPUTS WHEN YOU REFRESH, RE-OPEN, OR GO TO THE HELP PAGE")), "There also appears to be a bug causing form validation to not visually show when you navigate different pages. Yes I know my code sucks. ", m("a", {
      href: "https://github.com/jasperfirecai2/longrbcalc/issues/new"
    }, "Complain about it on github"))))]);
  }
};

m.mount(root, Home);
//m.route(root, "/home", {
//  "/home": Home,
//  "/help": Help
//});
