const startTimeTrack = (toggl, timeEntry) => {
    return toggl.startTimeEntry(timeEntry);
};

const stopTimeTrack = (toggl) => {
    return toggl.stopTimeEntry();
};
