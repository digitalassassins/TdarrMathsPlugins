"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_odd_even_variables',
	name: 'Odd or Even',
	description: 'Run is number odd or even on custom Variables \n\n',
	style: {
        borderColor: 'orange',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faSortNumericUp',
	inputs: [
		{
			name: 'CheckNumber',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Number to check if Odd or Even', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'Even',
        },{
            number: 2,
            tooltip: 'Odd',
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
	
	var number;
		if(String(args.inputs.CheckNumber).indexOf(".") == -1){
			// its not a decimal
			number = parseInt(args.inputs.CheckNumber);
			if(number === NaN){
				args.jobLog("Number submitted is not a number.. Throwing Error...");
				throw new Error("Number submitted is not a number..");
			}
		}else{
			// round to 1 decimal place
			number = parseFloat(parseFloat(args.inputs.CheckNumber).toFixed(1));
			if(number === NaN){
				args.jobLog("Number submitted is not a number.. Throwing Error...");
				throw new Error("Number submitted is not a number..");
			}
		}
		args.jobLog("Number to Check: ".concat(number) );
		
	
	if (number % 2 == 0) {
		// even
		args.jobLog("EVEN: Number: ".concat(number).concat(" Is Even ") );
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
		console.log("The number is even");
	} else {
		args.jobLog("ODD: Number: ".concat(number).concat(" Is Odd ") );
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
		console.log("The number is odd");
	}

};
exports.plugin = plugin;
