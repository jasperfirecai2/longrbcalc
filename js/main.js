import { Longrb } from './Longrb.js';
const longrb = new Longrb();
const root = document.getElementById('container');
let saveInfo = true;
let vars = {};
let result = 0;
let todisable = [];

if (typeof Storage !== 'undefined') {
	if (localStorage.vars) vars = JSON.parse(localStorage.vars);
	else vars = longrb.getVars();
} else {
	console.log('No support for browser storage. inputs will be lost when the tab is refreshed or closed');
}

function inputobjects(key, index) {
	const ret = {
		id: index,
		name: key,
		placeholder: key,
		className: 'form-control',
		step: 1,
		type: 'number',
		defaultValue: vars[key],
		required: true,
		max: 1e49,
		min: 0,
		oninput(event) {
			onInputt(event);
		},
		title: key
	};
	if (key.includes('NGU')) {
		ret.max = 1000000000;
		ret.min = 1000000;
		ret.title = 'The current lvls in the respective NGU';
	} else if (key.includes('percent')) {
		ret.max = key.includes('respawn') ? 100 : 10000000;
		ret.min = 1;
		ret.step = 0.01;
		ret.title = `The percentage that your current ${key.includes('respawn') ? 'respawn in stat breakdowns' : 'NGU ygg'}  shows`;
	} else if (key === 'currentATlvls') {
		ret.max = 200000000;
		ret.min = 100000;
		ret.title = 'The current lvls in AT/BEARd. Assuming you BB em both and they are around the same level';
	} else if (key === 'goalmulti') {
		ret.max = 100;
		ret.min = 1.1;
		ret.step = 0.01;
		ret.title = 'How much bigger your stats need to be to reach your goal';
	} else if (key.includes('iron pill sucks')) {
		ret.max = key.includes('1') ? 26 : 4;
		ret.min = 1;
		ret.step = key.includes('1') ? 5 : 1;
		ret.title = 'the current MULTIPLIER for the respective iron pill perk';
	} else if (typeof vars[key] === 'boolean') {
		ret.type = 'checkbox';
		ret.defaultChecked = vars[key];
		if (!vars[key]) todisable.push([key, index]);
		ret.required = false;
		ret.title = 'Unchecking this box will have the script not calculate the related features/field(s) and (potentially) disables the related fields';
	} else if (key.includes('wish')) {
		ret.max = 20;
		ret.title = "The levels you've reached in the cube boosting wish. 0 if not applicable";
	}
	return ret;
}

function submitForm(event) {
	const { elements } = event.target;
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].type === 'checkbox') vars[elements[i].name] = elements[i].checked;
		else if (elements[i].value !== '') vars[elements[i].name] = elements[i].valueAsNumber;
	}
	longrb.setVars(vars);
	result = longrb.run();
}

const inputs = () => {
	const values = [];
	Object.keys(vars).forEach((key, index) => values.push(inputobjects(key, index)));
	return {
		view: () => m('form', {
			className: 'form needs-validation',
			method: 'POST',
			novalidate: '',
			onsubmit(event) {
				event.preventDefault();
				if (!event.target.checkValidity()) return false;
				submitForm(event);
				return false;
			}
		},
		m('div', { className: 'form-row' },
			values.map(({ id, name, max, min, placeholder, className, required, step, type, defaultChecked, defaultValue, oninput, title }) => m('div', { className: 'col-sm-12 col-md-6 col-lg-3' },
				m('label', { htmlFor: id }, name),
				m('input', { id, name, max, min, placeholder, className, required, step, type, defaultChecked, defaultValue, oninput, title })))
		),
		m('div', { className: 'form-row' },
			m('div', { className: 'col-sm-12 col-md-6 col-lg-3 mt-2' },
				m('button', {
					className: 'btn btn-info',
					type: 'submit'
				}, 'Calculate!'))))
	};
};

