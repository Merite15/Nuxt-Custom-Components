<template>
    <div class="w-full lg:w-6/12 xl:w-3/12 pr-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-md">
            <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase font-bold text-xs">{{ props.name }}</h5> <span
                            class="font-semibold text-xl text-blueGray-700">{{ props.number }}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                        <div
                            :class="`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-md rounded-full bg-${props.color}-500`">
                            <slot name="icon" />
                        </div>
                    </div>
                </div>
                <p class="text-sm text-blueGray-400 mt-4"><span :class="`mr-2 text-${props.color}-500`"><i
                            class="fas fa-arrow-up"></i> 12%</span> <span class="whitespace-nowrap">Since last
                        month</span></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface inputAttributes {
    color: string,
    name: string,
    number: string | number
}

const props = defineProps<inputAttributes>()
</script>
