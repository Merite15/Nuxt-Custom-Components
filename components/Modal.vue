<template>
    <div class="relative">
        <div v-show="props.open" class="fixed inset-0 bg-black/60  z-50"></div>

        <div class="fixed top-[8rem] left-0 right-0  flex flex-col items-center justify-center z-50">
            <Transition name="modal-transition">
                <div v-show="props.open" class="absolute w-[650px] py-2  bg-white rounded-lg shadow-lg">

                    <header class="flex items-center px-5 py-3  border-gray-300  justify-between ">
                        <div class=" w-full font-bold text-black text-xl">
                            <slot name="header"></slot>
                        </div>
                    </header>

                    <main class="px-5 py-6 text-gray-600">
                        <slot name="content"></slot>
                    </main>

                    <footer class="flex justify-end px-5 pt-3  mb-5 border-gray-300">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </Transition>
        </div>

    </div>
</template>

<script setup lang="ts">
interface open {
    open: boolean
}

const props = defineProps<open>()

const emit = defineEmits(['update:close'])

function closeModal() {
    emit('update:close', close)
}

watchEffect(() => {
    if (props.open) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
});
</script>

<style scoped>
.modal-transition-enter-active,
.modal-transition-leave-active {
    transition: 0.5s ease-in-out all;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.modal-transition-enter-to,
.modal-transition-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>

