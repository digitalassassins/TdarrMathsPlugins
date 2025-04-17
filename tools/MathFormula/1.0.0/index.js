"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_advanced_math',
	name: 'Math Formula',
	description: 'Run advanced maths and save the output to a custom variable. \n You can use upto double depth parentheses \n Going more than double parentheses will cause the plugin to fail.',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.10.01',
	sidebarPosition: 1,
	icon: 'faCalculator',
	inputs: [
		{
			name: 'MathFormula',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'The Mathematical Formula to Calculate \n This plugin will do a calculation using your formula and save it in your variable, it can then be accessed with {{{args.variables.user.custom_number}}} further down the flow or loop.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},		
		{
			name: 'SaveVariable',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Enter the name of the variable exactly as set in the `SetFlowVariable` plugin.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
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

function calculateExpression(inputexpression){

	function splitExpression(expression){
		// split the expressions for calculation
		var thisExpression = String(expression);
		var copy = thisExpression;
		thisExpression = thisExpression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
		var numbers = copy.split(/[^0-9\.]+/);
		var operators = thisExpression.split("#").filter(function(n){return n});
		var result = [];
		
		for(var i = 0; i < numbers.length; i++){
			result.push(numbers[i]);
			if (i < operators.length){
				var minusOperators = operators[i].split("");
				if(minusOperators.length === 2 && minusOperators[1] === "-"){
					var nn = i+1;
					numbers[nn] = "-" + numbers[nn];
					result.push(minusOperators[0]);
				}else{
					result.push(operators[i]);
				}
			} 
		}
	  
		// if the first item is a negative operator then join the first operator to the first number
		if(result[0] === ""){
			result.splice(0, 1);
			if(result[0] === "-"){
				result[1] = "-" + result[1];
				result.splice(0, 1);
			}
			
		}
	  
		//document.body.innerHTML += "Numbers:" + numbers + "<br>";
		//document.body.innerHTML += "Operators:" + operators + "<br>";
		//document.body.innerHTML += "Result:" + result + "<br>";
	  
		return result;

	}

	function calculateArray(items){
		
		var operators = ["+","-","*","/"];
		var calculation = 0;
		var current_number;
	  
		for(var i = 0; i < items.length; i++){
	  
			if( operators.includes(items[i]) ){
				var nextNumber
				if(String(items[i]).indexOf(".") == -1){
				// its not a decimal
				nextNumber = parseInt(items[i+1]);
				}
				if(nextNumber === NaN){
					//trigger Error
					throw new Error("Next Number Int number was NAN..");
				}
			}else{
				// its a decimal
				nextNumber = parseFloat(parseFloat(items[i+1]));
				if(nextNumber === NaN){
					//trigger Error
					throw new Error("Next Number Float number was NAN..");
				}
			}
			
			if(items[i] === "+"){
				//document.body.innerHTML += "Calc: " + calculation + " Plus " + nextNumber + "<br>";
				calculation = (calculation + nextNumber);
				//document.body.innerHTML += "= " + calculation + "<br>";
			} else if(items[i] === "-"){  
				//document.body.innerHTML += "Calc: " + calculation + " Minus " + nextNumber + "<br>";
				calculation = (calculation - nextNumber);
				//document.body.innerHTML += "= " + calculation + "<br>";
			} else if(items[i] === "*"){ 
				//document.body.innerHTML += "Calc: " + calculation + " Multiply By " + nextNumber + "<br>";
				calculation = (calculation * nextNumber);
				//document.body.innerHTML += "= " + calculation + "<br>";
			} else if(items[i] === "/"){ 
				//document.body.innerHTML += "Calc: " + calculation + " Divided By " + nextNumber + "<br>";
				calculation = (calculation / nextNumber);
				//document.body.innerHTML += "= " + calculation + "<br>";
			}
			
		  
			if(i === 0){
				if(String(items[i]).indexOf(".") == -1){
					// its not a decimal
					calculation = parseInt(items[i]);
					if(calculation === NaN){
						//trigger Error
						throw new Error("Calculation Int number was NAN..");
					}
				}else{
					// its a decimal
					calculation = parseFloat(parseFloat(items[i]).toFixed(2));
					if(calculation === NaN){
						//trigger Error
						throw new Error("Calculation float number was NAN..");
					}
				}
			}
		}
		return calculation;
	}

	function calcParenthesis(expression){
		// workout the values in brackets first
		//re = /\(([^)]+)\)/;
		var outer = /\(([0-9+\-\*.\/]*\(.+?\)[0-9+\-\*.\/]*)\)/g;
		var sub = /\((.*?)\)/g;
	  
		function checkExpressionHasParenth(thisExpression){
			return stripParenthesis(sub,thisExpression, "Sub");   
		}
	  
		function stripParenthesis(regexp,expression, type){
			var listOfexpressions = {};
			var found;
		  
			while( found = regexp.exec(expression) ) {
				//document.body.innerHTML += type + " match: " + found + "<br>";
			  
				var loopBreak = false;
				do {
				
					if( found[1].includes("(") ){
						found[1] = checkExpressionHasParenth(found[1]);
						//document.body.innerHTML += type + " Check Parenthesis: " + found[1] + "<br>";
						loopBreak = false;
					}else{
						loopBreak = true;
					}
				
				} while (loopBreak === false);
			  
			  
				listOfexpressions[ String(found[0]) ] = found[1];
			  

				//document.body.innerHTML += type + " Expressions: " + JSON.stringify(listOfexpressions) + "<br>";

				for (var key in listOfexpressions) {
					// skip loop if the property is from prototype
					if (!listOfexpressions.hasOwnProperty(key)) continue;

					listOfexpressions[key] = splitExpression(listOfexpressions[key]);
					listOfexpressions[key] = calculateArray(listOfexpressions[key]);

					// now regex and replace parenthesis with calculation
					expression = expression.replace( String(key), String(listOfexpressions[key]) );
					//document.body.innerHTML += type + "Replacing: " + String(key) + " With " + String(listOfexpressions[key]) + "<br>";
				}

			}
			//document.body.innerHTML += "Split Array: " + JSON.stringify(listOfexpressions) + "<br>";
			return expression;
	  }
	  
	  expression = stripParenthesis(outer,expression, "Outer");
	  expression = stripParenthesis(sub,expression, "Sub");
	  
	  return expression;
	  
	}
	// strip spaces
	inputexpression = inputexpression.replace(/\s/g, '');
	// now calculate the parentheses
	inputexpression = calcParenthesis(inputexpression);
	//document.body.innerHTML += "New Expression: " + inputexpression + "<br>";
	var expressionArray = splitExpression(inputexpression);
	//document.body.innerHTML += "New Expression Array: " + expressionArray + "<br>";
	var endCalculation = calculateArray(expressionArray);
	
	if(String(endCalculation).indexOf(".") === -1){
		endCalculation = String(endCalculation);
	}else{
		endCalculation = parseFloat(endCalculation).toFixed(2);
		var lastChars = String(endCalculation).substr(String(endCalculation).length - 2);
		if(lastChars == "00"){
			endCalculation = String(parseInt(endCalculation));
		}		
	}
	
	//document.body.innerHTML += "Final Calculation: " + endCalculation + "<br>";

	return endCalculation;
}

var plugin = function (args) {
	
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	
    if (!args.variables.user) {
        // eslint-disable-next-line no-param-reassign
        args.variables.user = {};
    }
	
	var variable = String(args.inputs.SaveVariable).trim();
		args.jobLog("Variable Name: ".concat(variable) );
		
	var formula = String(args.inputs.MathFormula).trim();
		args.jobLog("Formula: ".concat(formula) );
	
	var calc_value = calculateExpression(formula);
	
	args.jobLog("Setting variable: ".concat( variable, " to: ").concat(calc_value) );
	// eslint-disable-next-line no-param-reassign
	args.variables.user[variable] = calc_value;

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };

};
exports.plugin = plugin;
