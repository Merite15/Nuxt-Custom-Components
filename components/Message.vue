<template>
    <Transition name="message">
        <div v-show="isVisible" class="w-full">
            <div :class="getTypeClass(type)" class="rounded-lg shadow-sm mt-2 p-3 ">
                <div class="flex items-center justify-between ">
                    <p>
                        <Icon :name="getIconName(type)" size="25px" :class="getIconColor(type)" />

                        <span :class="getIconColor(type)" class="capitalize ml-2 text-sm">
                            <slot name="message"></slot>
                        </span>
                    </p>

                    <button type="button" class="cursor-pointer py-2 px-3 hover:opacity-100">
                        <Icon @click="closeMessage" name="heroicons:x-mark" :class="getIconColor(type)" size="25px" />
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
interface messageAttributes {
    type?: 'error' | 'success' | 'warning',
    timeout?: number,
}

let isVisible = ref<boolean>(true);

const DEFAULT_TIMEOUT = 2000;

const props = defineProps<messageAttributes>()

const emit = defineEmits(['update:close'])

const getTypeClass = (type?: string) => {
    switch (type) {
        case 'success':
            return 'bg-green-100/80';
        case 'error':
            return 'bg-red-100/80';
        default:
            return 'bg-white';
    }
}

const getIconName = (type?: string) => {
    switch (type) {
        case 'success':
            return 'heroicons:check';
        case 'error':
            return 'heroicons:x-circle';
        default:
            return '';
    }
}

const getIconColor = (type?: string) => {
    switch (type) {
        case 'success':
            return 'text-green-700';
        case 'error':
            return 'text-red-700';
        default:
            return 'text-black';
    }
}

function closeMessage() {
    emit('update:close', close)
}

watch(
    () => props.timeout,
    (newValue) => {
        if (newValue && newValue > 0) {            
            isVisible.value = true;
            setTimeout(() => {
                isVisible.value = false;
            }, newValue);
        }
    },
    { immediate: true } // Ajout de l'option "immediate" pour déclencher le watch dès le montage
);
</script>

<style scoped>
.message-enter-from,
.message-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.message-enter-active,
.message-leave-active {
    transition: 0.5s ease all;
}
</style>
