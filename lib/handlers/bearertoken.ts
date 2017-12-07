// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ifm = require('../Interfaces');
import { HttpClient } from '../HttpClient';  // TODO: Fix to import in way that is consistent with other code. Search for this code in entire codebase.

export class BearerCredentialHandler implements ifm.IRequestHandler {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options:any): void {
        options.headers['Authorization'] = 'Bearer ' + this.token;
        options.headers['X-TFS-FedAuthRedirect'] = 'Suppress';
    }

    // This handler cannot handle 401
    canHandleAuthentication(res: ifm.IHttpResponse): boolean {
        return false;
    }

    handleAuthentication(httpClient: HttpClient, options: any, objs, finalCallback): void {
    }
}
