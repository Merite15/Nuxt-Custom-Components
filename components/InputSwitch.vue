<template>
    <label class="flex cursor-pointer select-none items-center">
        <div class="relative">
            <input type="checkbox" :checked="isChecked" @change="handleCheckboxChange" class="sr-only" />
            <div :class="`box block h-8 w-14 rounded-full ${isChecked ? 'bg-green-500' : 'bg-slate-800'}`"></div>
            <div
                :class="`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : ''}`">
            </div>
        </div>
    </label>
</template>

<script lang="ts" setup>
const props = defineProps(
    {
        isChecked: {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

const emit = defineEmits(['change:value'])

const handleCheckboxChange = (event: { target: { value: any; }; }) => {
    emit('change:value', event.target.value);
}
</script>