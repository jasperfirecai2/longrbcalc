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
  console.log(key + " " + index);
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
      required: true
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
    }
  } else {
    return {
      id: index,
      name: key,
      placeholder: key,
      className: "form-control",
      max: 1000000,
      min: 1,
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
          values.map(({id,name,placeholder,className,max,min,type,step,required}) =>
            m("div", {
              className: "col-md-12 col-lg-6"
            },
              m("label", {
                  htmlFor: id
                }, name
              ),
              m('input', {id,name,placeholder,min,max,type,step,required,className})
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
  console.log(event);
  console.log(vars);
  test.set_vars(vars);
  alert(`you would need ${test.run()} days (estimate)`);
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