function disablefields(name, id) {
	if (name.includes('BB') || name.includes('->')) {
		// this can probably be cleaner but it works
		const rootId = parseInt(document.getElementsByName('evil->normal quirk?')[0].id);
		document.getElementById((rootId + 1).toString()).disabled = vars['evil->normal quirk?'] ? false : vars['can BB evil ngu adv a'];
		document.getElementById((rootId + 3).toString()).disabled = !vars['can BB evil ngu adv a'];
		document.getElementById((rootId + 4).toString()).disabled = vars['evil->normal quirk?'] ? false : vars['can BB evil ngu adv b'];
		document.getElementById((rootId + 6).toString()).disabled = !vars['can BB evil ngu adv b'];
	} else if (!name.includes('poop')) {
		for (let i = id + 1; i <= id + (name.includes('fruit') ? 4 : 3); i++) document.getElementById(i.toString()).disabled = !vars[name];
	}
}

function addvalidation() {
	const forms = document.getElementsByClassName('needs-validation');
	forms[0].addEventListener('submit', event => {
		if (forms[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		forms[0].classList.add('was-validated');
	}, false);
}

function onInputt(event) {
	if (event.target.min <= event.target.value <= event.target.max) {
		const { name } = event.target;
		const id = parseInt(event.target.id);
		if (event.target.type === 'checkbox') {
			vars[name] = event.target.checked;
			disablefields(name, id);
		} else {
			vars[name] = event.target.value;
		}
		if (saveInfo) localStorage.vars = JSON.stringify(vars);
	}
}

function clearcache(event) {
	if (confirm(`Are you sure you want to clear your local storage${event.target.id === 'stopButton' ? ' and disable saving until a refresh' : ''}?`)) {
		localStorage.removeItem('vars');
		console.log('storage cleared');
		event.target.disabled = true;
		return true;
	}
	return false;
}

const Home = {
	oncreate: () => {
		addvalidation();
		todisable.forEach(value => {
			disablefields(value[0], value[1]);
		});
		todisable = [];
	},
	view: function view() {
		return m('main', [
			m('div', { className: 'row', id: 'row' },
				m('div', { className: 'col-12' },
					m('div', { className: 'card' },
						m('div', { className: 'card-header' }, 'Inputs'),
						m('div', { className: 'card-body' },
							m(inputs),
							m('p', { id: 'Time' }, 'Time needed: ',
								m('b', null, `${result} days`)
							)
						)
					)
				)
			)
		]);
	}
};
const Help = {
	view: function view() {
		return m('main', [
			m('div', { className: 'col-12' },
				m('div', { className: 'card' },
					m('div', { className: 'card-header' }, 'Help'),
					m('div', { className: 'card-body' },
						m('h2', { className: 'card-title' }, 'Welcome to this very barebones long rb calculator'),
						'Warning: this script currently does not account for a few select features, and basically wont be very useful outside evil. '
            + 'It is mostly intended to be used for the last push of exile versions to get to sad.',
						m('p', null,
							'Some notes about inputs:'
						),
						m('ul', null,
							m('li', null, 'If you BB only normal ngus, untick the evil-> quirk AND the BB evil ngu boxes'),
							m('li', null, 'Respawn percentage is the value from stat breakdown, not from just gear')
						), 'Yes I know my code sucks. ',
						m('a', { href: 'https://github.com/jasperfirecai2/longrbcalc/issues/new' }, 'Complain about it on github'),
						m('p', null,
							'To save your data, all your inputs are saved in your browser whenever you edit an input. Use the yellow button to the right to delete this info '
              + 'or the red button to delete it and prevent it from saving until you refresh.'
						),
						m('p', { className: 'float-right mt-8 mb-0' },
							m('button', {
								className: 'btn btn-warning',
								disabled: !saveInfo,
								id: 'clearButton',
								onclick: clearcache,
								type: 'button'
							}, 'Clear cache'),
							m('button', {
								className: 'btn btn-danger',
								disabled: !saveInfo,
								id: 'stopButton',
								onclick: event => {
									if (clearcache(event)) {
										document.getElementById('clearButton').disabled = true;
										saveInfo = false;
										console.log('Saving turned off until page refresh');
									}
								},
								type: 'button'
							}, 'Stop saving')
						)
					)
				)
			)
		]);
	}
};

m.route(root, '/home', {
	'/home': Home,
	'/help': Help
});
