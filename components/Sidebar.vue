<template>
    <div class="relative">
        <div v-show="props.open" class="fixed inset-0 bg-black opacity-60 z-50" @click.self="closeModal"></div>

        <transition :name="transitionName">
            <section v-show="props.open" :class="props.position === 'right' ? 'right-0' : ''"
                class="fixed inset-y-0  w-[350px]  text-black bg-white border-l border-indigo-100 z-50 rounded-l-xl">
                <div class="px-4 py-8 flex justify-between items-center">
                    <h2 class="text-lg font-semibold">
                        <slot name="header"></slot>
                    </h2>

                    <Icon @click="closeModal"
                        class="cursor-pointer hover:bg-[#f4f4f5] hover:text-[#18181b] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:outline-offset-0 transition duration-150 rounded-[50%] bg-transparent text-[#71717a] h-[2rem] w-[2rem] font-bold"
                        name="heroicons:x-mark-solid" size="25px" />
                </div>

                <div>
                    <slot name="content"></slot>
                </div>
            </section>
        </transition>
    </div>
</template>

<script setup lang="ts">
interface open {
    open: boolean
    position?: 'right' | 'left'
}

const props = withDefaults(defineProps<open>(), {
    position: "right"
})

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

const transitionName = ref('');

watch(
    () => props.position,
    (newPosition) => {
        console.log(newPosition);
        
        transitionName.value = newPosition === 'right' ? 'sidebar-transition-right' : 'sidebar-transition-left';
    }
);
</script>

<style scoped>
.sidebar-transition-right-enter-active,
.sidebar-transition-right-leave-active {
    transition: 0.5s ease-in-out all;
}

.sidebar-transition-right-enter-from,
.sidebar-transition-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.sidebar-transition-right-enter-to,
.sidebar-transition-right-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.sidebar-transition-left-enter-active,
.sidebar-transition-left-leave-active {
  transition: 0.5s ease-in-out all;
}

.sidebar-transition-left-enter-from,
.sidebar-transition-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.sidebar-transition-left-enter-to,
.sidebar-transition-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>