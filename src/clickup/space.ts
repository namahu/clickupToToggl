type ClickupSpace = {
  id: string;
  name: string;
  private: boolean;
  status: string[];
  multiple_assignees: boolean;
  features: {
    due_dates: {
      enabled: boolean;
      start_date: boolean;
      remap_due_dates: boolean;
      remap_closed_due_date: boolean;
    };
    time_tracking: {
      enabled: boolean;
    };
    tags: {
      ebp: boolean;
    };
    time_estimate: {
      enabled: boolean;
    };
    checklists: {
      enabled: boolean;
    };
    custom_fields: {
      enabled: boolean;
    };
    remap_dependencies: {
      enabled: boolean;
    };
    dependency_warning: {
      enabled: boolean;
    };
    portfolios: {
      enabled: boolean;
    };
  };
};

export const getClickupSpaceBySpaceID = (
  id: string,
  token: string
): ClickupSpace => {
  const url = `https://api.clickup.com/api/v2/space/${id}`;
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
    headers: {
      Authorization: token,
    },
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const project = JSON.parse(response.getContentText());
  return project;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getClickupSpaceBySpaceIDTest = () => {
  const scriptProperty = PropertiesService.getScriptProperties();
  const properties = scriptProperty.getProperties();

  const space = getClickupSpaceBySpaceID(
    properties.CLICKUP_SPACE_ID,
    properties.CLICKUP_API_TOKEN
  );

  console.log(space);
};
