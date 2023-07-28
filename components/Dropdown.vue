<template>
    <div class="flex items-center justify-center bg-gray-100 ">
        <div class="relative text-lg w-48">
            <button class="flex items-center justify-between px-3 py-2 bg-white w-full border border-gray-500 rounded-lg"
                @click="isOptionsExpanded = !isOptionsExpanded" @blur="isOptionsExpanded = false">
                <span>{{ selectedOption }}</span>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                    :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <Transition name="ease-custom">
                <ul v-show="isOptionsExpanded"
                    class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden">
                    <li v-for="(option, index) in options" :key="index"
                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                        @mousedown.prevent="setOption(option)">
                        {{ option }}
                    </li>
                </ul>
            </Transition>

        </div>
    </div>
</template>

<script setup lang="ts" >
const isOptionsExpanded = ref<boolean>(false)

const selectedOption = ref<string>("1x")

const options = ref(["1x", "2x", "3x", "4x or more"])

const setOption = (option: string) => {
    selectedOption.value = option;
    isOptionsExpanded.value = false;
}

</script>

<style>
.ease-custom-enter-active {
    transform: transition duration-500;
    transition-timing-function: cubic-bezier(.61, -0.53, .43, 1.43);
}

.ease-custom-enter {
    transform: translate-y(-50%) scale-y-0;
    opacity: 0;
}

.ease-custom-enter-to {
    transform: translate-y(0) scale-y-100;
    opacity: 1;
}

.ease-custom-leave-active {
    transform: transition duration-300;
    transition-timing-function: cubic-bezier(.61, -0.53, .43, 1.43);
}

.ease-custom-leave {
    transform: translate-y(0) scale-y-100;
    opacity: 1;
}

.ease-custom-leave-to {
    transform: translate-y(-50%) scale-y-0;
    opacity: 0;
}
</style>