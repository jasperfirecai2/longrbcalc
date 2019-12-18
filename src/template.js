let root = document.getElementById("row");
let Home = {
  view: () => (
    m("main", [
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
let form = {
  view: () => (
    m("main", [
      <form className="form" action="#" method="POST">
        <div className="form-row">
          <div className="col-md-12 col-6">
            <input type="text" name="current" id="current" value="100000" placeholder="current" className="form-control" onInput={onInput(this.value)}>
              100000
            </input>
            <label htmlFor="current">
              Current AT/BEARd levels
            </label>
          </div>
          <div className="col-md-6 col-2">
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </div>
        </div>
      </form>
    ])
  )
};

m.route(root, "/home", {
  "/home": Home,
  "/help": Help
});
