import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export const OnUserCollectionChange = functions.firestore
  .document('/users/{userId}')
  .onWrite(async (change, context) => {
    if (!change.before.exists)
      console.log('New node: ' + JSON.stringify(change.after.data()));
    if (!change.after.exists)
      console.log('Deleted node: ' + JSON.stringify(change.before.data()));
    if (change.before.exists && change.after.exists)
      console.log('Updated node: ' + JSON.stringify(change.after.data()));
  });
export const OnPostCreate = functions.firestore
  .document('/posts/{postId}')
  .onCreate(async (change, context) => {
    console.log('New post: ' + JSON.stringify(change.data()));
    const uid = change.data()?.['userId'];
    const user = await admin.firestore().collection('users').doc(uid).get();
    const prev = user.get('timeLeft').toDate();
    console.log('prev: ', prev, '\n');

    const timeChange = 5 * 60 * 60 * 24 * 365 * 1000;
    // num(we want) *sec * min * hour * day* mili to sec = 5 years

    console.log('timeChange: ', timeChange);
    const after = new Date(prev.getTime() + timeChange);
    console.log('after: ', after, '\n');

    admin.firestore().doc(`users/${uid}`).update({ timeLeft: after });
  });
