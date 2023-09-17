/**
 * Copyright 2023 namahu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Clickupから取得したタスクからTogglへのtime entryを作成する
 *
 * @param task - Clickup task
 * @return - toggl time entry
 *
 */
const createTogglTimeEntry = (task, projects) => {
  const getTagDataInTask = (tags): string[] => {
    if (tags.length === 0) {
      return [];
    }
    return tags.map(tag => tag.name);
  };

  const getTogglProjectIdFromClickupTask = (list, projects) => {
    return projects.filter(project => project[1] === list.name);
  };

  return {
    description: task.name,
    tags: getTagDataInTask(task.tags),
    pid: getTogglProjectIdFromClickupTask(task.list, projects)[0][0],
    created_with: "ClickupToToggl"
  };
};

const getTogglAllProjectIdAndName = toggl => {
  const togglCurrentUserData = toggl.getCurrentUser(true);
  const projects = togglCurrentUserData.data.projects;

  return projects.map(pj => [pj.id, pj.name]);
};

function doPost(e) {
  const params: any = JSON.parse(e.postData.getDataAsString());
  console.log(params);

  if (params.event !== "taskUpdated") {
    throw new Error("Invalid event.");
  }

  const historyItem = params.history_items[0];

  if (historyItem.field !== "status") {
    throw new Error("Invalid field");
  }

  const taskId: string = params.task_id;
  const historyItemAfter = historyItem.after;

  const scriptProperties = PropertiesService.getScriptProperties().getProperties();
  const togglApiToken: string = scriptProperties.TOGGL_API_TOKEN;
  const clickupApiToken: string = scriptProperties.CLICKUP_API_TOKEN;

  const toggl: Toggl = Toggl.getToggl(togglApiToken);

  let res;
  switch (historyItemAfter.status) {
    case "tracking start":
      const clickup: Clickup = Clickup.getClickup(clickupApiToken);

      const clickupTask = clickup.getTaskByTaskId(taskId);
      const togglAllProjects = getTogglAllProjectIdAndName(toggl);
      const togglTimeEntry = createTogglTimeEntry(
        clickupTask,
        togglAllProjects
      );

      res = startTimeTrack(toggl, togglTimeEntry);

      break;
    case "Closed":
      res = stopTimeTrack(toggl);
      break;
    case "pause":
      res = stopTimeTrack(toggl);

      break;
    default:
  }

  return ContentService.createTextOutput(
    JSON.stringify({ statusCode: 200 })
  ).setMimeType(ContentService.MimeType.JSON);
}
