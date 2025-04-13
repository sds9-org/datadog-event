import * as core from '@actions/core';
import * as github from '@actions/github';
import { CreateEvent, RequestEventParams } from './event';

/**
 * Main function that runs when the GitHub Action is triggered
 */
export async function run(): Promise<void> {
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
      tags.push(
        `repo:${repo}`,
        `owner:${owner}`,
        `workflow:${github.context.workflow}`,
        `ref:${github.context.ref}`,
        `sha:${github.context.sha}`
      );
    }
    
    // Create event request
    const request: RequestEventParams = {
      title,
      text,
      alertType,
      priority,
      host,
      tags,
      sourceTypeName
    };
    
    // Send event to Datadog
    const results = await CreateEvent({
      requests: [request],
      aggregationKey
    });
    
    // Set outputs
    if (results && results.length > 0) {
      core.setOutput('eventUrl', results[0].eventUrl);
      core.setOutput('eventId', results[0].response.event?.id?.toString());
    }
    
    core.info(`Successfully sent event to Datadog: ${title}`);
    if (results[0].eventUrl) {
      core.info(`Event URL: ${results[0].eventUrl}`);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

run();