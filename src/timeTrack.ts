const startTimeTrack = (taskId: string) => {
    const clickupApiToken: string = PropertiesService.getScriptProperties().getProperty('CLICKUP_API_TOKEN');
    const clickup = Clickup.getClickup(clickupApiToken);

    const task = clickup.getTaskByTaskId(taskId);

};

const stopTimeTrack = (toggl) => {
    return toggl.stopTimeEntry();
};
