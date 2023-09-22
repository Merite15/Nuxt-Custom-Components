<template>
    <div v-if="active" class="tab">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        required: true,
        type: String
    },
    icon: {
        required: false,
        type: String
    }
})

const register = inject('tabs-register')

const tab = reactive({
    title: toRef(props, 'title'),
    icon: toRef(props, 'icon')
})

const { active, unregister } = register(tab)

onUnmounted(unregister)
</script>