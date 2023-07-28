export type TToastStatus = "success" | "warning" | "error";

export type TToastSummary = "Success" | "Attention" | "Erreur";

interface IToast {
    text: string;
    status: TToastStatus;
    title: TToastSummary,
    id: number;
}

type ToastPayload = { timeout?: number; text: string; summary: string };;

const defaultTimeout = 2000;

const createToast = (text: string, status: TToastStatus, title: TToastSummary): IToast => ({
    text,
    status,
    title,
    id: Math.random() * 1000,
});

export const useToasterStore = defineStore("toaster-store", {
    state: (): { toasts: IToast[] } => ({
        toasts: [],
    }),

    actions: {
        updateState(payload: ToastPayload, status: TToastStatus, title: TToastSummary) {
            const { text, timeout } = payload;

            const toast = createToast(text, status, title);

            this.toasts.push(toast);

            setTimeout(() => {
                this.toasts = this.toasts.filter((t) => t.id !== toast.id);
            }, timeout ?? defaultTimeout);
        },

        add(payload: ToastPayload, status: TToastStatus, title: TToastSummary) {
            const { text, timeout = defaultTimeout, summary } = payload;

            if (status === "success") {
                this.success({ text, timeout, summary: summary ?? "Success" });
            } else if (status === "warning") {
                this.warning({ text, timeout, summary: summary ?? "Attention" });
            } else if (status === "error") {
                this.error({ text, timeout, summary: summary ?? "Erreur" });
            }
        },
        
        success(payload: ToastPayload) {
            this.updateState(payload, "success", "Success");
        },

        warning(payload: ToastPayload) {
            this.updateState(payload, "warning", "Attention");
        },

        error(payload: ToastPayload) {
            this.updateState(payload, "error", "Erreur");
        },
    },
});