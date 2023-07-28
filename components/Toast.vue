<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="toastStore.toasts.length"
                class="flex flex-col justify-center items-center  fixed top-[3%] right-5 z-50">
                <div v-for="toast in toastStore.toasts" :class="getBgStatus(toast.status)"
                    class=" w-[400px]  border-l-[5px] border-gray-300  p-3 rounded-tr-md rounded-br-md shadow-lg  mb-6"
                    role="alert">

                    <div class="flex  justify-between ">
                        <div class="flex">
                            <Icon :class="getIconClass(toast.status)" :name="toastIconMap[toast.status]" size="35" />
                            <div class="flex flex-col mt-1 ml-2">
                                <h2 :class="getStatusClass(toast.status)">{{ toast.title }}</h2>
                                <p class="my-2" :class="getIconClass(toast.status)"> {{ toast.text }}</p>
                            </div>
                        </div>
                        <Icon class="cursor-pointer trash rounded-md  w-[2rem] h-[2rem] mr-3" :class="getIconClass(toast.status)"
                            name="bx:x" />
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { TToastStatus } from "stores/toaster";

const toastClassMap: Record<TToastStatus, string> = {
    warning: "warning",
    error: "error",
    success: "success",
};

const toastIconMap: Record<TToastStatus, string> = {
    error: "bx-x-circle",
    warning: "bx-error",
    success: "bx-check",
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'success':
            return 'font-bold text-base font-bold text-[#059669]';
        case 'warning':
            return 'font-bold text-base font-bold text-yellow-500';
        case 'error':
            return 'font-bold text-base font-bold text-[#DC2626]';
        default:
            return 'font-bold text-base font-semibold';
    }
}

const getIconClass = (status: string) => {
    switch (status) {
        case 'success':
            return 'text-[#059669]';
        case 'warning':
            return 'text-yellow-500';
        case 'error':
            return 'text-red-500';
        default:
            return 'text-black';
    }
    
}

const getBgStatus = (status: string) => {
    switch (status) {
        case 'success':
            return 'bg-[#DFEEE7] ';
        case 'warning':
            return 'bg-yellow-300/40';
        case 'error':
            return 'bg-[#EFE5BD]';
        default:
            return 'bg-white border-l-4 border-bg-gray-300';
    }
}

const toastStore = useToasterStore();
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
    transition: 0.5s ease all;
}

.trash:focus {
    outline: 0 none;
    border-radius: 20px;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #6366F1;
}
</style>
