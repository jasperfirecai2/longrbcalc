import {Longrb} from "./Longrb.js";
const longrb = new Longrb();
let vars = longrb.get_vars();
let result = 0;

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
          values.map(({id,name,placeholder,className,max,min,type,step,required, defaultChecked, title, defaultValue, oninput}) =>
            m("div", {
                className: "col-sm-12 col-md-6 col-lg-3"
              },
              m("label", {
                  htmlFor: id
                }, name
              ),
              m('input', {id,name,placeholder,min,max,type,step,required,className,defaultValue,defaultChecked,title, oninput})
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



const root = document.getElementById("container");

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
let todisable = [];
function disablefields(name, id) {
  if (name.includes('BB') || name.includes('->')) {
    // this can probably be cleaner but it works
    let root_id = parseInt(document.getElementsByName('evil->normal quirk?')[0].id);
    document.getElementById((root_id + 1).toString()).disabled = vars['evil->normal quirk?'] ? false : vars['can BB evil ngu adv a'];
    document.getElementById((root_id + 3).toString()).disabled = !vars['can BB evil ngu adv a'];
    document.getElementById((root_id + 4).toString()).disabled = vars['evil->normal quirk?'] ? false : vars['can BB evil ngu adv b'];
    document.getElementById((root_id + 6).toString()).disabled = !vars['can BB evil ngu adv b'];
  } else {
    for (let i = id + 1; i <= id + 3; i++) {
      document.getElementById(i.toString()).disabled = !vars[name];
    }

  }
}

function onInputt(event) {
  if ((event.target.min <= event.target.value <= event.target.max)) {
    //console.log(event);
    let name = event.target.name;
    let id = parseInt(event.target.id);
    if (event.target.type === "checkbox") {
      vars[name] = event.target.checked;
      disablefields(name, id);
    } else {
      vars[name] = event.target.value;
    }
  }
}

function inputobjects(key, index) {
  let values = [];
  //console.log(key + " " + index);
  let ret = {
    id: index,
    name: key,
    placeholder: key,
    type: "number",
    step: 1,
    className: "form-control",
    defaultValue: vars[key],
    required: true,
    title: key,
    oninput: function (event) {
      onInputt(event);
      //console.log(event);
    },
    min: 0,
    max: 1e49
  };
  if (key.includes('NGU')) {
    ret.max =  1000000000;
    ret.min = 1000000;
    //ret.defaultValue = 1000000;
    ret.title = "The current lvls in the respective NGU"
  }
  else if (key.includes("percent")) {
    ret.max= key.includes("respawn") ? 100: 10000000;
    ret.min= 1;
    //ret.defaultValue= 100;
    ret.step = 0.01;
    ret.title = `The percentage that your current ${key.includes("respawn") ? "respawn in stat breakdowns" : "NGU ygg"}  shows`
  }
  else if (key === "currentATlvls") {
    ret.max= 200000000;
    ret.min= 100000;
    //ret.defaultValue= 100000;
    ret.title = "The current lvls in AT/BEARd. Assuming you BB em both and they are around the same level"

  } else if (key === "goalmulti") {
    ret.max = 100;
    ret.min = 1.1;
    ret.step = 0.01;
    //ret.defaultValue = 2;
    ret.title = "How much bigger your stats need to be to reach your goal"
  } else if (key.includes("iron pill sucks")) {
      ret.max= (key.includes("1") ? 26 : 4);
      ret.min= 1;
      ret.step= (key.includes("1") ? 5 : 1);
      //ret.defaultValue= 1;
      ret.title = "the current MULTIPLIER for the respective iron pill perk"
  } else if (typeof(vars[key]) === "boolean") {
    ret.type= "checkbox";
    ret.defaultChecked = vars[key];
    if (!vars[key]) {
      todisable.push([key, index])
    }
    ret.required = false;
    ret.title = "Unchecking this box will have the script not calculate the related features and disables the related fields"
  } else if (key.includes('wish')) {
    ret.max = 20;
    ret.title = "The levels you've reached in the cube boosting wish. 0 if not applicable"
  }
  return ret;
}

// thank you @osban


function submitForm(event) {
  let elements = event.target.elements;
  console.log(event);
  for(let i = 0; i < elements.length; i++) {
    if (elements[i].type === "checkbox") {
      vars[elements[i].name] = elements[i].checked;
    }
    else if (elements[i].value !== "") {
      vars[elements[i].name] = elements[i].valueAsNumber;
    }

  }
  //console.log(vars);
  longrb.set_vars(vars);
  result = longrb.run();
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
          onInputt(event);
          console.log(event);
        }
      }), m("button", {
        className: "btn btn-info",
        type: "submit"
      }, "Submit")
      )
    ))]);
  }
};


//let storage = {};
let Home = {
  oninit: vnode => {
    console.log("init");
    //init();
    //console.log(storage);
  },
  oncreate: vnode => {
    console.log("create");
    addvalidation();
    todisable.forEach(value => {
      disablefields(value[0], value[1]);
    });
    todisable = [];
  },
  onupdate: vnode => {
    console.log("update");
    //addvalidation();
  },
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
  view: function view() {
    return m("main", [m("div", {
      className: "col-12"
    }, m("div", {
      className: "card"
    }, m("div", {
      className: "card-header"
    }, "Help"), m("div", {
      className: "card-body"
    }, m("h2", {
      className: "card-title"
    }, "Welcome to this very barebones long rb calculator"), "Warning: this script currently does not account for a few select features, and basically wont be very useful outside evil. It is mostly intended to be used for the last push of exile versions to get to sad.", m("p", null, m("b", null, "THIS SCRIPT CURRENTLY DOES NOT CACHE YOUR INPUTS WHEN YOU REFRESH")), "Some notes about inputs:", m("ul", null, m("li", null, "If you BB only normal ngus, untick the evil-> quirk AND the BB evil ngu boxes"), m("li", null, "Respawn percentage is the value from stat breakdown, not from just gear")), "Yes I know my code sucks. ", m("a", {
      href: "https://github.com/jasperfirecai2/longrbcalc/issues/new"
    }, "Complain about it on github"))))]);
  }
};

//m.mount(root, Home);
m.route(root, "/home", {
  "/home": Home,
  "/help": Help
});
