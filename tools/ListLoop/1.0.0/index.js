"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
//var rndString = Math.random().toString(36).slice(2, 10);
var details = function () { return ({
	id: 'mitsie_array_loop',
	name: 'List Loop',
description: 'Create and Run through an array of items seperated with | pipe characters. \n Using Pipe seperators allows to make an array with commas for FMPEG commands \n Access current Value of the Loop with {{{args.variables.user.ListLoopValue}}}',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.40.01',
	sidebarPosition: 1,
	icon: 'faSync',
	inputs: [
		{
			name: 'ListValues',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'A List of values to add to the Array loop \\n Seperate each command with a | pipe character, on windows it is shift+backslash(\) key to create a pipe character \\n On each run, this plugin will cycle through your list as an array and then break out once it gets to the end of the list, use the variable {{{args.variables.user.ListLoopValue}}} and each loop will output the array item to this variable.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},			
	],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next Plugin',
        },
		{
            number: 2,
            tooltip: 'End of Array',
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
	
	var pluginID = String(args.thisPlugin.id).split("::");
	pluginID = String(pluginID[1]);
	var UIDCount = String(pluginID).trim(). concat('-mArrayCount');
	if(typeof args.variables.user[UIDCount] === "undefined" || args.variables.user[UIDCount] === NaN){
		args.variables.user[UIDCount] = parseInt(0);
		args.jobLog("Setting Array Count To Zero: ". concat( args.variables.user[UIDCount] ) );
	}
	
	args.jobLog("Current Position: ". concat(args.variables.user[UIDCount] ) );
	
	var splitArray = String(args.inputs.ListValues).trim().split("|");
	var assocArray = {};
	var i = 0;
	for (const element of splitArray) {
		assocArray[i] = element;
		i++;
	}
	
	args.jobLog("Array: ");
	args.jobLog("---------------------------------");
	for (const element of Object.entries(assocArray)) {
		const akey = element[0],avalue = element[1];
		args.jobLog("- ". concat( akey, " : ", avalue ) );
	}
	
	if(args.variables.user[UIDCount] < Object.keys(assocArray || {}).length ){
		
		// eslint-disable-next-line no-param-reassign
		args.variables.user.ListLoopValue = String(assocArray[ args.variables.user[UIDCount] ]).trim();
		
		// add 1 to the array count
		args.variables.user[UIDCount] = parseInt( String( args.variables.user[UIDCount] ).trim() );
		args.variables.user[UIDCount]++;
		args.jobLog("Adding 1 to Array Count: ". concat( args.variables.user[UIDCount]) );
		
		args.variables.user[UIDCount] = String(args.variables.user[UIDCount]);
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		
	}else{
		
		args.variables.user[UIDCount] = String(0);
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
		
	}

};
exports.plugin = plugin;
