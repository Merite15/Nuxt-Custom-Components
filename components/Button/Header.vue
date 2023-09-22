<template>
    <button type="button" :title="title"
        class="p-1 mr-4 text-black bg-white h-11 w-11 border border-gray-100 dark:border-gray-800 rounded-full dark:bg-gray-800 dark:text-white shadow-sm hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:dark:ring-gray-900 focus:dark:ring-offset-gray-200  focus:ring-offset-4">
        <span class="sr-only">{{ title }}</span>

        <icon :name="icon" class="w-6 h-6" />
    </button>
</template>

<script setup lang="ts">
interface ButtonAttributes {
    title?: string,
    icon: string
}

defineProps<ButtonAttributes>()
</script>

<style scoped></style>