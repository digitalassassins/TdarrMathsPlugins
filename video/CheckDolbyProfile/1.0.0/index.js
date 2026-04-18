"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	  id: 'mitsie_check_dolby_vision_profile',
    name: 'Check Dolby Vision Profile',
    description: 'Check the Dolby Vision Profile Number, breaks out of each exit point based on the profile type. if you just want to check if the video is Dolby Vision or not. anything that comes out of 1-6 is Dolby Vision.',
    style: {
        borderColor: 'orange',
    },
    tags: 'video',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: 'faQuestion',
    inputs: [],
    outputs: [
        {
            number: 1,
            tooltip: 'Dolby Vision Profile 5',
        },
        {
            number: 2,
            tooltip: 'Dolby Vision Profile 7',
        },
		{
            number: 3,
            tooltip: 'Dolby Vision Profile 8',
        },
		{
            number: 4,
            tooltip: 'Dolby Vision Profile 9',
        },
		{
            number: 5,
            tooltip: 'Dolby Vision Profile 10',
        },
		{
            number: 6,
            tooltip: 'Dolby Vision Profile 20',
        },
		{
            number: 7,
            tooltip: 'File is not Dolby Vision',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var _a, _b;
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
	if (Array.isArray(args?.inputFileObj?.mediaInfo?.track)) {
		for (let i = 0; i < args.inputFileObj.mediaInfo.track.length; i += 1) {
			const track = args.inputFileObj.mediaInfo.track[i];
			var hdr_profile = String(track.HDR_Format_Profile);
			if ( hdr_profile.includes("dvhe.05")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 1,
					variables: args.variables,
				}
			}else if ( hdr_profile.includes("dvhe.07")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 2,
					variables: args.variables,
				}
			}else if ( hdr_profile.includes("dvhe.08")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 3,
					variables: args.variables,
				}
			}else if ( hdr_profile.includes("dvav.09")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 4,
					variables: args.variables,
				}
			}else if ( hdr_profile.includes("dav1.10")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 5,
					variables: args.variables,
				}
			}else if ( hdr_profile.includes("dvh1.20")  ) {
				return {
					outputFileObj: args.inputFileObj,
					outputNumber: 6,
					variables: args.variables,
				}
			}
		}
	} else {
		throw new Error('File has no track data');
	}
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 7,
        variables: args.variables,
    };
};
exports.plugin = plugin;
