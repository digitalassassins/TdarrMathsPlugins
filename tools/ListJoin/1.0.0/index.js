"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_concat_variables',
	name: 'List Join',
	description: 'Add an item to the end of a custom Variable, joining them with a seperator to create a list \n\n',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faList',
	inputs: [
		{
			name: 'UserVariable',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'User variable to concatinate to.. \\n You must first set a variable with the Set Flow Variable plugin, and use the variable name in this plugin. \\n This plugin will do a calculation on your variable, it can then be accessed with {{{args.variables.user.custom_number}}} further down the flow or loop.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'ToAdd',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Enter the  new value to concatinate to the end of the variable.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'Glue',
			type: 'string',
			defaultValue: '',
			inputUI: {
				type: 'dropdown',
				options: [
					',',
					'|',
					'.',
					'/',
					':',
					';',
					'-',
					'_',
				],
			},
			tooltip: 'The seperator used to join the strings',
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
		
	var glue = String(args.inputs.Glue).trim();
		args.jobLog("Concatination Glue: ".concat(glue) );
		
	var currentValue = String(args.variables.user[variable]).trim();
		
	var newVarValue = [currentValue, toAdd].join(glue);
	if(newVarValue.charAt(0) === glue){		
		newVarValue = newVarValue.substring(1);		
	}
	if(newVarValue.slice(-1) === glue){
		newVarValue = newVarValue.substring(0, newVarValue.length - 1);
	}
	
	args.jobLog("Setting New Variable: ".concat( variable, " to: ").concat(newVarValue) );
	// eslint-disable-next-line no-param-reassign
	args.variables.user[variable] = String(newVarValue);

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };

};
exports.plugin = plugin;
