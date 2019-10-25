type method = 'get' | 'post' | 'put'
interface RequestOptions {
    method?: method;
    headers: {
        'Content-Type': string;
        'Authorization': string;
    }
    payload?: any;
    muteHttpExceptions: boolean;
}

/**
 * Class that summarizes request processing to Toggl
 *
 * @constructor
 * @param apiToken - Toggl API token
 */
class TogglRequest_ {

    private options: RequestOptions;

    constructor(apiToken: string) {
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${apiToken}:api_token`
            },
            muteHttpExceptions: true
        }
    }

    private baseURL: string = 'https://www.toggl.com/api/v8/';

    private fetchTimeEntryToToggl(path: string, options: RequestOptions): any {
        const url: string = `${this.baseURL}${path}`;
        const res: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url, options);
        const resObj: any = JSON.parse(res.getContentText());

        if (resObj.error) {
            throw new Error(resObj.error.message);
        }

        return resObj;
    }

    get(path: string) {
        this.options.method = 'get';
        return this.fetchTimeEntryToToggl(path, this.options);
    }

    post(path: string, obj: TimeEntries) {
        this.options.method = 'post';

        if (obj) {
            this.options.payload = JSON.stringify(obj);
        }
        return this.fetchTimeEntryToToggl(path, this.options);
    }

    put(path: string) {
        this.options.method = 'put';
        return this.fetchTimeEntryToToggl(path, this.options);
    }
}
