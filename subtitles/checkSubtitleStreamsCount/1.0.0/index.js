"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
	id: 'mitsie_check_subtitle_stream_count',
    name: 'Check Subtitles Streams Count',
    description: 'This plugin checks how many subtitle streams there is.',
    style: {
        borderColor: 'orange',
    },
    tags: 'subtitles',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: 'faQuestion',
    inputs: [],
    outputs: [
        {
            number: 1,
            tooltip: 'File has no subtitle stream',
        },
		{
            number: 2,
            tooltip: 'File has one subtitle stream',
        },
        {
            number: 3,
            tooltip: 'File has more than one subtitle stream',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    var ffProbeData = args.inputFileObj.ffProbeData;
    if (!ffProbeData || !ffProbeData.streams) {
        throw new Error('ffProbeData or ffProbeData.streams is not available.');
    }
    var subtitleStreams = ffProbeData.streams.filter(function (stream) { return stream.codec_type === 'subtitle'; }).length;
    var outputNumber = 1; // Default to no subtitle stream
    if (subtitleStreams === 0) {
        outputNumber = 1; // No Subtitle stream
    }
    else if (subtitleStreams === 1) {
        outputNumber = 2; // One Subtitle stream
    }
    else if (subtitleStreams > 1) {
        outputNumber = 3; // More than one Subtitle stream
    }
    args.jobLog("Number of subtitle streams: ".concat(subtitleStreams));
	args.variables.subtitleStreamCount = parseInt(subtitleStreams);
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: outputNumber,
        variables: args.variables,
    };
};
exports.plugin = plugin;
