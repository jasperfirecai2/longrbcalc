import { Longrb } from './Longrb.js';
let test = new Longrb();
let time = test.run();
console.log(time);
let root = document.body;
let count = 0;
let Hello = {
  view: function() {
    return m("main", [
      m("h1", {class: "title"}, "My first app"),
      // changed the next line
      m("button", {onclick: function() {count++}}, count + " clicks"),
    ])
  }
};

m.mount(root, Hello);
