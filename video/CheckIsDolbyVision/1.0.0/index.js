"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_check_is_dolby_vision',
    name: 'Check Dolby Vision',
    description: 'Check if video is Dolby Vision',
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
            tooltip: 'File is Dolby Vision',
        },
        {
            number: 2,
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
    let isDovi = false;
	if (Array.isArray(args?.inputFileObj?.mediaInfo?.track)) {
		for (let i = 0; i < args.inputFileObj.mediaInfo.track.length; i += 1) {
			const track = args.inputFileObj.mediaInfo.track[i];
			if ( String(track.HDR_Format_Profile).includes("dvhe") || String(track.HDR_Format_Profile).includes("dvav") || String(track.HDR_Format_Profile).includes("dav1") || String(track.HDR_Format_Profile).includes("dvh1") ) {
				isDovi = true;
			}
		}
	} else {
		throw new Error('File has no track data');
	}
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: isDovi ? 1 : 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;
