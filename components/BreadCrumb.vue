<template>
    <div>
        <nav aria-label="Breadcrumb"
            class="flex justify-between bg-white shadow-md text-gray-700 border border-gray-200 py-3 px-5 rounded-lg">
            <ol class="inline-flex items-center space-x-1 md:space-x-3 cursor-pointer">
                <li class="inline-flex items-center">
                    <NuxtLink class="text-sm text-gray-700 dark:text-white hover:text-cyan-600 inline-flex items-center font-bold"
                        to="/dashboard">
                        <Icon class="w-4 h-4 mr-2" name="cil:building"></Icon>
                        <span v-if="society">
                            {{ society.toUpperCase() }}
                        </span>
                        <span v-else>
                            HOME
                        </span>
                    </NuxtLink>
                </li>
                <li v-for="(item, i) in props.items" :key="i" class="inline-flex items-center">
                    <NuxtLink :to="item.url ?? route.path"
                        class="text-sm text-gray-700 dark:text-white hover:text-gray-900 inline-flex items-center">
                        <Icon class="w-4 h-4 mr-2" name="bx:chevron-right" />
                        {{ item.label.toUpperCase() }}
                    </NuxtLink>
                </li>
            </ol>

            <div>
                <slot />
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>

const user = useAuthStore()

const society = user.getUser.current_user_company?.name;

const route = useRoute();

interface BreadItem {
    label: string,
    url?: string
}

const props = defineProps<{ items: BreadItem[] }>()
</script>
