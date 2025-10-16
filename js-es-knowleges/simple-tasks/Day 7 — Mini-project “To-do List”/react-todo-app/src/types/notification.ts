export type GlobalNotificationType = "error" | "success" | "warning";

export interface GlobalNotification {
    id: number;
    type: GlobalNotificationType;
    message: string;
    retryAction?: Function;
}