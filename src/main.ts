function doPost(e) {

    const params: any = JSON.parse(e.postData.getDataAsString());

    if (params.event !== 'taskUpdated') {
        throw new Error('Invalid event.');
    }

    const historyItem = params.history_items[0];

    if (historyItem.field !== 'status') {
        throw new Error('Invalid field');
    }

    const taskId: string = params.task_id;
    const historyItemAfter = historyItem.after;

    console.log('ここまで来た');

    const togglApiToken: string = PropertiesService.getScriptProperties().getProperty('TOGGL_API_TOKEN');

    const toggl = Toggl.getToggl(togglApiToken);

    let res;
    switch (historyItemAfter.status) {
        case 'in progress':
            res = startTimeTrack(taskId);
            break;
        case 'Closed':
            res = stopTimeTrack(toggl);
            break;
        case 'pause':
            res = stopTimeTrack(toggl);
            console.log(res);
            break;
        default:
    }
    console.log(params);

    return ContentService
        .createTextOutput(JSON.stringify({ 'statusCode': 200 }))
        .setMimeType(ContentService.MimeType.JSON);
};
