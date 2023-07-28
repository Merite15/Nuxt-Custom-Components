<template>
    <div class="relative">
        <div ref="referenceRef" class="inline-block" @blur="hide" @focus="show" @mouseenter="show" @mouseleave="hide">
            <slot />
        </div>
        <div ref="floatingRef" :class="[
            'absolute bottom-4 left-24 z-50 bg-gray-700 text-sm text-white p-3 rounded-md cursor-default',
            isHidden && 'hidden',
        ]">
            {{ text }}
            <div ref="arrowRef" class="absolute bg-gray-700 h-[14px] w-[14px] rotate-45"></div>
        </div>

    </div>
</template>

<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true,
    },
})

const isHidden = ref(true);

const hide = () => {
    isHidden.value = true;
}

const show = () => {
    isHidden.value = false;
}
</script>

