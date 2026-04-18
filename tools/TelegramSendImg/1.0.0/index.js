"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    id: 'mitsie_telegram_img',
	name: 'Telegram Send Image',
    description: 'Send Image Message From Telegram Bot',
    style: {
        borderColor: 'blue',
    },
    tags: 'Telegram',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.40.01',
    sidebarPosition: 1,
    icon: 'faCamera',
    inputs: [        
        {
            label: 'Bot ID',
            name: 'botID',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'The ID of the Telegram Bot `https://core.telegram.org/bots/tutorial`',
        },
		{
            label: 'Access Token',
            name: 'accessToken',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'The Access Token of the Telegram Bot `https://core.telegram.org/bots/tutorial`',
        },
        {
            label: 'Chat ID',
            name: 'chatID',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'The ID of the Telegram Chat you wish the Bot to post into',
        },
		{
            label: 'Send Screenshot',
            name: 'sendScreenshot',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Specify whether to send a Screenshot of the video, if not a screenshot, you must provide a file or web location',
        },
		{
            label: 'Image to Send',
            name: 'imageLocation',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
                displayConditions: {
                    logic: 'AND',
                    sets: [
                        {
                            logic: 'AND',
                            inputs: [
                                {
                                    name: 'sendScreenshot',
                                    value: 'false',
                                    condition: '===',
                                },
                            ],
                        },
                    ],
                },
            },
            tooltip: 'The Image you would like to send, must be a local image or a web url',
        },
		{
            label: 'Image Caption',
            name: 'imageCaption',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'The Image caption you would like to send under the image',
        },
		{
            label: 'Custom API',
            name: 'useCustomTelegramAPI',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Specify whether to use your own Bot API url and port or the default Official Telegram API',
        },
		{
            label: 'API Address',
            name: 'customTelegramAPIURL',
            type: 'string',
            defaultValue: 'https://api.telegram.org',
            inputUI: {
                type: 'text',
                displayConditions: {
                    logic: 'AND',
                    sets: [
                        {
                            logic: 'AND',
                            inputs: [
                                {
                                    name: 'useCustomTelegramAPI',
                                    value: 'true',
                                    condition: '===',
                                },
                            ],
                        },
                    ],
                },
            },
            tooltip: 'The web url and port of your custom bot API',
        },		
        {
            label: 'Log Response Body',
            name: 'logResponseBody',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Specify whether to log response body in the job report',
        },
		{
            label: 'Critical Request',
            name: 'criticalRequest',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Is this web request critical to the output of the flow?',
		},
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Success',
        },
		{
            number: 2,
            tooltip: 'Failed',
        },
    ],
}); };
exports.details = details;

var plugin = function (args) {
	
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	
	var bot_id = String(args.inputs.botID); // bot id from bot father
	var access_token = String(args.inputs.accessToken); // access token from botfather
	var chat_id = String(args.inputs.chatID); // chat id of chat to post to
	
	const FormData = require('form-data');
	const fs = require('fs');
	const axios = require('axios');
	
	// if we have a custom API sent, then use that, otherwise, fallback to Default API
	var customTelegramAPI = String(args.inputs.customTelegramAPIURL);
	var telegram_api_url = `https://api.telegram.org`;
	if(args.inputs.useCustomTelegramAPI === true && customTelegramAPI != "" && customTelegramAPI.startsWith("http") === true){
		telegram_api_url = customTelegramAPI;
	}
	const requestUrl = `${telegram_api_url}/bot${bot_id}:${access_token}/sendPhoto`;
	
	var file = args.originalLibraryFile;
	var dir = file.meta.Directory; //source directory
	var sourcename = file.meta.FileName.substring(
		0,
		file.meta.FileName.lastIndexOf(".")
	); //filename without extension
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	var randCount = getRandomArbitrary(1000,2000);
	
	var screenshotFile = `${sourcename}_screenshot.png`;
	
	function generate_screenshot(){
		const execSync = require("child_process").execSync;		
		
		var vid_length = Math.abs(parseInt( file.duration ));
		var snapshot_time = vid_length / 4;
		var source = file.meta.SourceFile; //source file
		
		args.jobLog(`Generating Screenshot..`);
		
		// if the screenshot file doesn't exist create it
		if (!fs.existsSync(`${dir}/${screenshotFile}`)) {			
			var cmd = `"${args.ffmpegPath}" -ss ${snapshot_time} -i "${source}" -frames:v 1 -vf "blackframe=0,metadata=select:key=lavfi.blackframe.pblack:value=50:function=less" -update true -q:v 2 -f image2 "${dir}/${screenshotFile}"`;
			const output = execSync(cmd, { encoding: 'utf-8' });
		}
		if (fs.existsSync(`${dir}/${screenshotFile}`)) {
			return true;
		}else{
			return false;
		}
	}

	const axiosImage = async(chatId, imgFile, caption) => {
		try {
			const formData = new FormData();
			
			args.jobLog(`Sending Image to Telegram..`);
			
			// wait 1 second to prevent rate limiting
			setTimeout(function (){ args.jobLog(`Waited 1 Second to prevent rate limiting on Telegram Servers..`); }, 1000);
			
			if(imgFile != "" && imgFile != null && imgFile.startsWith("http") != true){
				var imgFile = `${dir}/${imgFile}`;
			}
			
			formData.append('chat_id', chatId);
			formData.append('photo', fs.createReadStream(`${imgFile}`));
			if(caption != "" && caption != null){
				caption = sourcename + " - " + caption.replaceAll("\\\\n", "<br>").replaceAll("\\n", "<br>").replaceAll("<br>", "\\n");
				formData.append('caption', caption);
			}
		
			const response = await axios.post(`${requestUrl}`, formData, {
				headers: formData.getHeaders(),
			});

			return true;
		} catch (err) {
			args.jobLog(err);
			return false;
		}
	}
	
	var responseStatus = false;
	if(args.inputs.sendScreenshot === true){
		// get the screenshot using ffmpeg
		if(generate_screenshot() === true){
			args.jobLog(`Screenshot Generated..`);
			responseStatus = axiosImage(chat_id, screenshotFile, args.inputs.imageCaption);
		}
	}else{
		var image_list = String(args.inputs.imageLocation).split('|');
		if(image_list.length == 0){
			args.jobLog(`Number of Images: ${image_list.length}`);
			responseStatus = axiosImage(chat_id, args.inputs.imageLocation, args.inputs.imageCaption);
		}else if(image_list.length > 0){
			// run through each
			responseStatus = axiosImage(chat_id, args.inputs.imageLocation, args.inputs.imageCaption);
		}
	}
		
	
	if( responseStatus === true){
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 1,
			variables: args.variables,
		};
	}else{
		return {
			outputFileObj: args.inputFileObj,
			outputNumber: 2,
			variables: args.variables,
		};
	}

};
exports.plugin = plugin;
