"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const event_1 = require("./event");
/**
 * Main function that runs when the GitHub Action is triggered
 */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // Get inputs from the GitHub Action
            const title = core.getInput('title', { required: true });
            const text = core.getInput('text', { required: true });
            const alertType = core.getInput('alertType');
            const priority = core.getInput('priority');
            const host = core.getInput('host');
            const tags = core.getInput('tags') ? core.getInput('tags').split(',').map(tag => tag.trim()) : [];
            const aggregationKey = core.getInput('aggregationKey');
            const sourceTypeName = core.getInput('sourceTypeName');
            // Add GitHub context to tags if specified
            const includeGitHubContext = core.getBooleanInput('includeGitHubContext');
            if (includeGitHubContext) {
                const { repo, owner } = github.context.repo;
                tags.push(`repo:${repo}`, `owner:${owner}`, `workflow:${github.context.workflow}`, `ref:${github.context.ref}`, `sha:${github.context.sha}`);
            }
            // Create event request
            const request = {
                title,
                text,
                alertType,
                priority,
                host,
                tags,
                sourceTypeName
            };
            // Send event to Datadog
            const results = yield (0, event_1.CreateEvent)({
                requests: [request],
                aggregationKey
            });
            // Set outputs
            if (results && results.length > 0) {
                core.setOutput('eventUrl', results[0].eventUrl);
                core.setOutput('eventId', (_b = (_a = results[0].response.event) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString());
            }
            core.info(`Successfully sent event to Datadog: ${title}`);
            if (results[0].eventUrl) {
                core.info(`Event URL: ${results[0].eventUrl}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                core.setFailed(error.message);
            }
            else {
                core.setFailed('An unknown error occurred');
            }
        }
    });
}
run();
