"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    id: 'mitsie_telegram_msg',
	name: 'Telegram Send Message',
    description: 'Send Message From Telegram Bot',
    style: {
        borderColor: 'blue',
    },
    tags: 'Telegram',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.40.01',
    sidebarPosition: 1,
    icon: 'faPaperPlane',
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
            label: 'Message to Send',
            name: 'chatMessage',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'textarea',
                style: {
                    height: '100px',
                },
            },
            tooltip: 'The Message you would like to send, can use restricted HTML Markup `https://core.telegram.org/bots/api#html-style`',
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var lib, method, requestUrl, requestHeaders, requestBody, logResponseBody, requestConfig, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lib = require('../../../../../methods/lib')();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
                args.inputs = lib.loadDefaultValues(args.inputs, details);
                //method = String(args.inputs.method);
				method = String("post");
				
				const generateInlineKeyboard = function(chatId,question,){
					const opts = {
						"chat_id": chatId,
						"text": `"${question}"`,
						"reply_markup": {
								"inline_keyboard": [
									[
										{
											"text": "Accept",
											"callback_data": "1"            
										}, 
										{
											"text": "Decline",
											"callback_data": "0"
										},
									]
								]
							}
						}
					
					return JSON.stringify(opts);
				}
				
				var bot_id = String(args.inputs.botID); // 
				var access_token = String(args.inputs.accessToken); // 
				var chat_id = String(args.inputs.chatID); // 
				
				// if we have a custom API sent, then use that, otherwise, fallback to Default API
				var customTelegramAPI = String(args.inputs.customTelegramAPIURL);
				var telegram_api_url = `https://api.telegram.org`;
				if(args.inputs.useCustomTelegramAPI === true && customTelegramAPI != "" && customTelegramAPI.startsWith("http") === true){
					telegram_api_url = customTelegramAPI;
				}	
				requestUrl = `${telegram_api_url}/bot${bot_id}:${access_token}/sendMessage`;
				requestHeaders = JSON.parse(String(`{"Content-Type": "application/json"}`));
				var msg_text = String(args.inputs.chatMessage);
				msg_text = msg_text.replaceAll("\\\\n", "<br>").replaceAll("\\n", "<br>").replaceAll("<br>", "\\n");
				var parse_mode = "html";
				requestBody = JSON.parse(String(`{"chat_id": "${chat_id}","text":"${msg_text}", "parse_mode":"${parse_mode}"}`));
                
				logResponseBody = args.inputs.logResponseBody;
                requestConfig = {
                    method: method,
                    url: requestUrl,
                    headers: requestHeaders,
                    data: requestBody,
                };
				
				// wait 1 second to prevent rate limiting
				setTimeout(function (){ args.jobLog(`Waited 1 Second to prevent rate limiting on Telegram Servers..`); }, 1000);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);				
                return [4 /*yield*/, args.deps.axios(requestConfig)];
            case 2:
                res = _a.sent();
                args.jobLog("Sending Telegram Message succeeded: Status Code: ".concat(res.status));
                if (logResponseBody) {
                    args.jobLog("Response Body: ".concat(JSON.stringify(res.data)));
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                args.jobLog('Sending Telegram Message Failed');
                args.jobLog(JSON.stringify(err_1));
                if(args.inputs.criticalRequest === true){
					throw new Error('Web Request Failed')
				}
				return [2 /*return*/, {
                    outputFileObj: args.inputFileObj,
                    outputNumber: 2,
                    variables: args.variables,
                }];
            case 4: return [2 /*return*/, {
                    outputFileObj: args.inputFileObj,
                    outputNumber: 1,
                    variables: args.variables,
                }];
        }
    });
}); };
exports.plugin = plugin;
