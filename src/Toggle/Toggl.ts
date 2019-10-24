type method = 'get' | 'post' | 'put';

interface Options {
    method?: method;
    headers: {
        'Content-Type': string;
        'Authorization': string;
    };
    payload?: string;
    muteHttpExceptions: boolean;
}


class Toggl {
    apiToken:  string;
    baseURL: string;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
        this.baseURL = 'https://www.toggl.com/api/v8/';
    }

    createEndPoint = (path: string): string => {
        return `${this.baseURL}${path}`;
    }

    startTimeEntry = () => {
        const endPoint: string = this.createEndPoint('time_entries/start');

    }

    stopTimeEntry = (timeEntryId: number) => {
        const endPoint: string = this.createEndPoint(`time_entries/${timeEntryId}/stop`);
    }

    getRunningTimeEntry = () => {
        const endPoint: string = this.createEndPoint(`time_entries/current`);
    }

};
