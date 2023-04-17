import * as admin from 'firebase-admin';
import { ISearchRequest } from '@mp/api/search/util';

console.log("Hello world, can you hear me?")
admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

var searchRequest: ISearchRequest = {search: {text: "name", field: " "}}

export * from './functions';
