"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_array_explode',
	name: 'List Split',
	description: 'Split up a list using a seperator, into a series of variables \n\n',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.40.01',
	sidebarPosition: 1,
	icon: 'faStream',
	inputs: [
		{
			name: 'List',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'User variable to concatinate to.. \\n You must first set a variable with the Set Flow Variable plugin, and use the variable name in this plugin. \\n This plugin will do a calculation on your variable, it can then be accessed with {{{args.variables.user.custom_number}}} further down the flow or loop.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},		
		{
			name: 'Seperator',
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
					'x',
				],
			},
			tooltip: 'The seperator used to seperate the string',
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin',
        },
		{
            number: 2,
            tooltip: 'Nothing to Join',
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
	
	var list = String(args.inputs.List).trim();
		args.jobLog("List to Break Up: ".concat(list) );
		
		
	var seperator = String(args.inputs.Seperator).trim();
		args.jobLog("Seperator: ".concat(seperator) );
		
	// check if the seperator exists in the list
	if(String(list).indexOf(seperator) == -1){
		
		args.jobLog("Nothing To Join, Leaving Exit 2!");
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
		
	}else{
		
		var exploded_list = list.split(seperator);
		for(var i = 0; i < exploded_list.length; i++){
			
			var new_variable = "ListSplit-".concat(i+1);
			args.jobLog("Setting New Variable: ".concat( new_variable, " to: ").concat(exploded_list[i]) );
			args.variables.user[new_variable] = String(exploded_list[i]);
		}
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		
	}

};
exports.plugin = plugin;
