"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_delete_original_folder',
	name: 'Delete Original Folder',
	description: 'Delete the original Folder if it is empty and no more files exist \n\n',
	style: {
        borderColor: 'red',
	},
	tags: 'Delete',
	isStartPlugin: false,
	pType: '',
	requiresVersion: '2.40.01',
	sidebarPosition: 1,
	icon: 'faTrash',
	inputs: [
		{
            label: 'Dry Run',
            name: 'dryRun',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Test the plugin without deleting any data. \n Data of what would have happened is displayed in the Job Log',
        },
	],
    outputs: [
        {
            number: 1,
            tooltip: 'Folder Deleted',
        },
		{
            number: 2,
            tooltip: 'Not Empty',
        },
    ],
}); };
exports.details = details;

var plugin = function (args) {
	
    var lib = require('../../../../../methods/lib')(); const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
	var inputs = lib.loadDefaultValues(args.inputs, details);
	var file = args.inputFileObj;
	
	var source = file.meta.SourceFile; //source file
	var dir = file.meta.Directory; //source directory
	var sourcename = file.meta.FileName.substring(
		0,
		file.meta.FileName.lastIndexOf(".")
	); //filename without extension
	var sourcename_wext = file.meta.FileName;
	
	var video_files_remaining = 0;
	
	function check_file_count(){
		args.jobLog(`Checking File Count..`);
		if (fs.existsSync(`${dir}`)) {
			
			const path = require('path');
			
			args.jobLog(`SUCCESS: Original Directory Exists..`);
			var files = fs.readdirSync(`${dir}`, { withFileTypes: true });
			args.jobLog(`-----------------`);
			args.jobLog(`Total Files: ${files.length} in: ${dir} `);
			args.jobLog(`-----------------`);
			args.jobLog(`-----------------`);
			args.jobLog(`Files List: `);
			args.jobLog(`-----------------`);
			args.jobLog(`-----------------`);
			
			var video_extensions = ['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'rrc', 'gifv', 'mng', 'mov', 'avi', 'qt', 'wmv', 'yuv', 'rm', 'asf', 'amv', 'mp4', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'm4v', 'svi', '3gp', '3g2', 'mxf', 'roq', 'nsv', 'flv', 'f4v', 'f4p', 'f4a', 'f4b', 'mod'];
			
			files.forEach(tfile => {
				args.jobLog(`${tfile.name}`);
				var nodext = path.extname(tfile.name).replace(".","");
				if (tfile.name != sourcename_wext && video_extensions.includes(`${nodext}`) ){
					video_files_remaining += 1;
				}
			});
			args.jobLog(`-----------------`);
			args.jobLog(`-----------------`);
			args.jobLog(`Video Files Remaining: ${video_files_remaining}`);
			args.jobLog(`-----------------`);
				
			return parseInt(files.length);
			
		}else{
			args.jobLog(`ERROR: Couldn't Find Original Directory..`);
		}
	}
	
	function delete_empty_folder(){
		if (fs.existsSync(`${dir}`)) {
			if(inputs.dryRun === false){				
				fs.unlinkSync(`${dir}`);				
				args.jobLog(`--- Live Mode ---`);
				args.jobLog(`We have deleted Directory:`);
				args.jobLog(`${dir} `);
				args.jobLog(`----------------------`);
				if (!fs.existsSync(`${dir}`)) {				
					return true;
				}else{
					return false;
				}
			}else{
				args.jobLog(`--- Dry Run Mode ---`);
				args.jobLog(`We would have deleted Directory:`);
				args.jobLog(`${dir} `);
				args.jobLog(`----------------------`);
				return true;
			}
		}
	}	
	
	var file_count = check_file_count();
	args.jobLog( `File Count: ${file_count}` );
	var folder_deleted = false;
	
	if( file_count === 0 ){
		// delete the directory		
		folder_deleted = delete_empty_folder();
	}
	
	if( file_count === 0 && folder_deleted == true ){
		// add to the job log
		args.jobLog( `Folder Deleted..` );	
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
	}else{
		// add to the job log
		args.jobLog( `Folder Not Empty, did not initiate Delete..` );
		
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
	}
	
};
exports.plugin = plugin;
