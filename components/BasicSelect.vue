<template>
  <!-- component -->
  <div ref="select" class="relative w-full">
    <!-- trigger button -->
    <button :class="`${isOpen ? 'ring-blue-600' : ''}`"
      class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300" type="button"
      @click="toggle">
      <span :class="`${!modelValue ? 'text-slate-400' : ''}`"
        v-text="`${!modelValue ? (placeholder || 'Veuillez sélectionner ...') : modelValue}`"></span>
      <span class="text-2xl w-5 h-5 grid place-content-center">
        <Icon name="bx:chevron-down" />
      </span>
    </button>

    <!-- list items -->
    <ul v-show="isOpen" class="z-10 absolute mt-2 w-full rounded bg-gray-50 ring-1 ring-gray-300">
      <li v-for="(li, i) in props.data" :key="i" class="cursor-pointer select-none p-2 hover:bg-gray-200"
        @click="selected(li.value)">
        {{ li.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

import { BasicSelect } from "~/utils/types/BasicSelect";

// Declare props
const props = defineProps({
  data: { type: Array<BasicSelect> },
  placeholder: { type: String },
  default: { type: String, required: false },
})

const isOpen = ref<Boolean>(false);
const modelValue = ref<String>();
const select = ref(null);
const emit = defineEmits(['update:modelValue'])

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  if (props.default) {
    modelValue.value = props.default
    emit('update:modelValue', modelValue)
  }
});

// Open and Close dropdown method
const toggle = () => {
  isOpen.value = !isOpen.value
}

// On click outside dropdown auto closed
onClickOutside(select, (event) => isOpen.value = false)

// On option selected
const selected = (value: string) => {

  // Show data on default value
  modelValue.value = value

  // pass data to v-model
  emit('update:modelValue', value)

  // Close modal after selected
  toggle();
}
</script>
utils/types/BasicSelect