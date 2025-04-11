"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_greater_less_variables',
	name: 'Var Greater/Less Than',
	description: 'Run greater less than on custom Variables \n\n',
	style: {
        borderColor: 'orange',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faCalculator',
	inputs: [
		{
			name: 'FirstNum',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'First Number Is', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'MathOperator',
			type: 'string',
			defaultValue: 2,
			inputUI: {
				type: 'dropdown',
				options: [
					'Greater Than >',
					'Greater or Equal >=',
					'Less Than <',
					'Less or Equal <=',
				],
			},
			tooltip: 'Calculation Operator',
		},
		{
			name: 'SecondNum',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '1', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Than this number.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'True',
        },{
            number: 2,
            tooltip: 'False',
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
	
	var first_num;
		if(String(args.inputs.FirstNum).indexOf(".") == -1){
			// its not a decimal
			first_num = parseInt(args.inputs.FirstNum);
		}else{
			// round to 1 decimal place
			first_num = parseFloat(parseFloat(args.inputs.FirstNum).toFixed(1));
		}
		args.jobLog("First Value: ".concat(first_num) );
		
	var math_operator = String(args.inputs.MathOperator).trim();
		args.jobLog("Math Operator: ".concat(math_operator) );

	var second_num;
		if(String(args.inputs.SecondNum).indexOf(".") == -1){
			// its not a decimal
			second_num = parseInt(args.inputs.SecondNum);
		}else{
			// round to 1 decimal place
			second_num = parseFloat(parseFloat(args.inputs.SecondNum).toFixed(1));
		}
		args.jobLog("Second Value: ".concat(second_num) );
		
	
	if(math_operator == "Greater Than >"){
		
		if(first_num > second_num){
			// true
			args.jobLog("TRUE: First Value: ".concat(first_num).concat(" Is Greater Than ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 1,
				variables: args.variables,
			};
		}else{
			//false
			args.jobLog("FALSE: First Value: ".concat(first_num).concat(" Is NOT Greater Than ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 2,
				variables: args.variables,
			};
		}
		
	}else if(math_operator == "Greater or Equal >="){
		
		if(first_num >= second_num){
			// true
			args.jobLog("TRUE: First Value: ".concat(first_num).concat(" Is Greater or Equal To ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 1,
				variables: args.variables,
			};
		}else{
			//false
			args.jobLog("FALSE: First Value: ".concat(first_num).concat(" Is NOT Greater or Equal To ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 2,
				variables: args.variables,
			};
		}
		
	}else if(math_operator == "Less Than <"){
		
		if(first_num < second_num){
			// true
			args.jobLog("TRUE: First Value: ".concat(first_num).concat(" Is Less Than ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 1,
				variables: args.variables,
			};
		}else{
			//false
			args.jobLog("FALSE: First Value: ".concat(first_num).concat(" Is NOT Less Than ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 2,
				variables: args.variables,
			};
		}
		
	}else if(math_operator == "Less or Equal <="){
		
		if(first_num <= second_num){
			// true
			args.jobLog("TRUE: First Value: ".concat(first_num).concat(" Is Less or Equal To ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 1,
				variables: args.variables,
			};
		}else{
			//false
			args.jobLog("FALSE: First Value: ".concat(first_num).concat(" Is NOT Less Than or Equal To ").concat(second_num) );
			return {
				outputFileObj: args.inputFileObj,
				outputNumber: 2,
				variables: args.variables,
			};
		}
		
	}

};
exports.plugin = plugin;
