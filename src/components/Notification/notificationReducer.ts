import {AppNotification} from "../../types/notification";

export type notificationDispathType =  {
    type: "add";
    payload: Omit<AppNotification, 'id'>;
} | {
    type: "remove";
    payload: number;
}

let id = 0;

export default function notificationReducer(currentNotifications: AppNotification[], { type, payload }: notificationDispathType): AppNotification[] {
    switch (type) {
        case "add":
            id += 1;
            return [{...payload, id}, ...currentNotifications];

        case "remove":
            return currentNotifications.filter(card => card.id !== payload);

        default:
            return currentNotifications;
    }
}