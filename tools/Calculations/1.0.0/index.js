"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_calculate_variables',
	name: 'Var Calculations',
	description: 'Run calculations on custom Variables \n\n',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faCalculator',
	inputs: [
		{
			name: 'UserVariable',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'User variable to calculate e.g. custom_number.. \\n You must first set a variable with the Set Flow Variable plugin, and use the variable name in this plugin. \\n This plugin will do a calculation on your variable, it can then be accessed with {{{args.variables.user.custom_number}}} further down the flow or loop.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'MathOperator',
			type: 'string',
			defaultValue: 2,
			inputUI: {
				type: 'dropdown',
				options: [
					'Add',
					'Subtract',
					'Multiply',
					'Divide',
				],
			},
			tooltip: 'Calculation Operator',
		},
		{
			name: 'NumberValue',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Enter the value.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'DecimalPlaces',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'If the number is a Float, how many decimal places to round to ? Majority of FFMPEG filters take a Float to 1 Decimal place.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
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
		
	var decimal_places = String(args.inputs.DecimalPlaces).trim();
		decimal_places = parseInt(args.inputs.DecimalPlaces);
		if(decimal_places === NaN){
			args.jobLog("Decimal places is not a number.. Throwing Error...");
			throw new Error("Decimal places is not a number..");
		}
	
	var calc_value;
		if(String(args.inputs.NumberValue).indexOf(".") == -1){
			// its not a decimal
			calc_value = parseInt(args.inputs.NumberValue);
			if(calc_value === NaN){
				args.jobLog("Calculation Number submitted is not a number.. Throwing Error...");
				throw new Error("Number submitted is not a number..");
			}
		}else{
			// round to decimal place
			calc_value = parseFloat(parseFloat(args.inputs.NumberValue).toFixed(decimal_places));
			if(calc_value === NaN){
				args.jobLog("Calculation Number submitted is not a number.. Throwing Error...");
				throw new Error("Number submitted is not a number..");
			}
		}
		args.jobLog("Calculation Value: ".concat(calc_value) );

	var value;
		if(String(args.variables.user[variable]).indexOf(".") == -1){
			// its not a decimal
			value = parseInt(args.variables.user[variable]);
			if(value === NaN){
				args.jobLog("Variable Number stored is not a number.. Throwing Error...");
				throw new Error("Number stored is not a number..");
			}
		}else{
			// round to decimal place
			value = parseFloat(parseFloat(args.variables.user[variable]).toFixed(decimal_places));
			if(value === NaN){
				args.jobLog("Variable Number stored is not a number.. Throwing Error...");
				throw new Error("Number stored is not a number..");
			}
		}
		args.jobLog("Original Value: ".concat(value) );
		
	var math_operator = String(args.inputs.MathOperator).trim();
		args.jobLog("Math Operator: ".concat(math_operator) );
		
	
	if(calc_value === 0){
		args.jobLog("Value is Zero Throwing Error...");
		throw new Error("Value is Zero Can't Add, Subtract, Divide by or Multiply by 0");
	}else{
	
		if(math_operator === "Add"){
			
			value = (value + calc_value);
			args.jobLog("Add Calculation = ".concat(value) );
			
		}else if(math_operator === "Subtract"){
			
			value = (value - calc_value);
			args.jobLog("Subtrasct Calculation = ".concat(value) );
			
		}else if(math_operator === "Multiply"){
			
			value = (value * calc_value);
			args.jobLog("Multiply Calculation = ".concat(value) );
			
		}else if(math_operator === "Divide"){
			
			value = (value / calc_value);
			args.jobLog("Divide Calculation = ".concat(value) );
			
		}
		
		// if the value comes out as a float, then we round to the number of decimal places
		if(String(value).indexOf(".") == -1){
			// its not a decimal
		}else{
			value = parseFloat(parseFloat(value).toFixed(decimal_places));
		}
		
	}
	
	args.jobLog("Setting variable: ".concat( variable, " to: ").concat(value) );
	// eslint-disable-next-line no-param-reassign
	args.variables.user[variable] = value;

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };

};
exports.plugin = plugin;
