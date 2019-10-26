/**
 * Clickupから取得したタスクからTogglへのtime entryを作成する
 *
 * @param task - Clickup task
 * @return - toggl time entry
 *
 */
const createTogglTimeEntry = (task) => {

    const getTagDataInTask = (tags): string[] => {
        if (tags.length === 0) {
            return [];
        }
        return tags.map(tag => tag.name);
    };
    return {
        discription: `${task.name} ${task.id}`,
        tags: getTagDataInTask(task.tags),
        created_with: 'ClickupToToggl'
    };
};

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

    const scriptProperties = PropertiesService.getScriptProperties().getProperties();
    const togglApiToken: string = scriptProperties.TOGGL_API_TOKEN;
    const clickupApiToken: string = scriptProperties.CLICKUP_API_TOKEN;

    const toggl = Toggl.getToggl(togglApiToken);

    let res;
    switch (historyItemAfter.status) {
        case 'in progress':
            const clickup = Clickup.getClickup(clickupApiToken);
            // todo: Clickupからtaskを取得
            const clickupTask = clickup.getTaskByTaskId(taskId);
            const togglTimeEntry = createTogglTimeEntry(clickupTask);
            // todo: togglからプロジェクトを取得
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
