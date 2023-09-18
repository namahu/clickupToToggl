type TogglProject = {
  active: boolean;
  actual_hours: number | null;
  actual_seconds: number | null;
  at: string;
  auto_estimates: boolean | null;
  billable: boolean;
  client_id: number | null;
  color: string;
  created_at: string;
  currency: string | null;
  end_date: string;
  estimated_hours: number | null;
  estimated_seconds: number | null;
  first_time_entry: string;
  fixed_fee: number;
  id: number;
  is_private: boolean;
  name: string;
  rate: number;
  rate_last_updated: string | null;
  recurring: boolean;
  recurring_parameters: {
    custom_period: number;
    estimated_seconds: number;
    parameter_end_date: string | null;
    parameter_start_date: string;
    period: string;
    project_start_date: string;
  }[];
  server_deleted_at: string | null;
  start_date: string;
  template: boolean | null;
  wid: number;
  workspace_id: number;
};

export const findTogglProjectIDByClickupSpaceName = (
  projects: TogglProject[],
  spaceName: string
): number | undefined => {
  return projects.find(project => project.name === spaceName)?.id;
};

export const getTogglProjects = (
  workspace_id: number,
  token: string
): TogglProject[] => {
  const url =
    'https://api.track.toggl.com/api/v9/workspaces/' +
    workspace_id +
    '/projects';

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Basic ' + Utilities.base64Encode(token + ':api_token'),
    },
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  return json;
};

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTogglProjectsTest = () => {
  const scriptProperty = PropertiesService.getScriptProperties();
  const properties = scriptProperty.getProperties();

  const projects = getTogglProjects(
    Number(properties.TOGGL_WORKSPACE_ID),
    properties.TOGGL_API_TOKEN
  );

  console.log(projects);
};
