import { DocumentReference } from '@angular/fire/firestore';
export interface ILikedAndDisliked{
      liked: DocumentReference[],
      disliked: DocumentReference[]
}
