"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_variable_contains',
	name: 'Variable Contains',
	description: 'Check if a variable contains a specific string or number \n\n',
	style: {
        borderColor: 'orange',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faQuestion',
	inputs: [
		{
			name: 'ValueToCheck',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Value to check \\n To use a variable, you need to enter the full string \\n', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'CheckString',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Enter the string to check.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'True, string exists in value..',
        },
		{
            number: 2,
            tooltip: 'False, string does not exist in value..',
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
	
	var valueCheck = String(args.inputs.ValueToCheck).trim();
		args.jobLog("Value to check: ".concat(valueCheck) );
		
	var checkStr = String(args.inputs.CheckString).trim();
		args.jobLog("Check String: ".concat(checkStr) );
	
	if(valueCheck.includes(checkStr) === true){
		
		args.jobLog("Value: ".concat(valueCheck, " - Contained: ", checkStr) );
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		
	}else{
		
		args.jobLog("String: ".concat(checkStr, " - Was not found in: ", valueCheck) );
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
		
	}
	
    

};
exports.plugin = plugin;
