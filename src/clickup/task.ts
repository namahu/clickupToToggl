export type ClickupTask = {
  id: string;
  custom_id: string;
  name: string;
  text_content: string;
  description: string;
  status: {
    status: string;
    color: string;
    orderindex: number;
    type: string;
  };
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed: string;
  creator: {
    id: number;
    username: string;
    color: string;
    profilePicture: string;
  };
  assignees: string[];
  checklists: string[];
  tags: string[];
  parent: string;
  priority: string;
  due_date: string;
  start_date: string;
  time_estimate: string;
  time_spent: string;
  custom_fields: {}[];
  list: {
    id: string;
  };
  folder: {
    id: string;
  };
  space: {
    id: string;
  };
  url: string;
};

export const getClickupTaskByTaskID = (
  taskID: string,
  token: string
): ClickupTask => {
  const url = `https://api.clickup.com/api/v2/task/${taskID}`;
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
    headers: {
      Authorization: token,
    },
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const task = JSON.parse(response.getContentText());
  return task;
};
