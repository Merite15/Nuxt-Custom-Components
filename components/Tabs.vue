<template>
    <div>
        <div class="grid grid-flow-col text-center text-gray-500 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg p-1 my-2">

            <button v-for="tab in tabs" class="flex justify-center py-2 cursor-pointer uppercase"
                :class="{ ' bg-white dark:bg-gray-900  rounded-lg shadow': tab === active }" @click="activate(tab)">
                <Icon v-if="tab.icon" class="mx-2 w-6 h-6 object-cover rounded-lg hidden sm:block" :name="tab.icon" />
                {{
                    tab.title }}
            </button>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>
const active = ref(null)

const tabs = reactive([])

const activate = tab => {
    active.value = tab
}

provide('tabs-register', tab => {
    tabs.push(tab)

    if (!active.value) {
        activate(tab)
    }

    return {
        active: computed(() => active.value === tab),

        unregister() {
            const index = tabs.indexOf(tab)
            tabs.splice(index, 1)

            if (active.value === tab) {
                activate(tabs[0])
            }
        }
    }
})
</script>