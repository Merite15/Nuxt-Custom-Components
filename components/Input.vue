<template>
  <input :id="id"
    :class="`${col ? 'col-span-' + col : ''}  leading-5 relative  disabled:bg-gray-300   bg-white  overflow-x-auto  focus:ring-0 w-full px-3 py-2 border-2 text-black border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors`"
    :placeholder="placeholder" :required="required" :type="`${type ? type : 'text'}`" :value="modelValue"
    @input="updateValue" />
</template>

<script lang="ts" setup>

interface inputAttributes {
  modelValue?: string | number | Date | null | undefined,
  required?: boolean,
  placeholder?: string,
  id?: string,
  col?: string,
  type?: 'text' | 'email' | 'phone' | 'url' | 'date' | 'number',
}

const props = defineProps<inputAttributes>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: { target: { value: any; }; }) => {
  emit('update:modelValue', event.target.value)
}
</script>