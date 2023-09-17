import type { ClickupTask, ClickupTimeTrackedEvent } from '../clickup';

type TogglTimeEntry = {
  billable?: boolean;
  created_with: 'clickupToToggl';
  description?: string;
  duration?: number;
  project_id?: number;
  start: string;
  start_date?: string;
  stop: string;
  tag_action?: 'add' | 'delete';
  tag_ids?: number[];
  tags?: string[];
  task_id?: number;
  user_id?: number;
  workspace_id: number;
};

export const createTimeEntryData = (
  clickup: ClickupTimeTrackedEvent & ClickupTask,
  workspace_id: number
): TogglTimeEntry => {
  return {
    start: new Date(Number(clickup.history_items[0].after.start)).toISOString(),
    stop: new Date(Number(clickup.history_items[0].after.end)).toISOString(),
    description: clickup.name + ' - #' + clickup.task_id,
    tags: clickup.tags,
    created_with: 'clickupToToggl',
    workspace_id,
  };
};

export const postTimeEntry = (timeEntry: TogglTimeEntry, token: string) => {
  const url =
    'https://api.track.toggl.com/api/v9/workspaces/' +
    timeEntry.workspace_id +
    '/time_entries';

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Basic ' + Utilities.base64Encode(token + ':api_token'),
    },
    payload: JSON.stringify(timeEntry),
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  return json;
};

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const postTimeEntryTest = () => {
  const scriptProperty = PropertiesService.getScriptProperties();
  const properties = scriptProperty.getProperties();

  const timeEntry: TogglTimeEntry = {
    start: '2023-09-17T03:12:04Z',
    stop: '2023-09-17T03:12:49Z',
    description: 'Renewal-application',
    tags: [],
    created_with: 'clickupToToggl',
    workspace_id: Number(properties.TOGGL_WORKSPACE_ID),
  };

  const response = postTimeEntry(timeEntry, properties.TOGGL_API_TOKEN);

  console.log(response);
};
