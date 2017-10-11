

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfigService, StorageService } from 'ng2-alfresco-core';

@Injectable()
export class DebugAppConfigService extends AppConfigService {

    constructor(private storage: StorageService, http: Http) {
        super(http);
    }

    /** @override */
    get<T>(key: string): T {
        if (key === 'ecmHost' || key === 'bpmHost') {
            return <T>(<any>this.storage.getItem(key) || super.get<T>(key));
        }
        return super.get<T>(key);
    }

}
