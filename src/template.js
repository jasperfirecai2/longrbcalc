let root = document.getElementById("row");
let Home = {
  view: () => (
    m("main", [
      // changed the next line
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            Inputs
          </div>
          <div className="card-body">
          </div>
        </div>
      </div>
    ])
  )
};
let Help = {
  view: () => (
    m("main", [
      // changed the next line
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            Inputs
          </div>
          <div className="card-body">
            This is a help page
          </div>
        </div>
      </div>
    ])
  )
};


m.route(root, "/home", {
  "/home": Home,
  "/help": Help
});
