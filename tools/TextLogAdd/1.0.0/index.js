"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_text_log_update',
	name: 'Text Log Update',
	description: 'Update a text file with a row of information from the plugin input \n\n',
	style: {
        borderColor: 'green',
	},
	tags: '',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.11.01',
	sidebarPosition: 1,
	icon: 'faFileText',
	inputs: [
		{
			name: 'FileLocation',
			type: 'string', // set the data type of the input ('string', 'number', 'boolean')
			defaultValue: '', // set the default value of the input incase the user enters no input
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'The Location of the text file on the filesystem \\n', // Each line following `Example:` will be clearly formatted. \\n used for line breaks
		},
		{
			name: 'TextToAdd',
			type: 'string',
			defaultValue: '',
			inputUI: {
				type: 'text', // specify how the input UI will appear to the user ('text' or 'dropdown')
			},
			tooltip: 'Information to add to a new row inside the text file',
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
	
	var fs_log = require("fs");
    var lib = require('../../../../../methods/lib')();
	
	function processTextAdd( update_text, file_loc, crf_rating = null ){
		
		// replace CRF shortcode
		update_text = update_text.replace("{CRF_RATING}", crf_rating);
		
		update_text += "\r\n";
		fs_log.appendFile(file_loc, update_text, (err) => {
			return err;
		});
	}
	
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	
    if (!args.variables.user) {
        // eslint-disable-next-line no-param-reassign
        args.variables.user = {};
    }
	
	var file_location = String(args.inputs.FileLocation).trim();
		args.jobLog("File Location: ".concat(file_location) );
		
	var text_to_add = String(args.inputs.TextToAdd).trim();
		args.jobLog("Text To Add: ".concat(text_to_add) );
		
	if( !args.variables.hasOwnProperty("file_crf_rating") ){
		var library_crf_rating = null;
	}else{
		if( !args.variables.file_crf_rating.hasOwnProperty(args.originalLibraryFile.DB) ){
			var library_crf_rating = null;
		}else{
			var library_crf_rating = args.variables.file_crf_rating[args.originalLibraryFile.DB];
		}
	}
	
	args.jobLog( processTextAdd( text_to_add, file_location, library_crf_rating ) );

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };

};
exports.plugin = plugin;
