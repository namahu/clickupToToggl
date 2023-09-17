import { getClickupTaskByTaskID } from './clickup';
import type { ClickupTimeTrackedEvent } from './clickup';
import { createTimeEntryData, postTimeEntry } from './toggl';

type Properties = {
  [key: string]: string | number;
  CLICKUP_API_TOKEN: string;
  TOGGL_API_TOKEN: string;
  TOGGL_WORKSPACE_ID: number;
};

//eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(event: GoogleAppsScript.Events.DoPost) {
  if (event === undefined) {
    throw new Error('event is undefined');
  }
  console.log(event);

  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties() as Properties;

  const contents: ClickupTimeTrackedEvent = JSON.parse(event.postData.contents);
  console.log(contents);

  const taskID = contents.task_id;

  const clickupTask = getClickupTaskByTaskID(
    taskID,
    properties.CLICKUP_API_TOKEN
  );

  const togglTimeEntry = createTimeEntryData(
    Object.assign(contents, clickupTask),
    Number(properties.TOGGL_WORKSPACE_ID)
  );

  const response = postTimeEntry(togglTimeEntry, properties.TOGGL_API_TOKEN);

  console.log(response);

  return ContentService.createTextOutput('Hello World');
}
