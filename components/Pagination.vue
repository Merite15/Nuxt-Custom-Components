<template>
    <div class="flex">
        <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage" aria-label="Go to first page"
            class="flex items-center px-4 py-2 mx-1 text-gray-700 disabled:bg-gray-300 disabled:hover:text-gray-700 border border-gray-300 shadow-sm transition-colors duration-300 transform bg-white rounded-md  hover:bg-blue-600  hover:text-white ">
            Premier
        </button>

        <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage" aria-label="Go to previous page"
            class="flex items-center px-4 py-2 mx-1 text-gray-700 disabled:bg-gray-300 disabled:hover:text-gray-700 border border-gray-300 shadow-sm transition-colors duration-300 transform bg-white rounded-md  hover:bg-blue-600  hover:text-white ">
            Precedent
        </button>

        <div v-for="page in pages">
            <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }" :aria-label="`Go to page number ${page.name}`"
                class="items-center hidden px-4 py-2 mx-1 text-gray-700 disabled:bg-gray-300 disabled:hover:text-gray-700 border border-gray-300 shadow-sm transition-colors duration-300 transform bg-white rounded-md sm:flex  hover:bg-blue-600  hover:text-white ">
                {{ page.name }}
            </button>
        </div>

        <button type="button" @click="onClickNextPage" :disabled="isInLastPage" aria-label="Go to next page"
            class="flex items-center px-4 py-2 mx-1 text-gray-700 disabled:bg-gray-300 disabled:hover:text-gray-700 border border-gray-300 shadow-sm transition-colors duration-300 transform bg-white rounded-md  hover:bg-blue-600  hover:text-white ">
            Prochain
        </button>
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage" aria-label="Go to last page"
            class="flex items-center px-4 py-2 mx-1 text-gray-700 disabled:bg-gray-300 disabled:hover:text-gray-700 border border-gray-300 shadow-sm transition-colors duration-300 transform bg-white rounded-md  hover:bg-blue-600  hover:text-white ">
            Dernier
        </button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(
    {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: false,
        },
        perPage: {
            type: Number,
            required: false,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    }
)

const startPage = computed(() => {
    if (props.currentPage === 1) {
        return 1;
    }

    if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
    }

    return props.currentPage - 1;
});

const endPage = computed(() => {
    return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
});

const pages = computed(() => {
    const range = [];

    for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
            name: i,
            isDisabled: i === props.currentPage,
        });
    }

    return range;
});

const isInFirstPage = computed(() => {
    return props.currentPage === 1;
});

const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
});

const emit = defineEmits()

// Define methods
const onClickFirstPage = () => {
    emit('pagechanged', 1);
};

const onClickPreviousPage = () => {
    emit('pagechanged', props.currentPage - 1);
};

const onClickPage = (page: any) => {
    emit('pagechanged', page);
};

const onClickNextPage = () => {
    emit('pagechanged', props.currentPage + 1);
};

const onClickLastPage = () => {
    emit('pagechanged', props.totalPages);
};

const isPageActive = (page: any) => {
    return props.currentPage === page;
};
</script>

<style scoped>
.active {
    background-color: #2563EB;
    color: #ffffff;
}
</style>