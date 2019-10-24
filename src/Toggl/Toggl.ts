class Toggl {

    private apiToken: string;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
    }

    startTimeEntry = (obj) => {
        const req = new TogglRequest_(this.apiToken);
        return req.post('time_entries/start', obj);
    }

    stopTimeEntry = (timeEntryId: number) => {
        const endPoint: string = this.createEndPoint(`time_entries/${timeEntryId}/stop`);
    }

    getRunningTimeEntry = () => {
        const endPoint: string = this.createEndPoint(`time_entries/current`);
    }

};
