<template>
    <div class="flex items-center p-3 bg-white rounded-xl shadow-md border">
      <div v-if="props.icon" class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
        <Icon class="w-6 h-6 fill-current text-green-700" name="heroicons:arrow-up-solid"/>
      </div>
      <div class="flex-grow flex flex-col ml-4">

        <div class="flex items-center justify-between">
          <span v-if="props.is_currency" class="text-lg text-gray-600 dark:text-white font-bold">{{ props.value?.toLocaleString('de-DE') ?? 0 }} {{  props.currency  }} </span>
          <span v-else class="text-lg text-gray-600 dark:text-white font-bold">{{ props.value?.toLocaleString('de-DE') ?? 0 }} </span>
          <span class="text-green-500 text-sm font-semibold ml-2">{{ props.percent ?? '+12.6%' }}</span>
        </div>
        <span :class="props.textColor ?? 'text-gray-500 dark:text-white'" class="text-sm mt-2">{{ props.text ?? 'Revenue last 30 days' }}</span>
      </div>
    </div>
</template>

<script lang="ts" setup>
interface inputAttributes {
  color?: boolean,
  value?: number,
  text?: string,
  percent?: number,
  number?: string | number,
  icon?: boolean,
  is_currency?: boolean,
  currency?: string
  textColor?: string,
}

// props with default value
const props = withDefaults(defineProps<inputAttributes>(), {
  icon: true,
  is_currency: false,
})
</script>
