<template>
    <div>
        <div class="grid grid-flow-col text-center border-b-2 border-gray-200 text-gray-500 gap-5">
            <slot name="headers" :tabs="tabs" :activeTab="activeTab" @changeTab="handleTabChange" />
        </div>
        
        <div class="shadow-md border border-gray-100 font-light p-8 rounded-md text-gray-500 bg-white my-6">
            <template v-for="(tab, index) in tabs">
                <div v-if="index === activeTab" :key="index">
                    <slot :name="tab.slotName"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const { tabs, activeTab } = defineProps(["tabs", "activeTab"]);

const emit = defineEmits();

const handleTabChange = (index: number) => {
    emit("changeTab", index);
};
</script>