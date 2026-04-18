"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_check_crf',
	name: 'Check CRF',
	description: 'Check the CRF of a video \n\n',
	style: {
        borderColor: 'orange',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.50.01',
	sidebarPosition: 1,
	icon: 'faQuestion',
	inputs: [
		{
			label: 'Number Value',
			name: 'NumberValue',
			type: 'number', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Crf Rating to Check against e.g. 23.', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},		
		{
			label: 'Greater Or Less?',
			name: 'GreaterOrLess',
			type: 'string',
			defaultValue: '',
			inputUI: {
				type: 'dropdown',
				options: [
					'Greater Than >',
					'Greater or Equal >=',
					'Less Than <',
					'Less or Equal <=',					
				],
			},
			tooltip: 'Check if the Crf Is Greater Than, Equal To, or Less Than',
		},
	],
    outputs: [
        {
            number: 1,
            tooltip: 'True',
        },
		{
            number: 2,
            tooltip: 'False',
        },
		{
            number: 3,
            tooltip: 'Not Found',
        },
    ],
}); };
exports.details = details;

var plugin = function (args) {
	
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	
	var crf_rating = null;
	var encoderSettings = "";
	var encodedSettingArray;
	var _a, _b, _c, _d, _e, _f;
	
	if (typeof args.inputFileObj.mediaInfo.track !== 'undefined') {
		
		for (var key in args.inputFileObj.mediaInfo.track) {
			if (!args.inputFileObj.mediaInfo.track.hasOwnProperty(key)) continue;
			
			var media_info_track = args.inputFileObj.mediaInfo.track[key];
			
			for (var prop in media_info_track) {							
				if (!media_info_track.hasOwnProperty(prop)) continue;
				
				if (prop === "Encoded_Library_Settings"){
					encoderSettings = media_info_track["Encoded_Library_Settings"]
					if(encoderSettings !== "" && encoderSettings != null){
						encoderSettings = encoderSettings.toString();						
						encodedSettingArray = encoderSettings.split(" / ");						
						for (let i = 0; i < encodedSettingArray.length; i++) {							
							var currentSetting = encodedSettingArray[i].toString();
							currentSetting = currentSetting.split("=")							
							if( currentSetting[0].toString() == "crf" ) {
								crf_rating = currentSetting[1].toString();
								args.jobLog("CRF Rating Found: ". concat(crf_rating) );
							}
							
						}
						
					}
				}
			}
		}
		
	}else {
        throw new Error('File has no track data');
    }
	
	// add the crf to a variable we can use later
	if (!args.variables.crf_rating) {
        // eslint-disable-next-line no-param-reassign
        args.variables.crf_rating = null;
		
		
    }
	// add the crf to a object we can use later
	if (!args.variables.file_crf_rating) {
		args.variables.file_crf_rating = {};
	}
	
	if (!args.variables.file_crf_rating[args.originalLibraryFile.DB]) {
		args.variables.file_crf_rating[args.originalLibraryFile.DB] = null;
	}
	// now we check if the number is greater, less than or equal to if its not null:
	if(crf_rating != null){
		
		crf_rating = parseInt(crf_rating);
		var check_num = parseInt(args.inputs.NumberValue);
		// store CRF ratings in a variable for outside the plugin
		args.variables.crf_rating = crf_rating;
		args.variables.file_crf_rating[args.originalLibraryFile.DB] = crf_rating;
		
		var math_operator = args.inputs.GreaterOrLess;
		
		if(math_operator == "Greater Than >"){
			
			if(crf_rating > check_num){
				// true
				args.jobLog("TRUE: CRF Rating: ".concat(crf_rating).concat(" Is Greater Than ").concat(check_num) );
				
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 1,
					variables: args.variables,
				};
			}else{
				//false
				args.jobLog("FALSE: CRF Rating: ".concat(crf_rating).concat(" Is NOT Greater Than ").concat(check_num) );
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 2,
					variables: args.variables,
				};
			}
		}
		
		if(math_operator == "Greater or Equal >="){
			
			if(crf_rating >= check_num){
				// true
				args.jobLog("TRUE: CRF Rating: ".concat(crf_rating).concat(" Is Greater or Equal To ").concat(check_num) );
				
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 1,
					variables: args.variables,
				};
			}else{
				//false
				args.jobLog("FALSE: CRF Rating: ".concat(crf_rating).concat(" Is NOT Greater or Equal To ").concat(check_num) );
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 2,
					variables: args.variables,
				};
			}
		}
		
		if(math_operator == "Less Than <"){
			
			if(crf_rating < check_num){
				// true
				args.jobLog("TRUE: CRF Rating: ".concat(crf_rating).concat(" Is Less Than ").concat(check_num) );				
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 1,
					variables: args.variables,
				};
			}else{
				//false
				args.jobLog("FALSE: CRF Rating: ".concat(crf_rating).concat(" Is NOT Less Than ").concat(check_num) );
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 2,
					variables: args.variables,
				};
			}
		}
		
		if(math_operator == "Less or Equal <="){
			
			if(crf_rating <= check_num){
				// true
				args.jobLog("TRUE: CRF Rating: ".concat(crf_rating).concat(" Is Less Than Or Equal To ").concat(check_num) );				
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 1,
					variables: args.variables,
				};
			}else{
				//false
				args.jobLog("FALSE: CRF Rating: ".concat(crf_rating).concat(" Is NOT Less Than Or Equal To ").concat(check_num) );
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 2,
					variables: args.variables,
				};
			}
		}
		
	}else{
		
		args.jobLog("CRF Rating is Not Found!");
		args.variables.crf_rating = null;
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 3,
			variables: args.variables,
		};
		
	}
	
};
exports.plugin = plugin;
