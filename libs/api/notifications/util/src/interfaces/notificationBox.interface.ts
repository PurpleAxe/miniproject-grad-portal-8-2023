import { INotifications } from "./notifications.interface";
import { IProfile } from "@mp/api/profiles/util";

export interface INotificationBox {
  user? : IProfile|null|undefined;
  inbox : INotifications[];
}


