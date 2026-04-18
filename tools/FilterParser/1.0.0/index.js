"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_vf_filter_parser',
	name: 'VF Filter Parser',
	description: 'Add an item to the -vf filter and join them together into one command \n\n',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faFilm',
	inputs: [
		{
			name: 'UserVariable',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'User variable to save the filter to.. \\n You must first set a variable with the Set Flow Variable plugin, and use the variable name in this plugin. \\n This plugin will do a calculation on your variable, it can then be accessed with {{{args.variables.user.custom_number}}} further down the flow or loop.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'ToAdd',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Enter the new value to add to the filter.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin',
        },
    ],
}); };
exports.details = details;

var plugin = function (args) {
	
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	
    if (!args.variables.user) {
        // eslint-disable-next-line no-param-reassign
        args.variables.user = {};
    }
	
	var variable = String(args.inputs.UserVariable).trim();
		args.jobLog("Variable Name: ".concat(variable) );
		
	var toAdd = String(args.inputs.ToAdd).trim();
		args.jobLog("To Add: ".concat(toAdd) );
		
	var currentValue = String(args.variables.user[variable]).trim();
	
	if(toAdd === "" || toAdd === null || toAdd === "undefined" || toAdd === "1"){
		
		// nothing to add... returning
		args.jobLog("Nothing to add to: ".concat( variable));
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		
	}else{
		// remove preceeding -vf & remove quotation marks
		currentValue = currentValue.replace(/-vf /g,'').replace(/\"/g,'');
		toAdd = toAdd.replace(/-vf /g,'').replace(/\"/g,'');
		var newVarValue;
		if(currentValue === "" || currentValue === "undefined"){
			newVarValue = toAdd;
		}else{
			newVarValue = [currentValue, toAdd].join(",");
		}
		if(newVarValue.charAt(0) === ","){		
			newVarValue = newVarValue.substring(1);		
		}
		if(newVarValue.slice(-1) === ","){
			newVarValue = newVarValue.substring(0, newVarValue.length - 1);
		}
		
		// rewrap the filter
		newVarValue = '-vf "'.concat(newVarValue).concat('"');
		
		
		args.jobLog("Setting New Variable: ".concat( variable, " to: ").concat(newVarValue) );
		// eslint-disable-next-line no-param-reassign
		args.variables.user[variable] = String(newVarValue);

		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		
	}

};
exports.plugin = plugin;
