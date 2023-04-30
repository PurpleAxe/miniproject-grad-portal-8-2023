import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const timeActions = {
  //milliseconds
  postCreate: 5 * 60,
  messageSent: 2 * 60,
};

//TODO when a post has a challenge # it gets the time associated with that challenge

// example
// export const OnUserCollectionChange = functions.firestore
//   .document('/users/{userId}')
//   .onWrite(async (change, context) => {
//     if (!change.before.exists)
//       console.log('New node: ' + JSON.stringify(change.after.data()));
//     if (!change.after.exists)
//       console.log('Deleted node: ' + JSON.stringify(change.before.data()));
//     if (change.before.exists && change.after.exists)
//       console.log('Updated node: ' + JSON.stringify(change.after.data()));
//   });

export const OnPostCreate = functions.firestore
  .document('/posts/{postId}')
  .onCreate(async (change, context) => {
    // console.log('New post: ' + JSON.stringify(change.data()));
    const uid = change.data()?.['userId'];
    updateTimeLeft(uid, timeActions.postCreate);
  });

export const OnConversationUpdate = functions.firestore
  .document('/conversations/{conversationId}')
  .onUpdate(async (change, context) => {
    if (change.before.exists && change.after.exists) {
      const isSameMessage = (a: any, b: any) => a.id === b.id;
      // console.log(
      // 'Conversation updated: ' + JSON.stringify(change.after.data())
      // );
      const prevMessages = change.before.data()?.['messages'];
      // console.log(prevMessages, 'prev messages\n');
      const afterMessages = change.after.data()?.['messages'];
      // console.log(afterMessages, 'after messages\n');

      if (prevMessages.length < afterMessages.length) {
        const onlyInA = onlyInLeft(afterMessages, prevMessages, isSameMessage);
        // console.log(onlyInA, 'only in aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        onlyInA.forEach((e: any) => {
          updateTimeLeft(e.metaData.sender.userId, timeActions.messageSent);
        });
      }
    }
  });

///////////////////
///helper functions
///////////////////
const onlyInLeft = (left: any, right: any, compareFunction: any) =>
  left.filter(
    (leftValue: any) =>
      !right.some((rightValue: any) => compareFunction(leftValue, rightValue))
  );
const updateTimeLeft = async (uid: string, timeToAdd: any) => {
  const profile = await admin.firestore().collection('profiles').doc(uid).get();
  const prev = profile.get('timeLeft').toDate();
  // console.log('prev: ', prev, '\n');

  // const timeChange = timeActions.postCreate * 1000;
  // num(we want) *sec * min * hour * day* mili to sec = 5 years

  // console.log('timeChange: ', timeChange);
  let after = new Date(prev.getTime() + timeToAdd * 1000);

  if (prev.getTime() < Date.now())
    after = new Date(Date.now() + timeToAdd * 1000);

  // console.log('after: ', after, '\n');

  admin.firestore().doc(`profiles/${uid}`).update({ timeLeft: after });
};
