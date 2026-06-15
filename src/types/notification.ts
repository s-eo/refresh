export type AppNotificationType = "error" | "success" | "warning";

export interface AppNotification {
    id: number;
    type: AppNotificationType;
    message: string;
    retryAction?: Function;
}