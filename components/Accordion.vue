<template>
    <div>
        <div class="bg-gray-50 w-full flex flex-col items-center justify-center relative">
            <div class="w-full" v-for="(accordion, index) in accordions" :key="index">
                <div class="p-4 bg-gray-200 border border-gray-300 flex  mt-2 cursor-pointer"
                    :class="activeAccordion === index ? 'rounded-tl-md rounded-tr-md ' : 'rounded-md'"
                    @click="toggleAccordion(index)">
                    <Icon name="ic:baseline-keyboard-arrow-right"
                        class="transition-all cursor-pointer text-black/70 duration-200 transform" :class="{
                            'rotate-90': activeAccordion === index,
                            'rotate-0': activeAccordion !== index,
                        }" size="30" />
                    <div class="flex items-center gap-2">
                        <slot name="title" :accordion="accordion"></slot>
                    </div>

                </div>

                <Transition name="accordion">
                    <div v-if="index === activeAccordion" class="mb-2 rounded-br-md rounded-bl-md shadow-sm border p-6">
                        <slot name="content" :accordion="accordion"></slot>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { accordions, activeAccordion } = defineProps(["accordions", "activeAccordion"]);

const emit = defineEmits();

const toggleAccordion = (index: number) => {
    if (index === activeAccordion) {
        emit("changeAccordion", -1);
    } else {
        emit("changeAccordion", index);
    }
};

</script>

<style scoped>
.accordion-enter-from,
.accordion-leave-to {
    opacity: 0;
    transform: translateY(-20px);
    /* Déplacer l'élément vers le haut */
}

.accordion-enter-active,
.accordion-leave-active {
    transition: 0.3s ease all;
}
</style>