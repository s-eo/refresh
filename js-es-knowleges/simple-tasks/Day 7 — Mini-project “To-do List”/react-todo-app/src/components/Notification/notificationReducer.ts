import {GlobalNotification} from "../../types/notification";

type reducerArguments =  {
    type: "add";
    payload: Omit<GlobalNotification, 'id'>;
} | {
    type: "remove";
    payload: number;
}

let id = 0;

export default function notificationReducer(currentNotifications: GlobalNotification[], { type, payload }: reducerArguments): GlobalNotification[] {
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