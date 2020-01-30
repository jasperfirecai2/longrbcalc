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
            Help
          </div>
          <div className="card-body">
            <h2 className="card-title">
              Welcome to this very barebones long rb calculator
            </h2>
            Warning: this script currently does not account for a few select features, and basically wont be very useful outside evil.
            It is mostly intended to be used for the last push of exile versions to get to sad.
            <p>
              <b>THIS SCRIPT CURRENTLY DOES NOT CACHE YOUR INPUTS WHEN YOU REFRESH</b>
            </p>
            Some notes about inputs:
            <ul>
              <li>If you BB only normal ngus, untick the evil-> quirk AND the BB evil ngu boxes</li>
              <li>Resapwn percentage is the value from stat breakdown, not from just gear</li>
            </ul>
            Yes I know my code sucks. <a href="https://github.com/jasperfirecai2/longrbcalc/issues/new">Complain about it on github</a>
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
let output = {
  view: () => (
    m("main", [
      <p id="Time">Time needed: <b>0 days</b></p>
    ]
    )
  )
};
m.route(root, "/home", {
  "/home": Home,
  "/help": Help
});
