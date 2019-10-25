const startTimeTrack = (taskId: string) => {

};

const stopTimeTrack = (toggl) => {
    console.log(toggl);
    return toggl.getRunningTimeEntry();
};
