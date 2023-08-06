<template>
    <div class="flex h-full flex-col bg-gray-200 p-5">
        <CustomBreadCrumb class="w-full  mb-3" :items=links>
            <div class="hidden sm:block">
                <button type="button" @click="confirmAddCategory()"
                    class="inline-block px-6 py-2.5 mr-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-md transition duration-150 ease-in-out">
                    <Icon name="fa6-solid:plus" /> Ajouter
                </button>
            </div>

            <div class="block sm:hidden">
                <button type="button" @click="confirmAddCategory()"
                    class="inline-block px-4 py-2.5  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-md transition duration-150 ease-in-out">
                    <Icon name="fa6-solid:plus" />
                </button>
            </div>
        </CustomBreadCrumb>

        <Message v-if="display_error" :life="3000" icon="pi pi-ban" severity="error">{{
            display_error
        }}
        </Message>

        <Message v-if="success" :life="3000" :sticky="false" icon="pi pi-check" severity="success">{{ success }}
        </Message>

        <LoaderSpinner v-if="loading" />

        <!-- component -->
        <section class="container mx-auto">
            <div class="mt-4 md:flex md:items-center md:justify-between">
                <div v-if="showButton()">
                    <button
                        class="inline-block px-3 py-2  bg-gray-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md  focus:outline-none focus:ring-0active:shadow-md transition duration-150 ease-in-out mr-2">Marquer
                        comme actif</button>

                    <button
                        class="inline-block px-3 py-2  bg-gray-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md  focus:outline-none focus:ring-0active:shadow-md transition duration-150 ease-in-out mr-2">Marquer
                        comme inactif</button>

                    <Icon class="cursor-pointer" size="20" name="ph:trash-fill" />
                </div>

                <div v-else class="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse  ">
                    <button
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm  ">
                        Activé
                    </button>

                    <button
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Inactif
                    </button>

                    <button
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Tout
                    </button>
                </div>
            </div>

            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 ">
                                <thead class="bg-gray-50 ">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-all" type="checkbox" v-model="isCheckedAll"
                                                    @change="checkAll"
                                                    class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  focus:ring-2">
                                                <label for="checkbox-all" class="sr-only">checkbox</label>
                                            </div>
                                        </th>

                                        <th scope="col"
                                            class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-black">
                                            Nom
                                        </th>

                                        <th scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black">
                                            Description
                                        </th>

                                        <th scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 ">
                                    <tr class="group cursor-pointer" v-for="category in Category.allExpenseCategories"
                                        :key="category.id">
                                        <td class="p-4 w-4">
                                            <div class="flex items-center">
                                                <input :id="'checkbox-' + category.id" type="checkbox" v-model="checkedIds"
                                                    :value="category.id"
                                                    class="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label :for="'checkbox-' + category.id" class="sr-only">checkbox</label>
                                            </div>
                                        </td>

                                        <td @click="confirmUpdateCategory(category)"
                                            class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                            <p class="text-sm font-normal text-black">
                                                {{ category.name }}</p>
                                        </td>

                                        <td class="p-4 text-sm font-medium whitespace-nowrap">
                                            <div class="inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ">
                                                {{ category.description }}
                                            </div>
                                        </td>

                                        <td class="px-4 py-4 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100">
                                            <a href="#" class="text-blue-600 divide-x mr-2">Marquer comme Inactif</a>
                                            <Icon @click="confirmDeleteCategory(category)"
                                                class="cursor-pointer text-red-600" size="20" name="ph:trash-fill" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- add expense category -->
        <Dialog v-model:visible="addCategoryDialog" position="top" :modal="true" :style="{ width: '650px' }"
            header="Ajout d'une catégorie">
            <div class="confirmation-content">
                <div>
                    <label for="name"> Nom</label>
                    <input id="name" v-model="add_category.name"
                        class="mt-2 w-full px-3 py-2 mb-1 border-2 text-black border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Le nom de la catégorie" required type="text" />
                </div>

                <div class="mt-2">
                    <label for="message" class="mt-5"> Description</label>
                    <textarea v-model="add_category.description" required
                        class="mt-2 w-full px-3 py-2 mb-1 border-2 text-black border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        id="message" rows="3" placeholder="Sa description"></textarea>
                </div>
            </div>
            <template #footer>
                <div class="flex">
                    <button @click="addCategory()"
                        class="text-sm bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-md py-2 px-3.5">
                        Ajouter
                    </button>
                    <button @click="addCategoryDialog = false"
                        class="text-sm bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-md py-2 px-3.5">
                        Annuler
                    </button>
                </div>
            </template>
        </Dialog>

        <!-- update expense category -->
        <Dialog v-model:visible="updateCategoryDialog" position="top" :modal="true" :style="{ width: '650px' }"
            header="Modification d'une catégorie">
            <div class="confirmation-content">
                <div>
                    <label for="name"> Nom</label>
                    <input id="name" v-model="oneCategory.name"
                        class="mt-2 w-full px-3 py-2 mb-1 border-2 text-black border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Le nom de la catégorie" required type="text" />
                </div>

                <div class="mt-2">
                    <label for="message" class="mt-5"> Description</label>
                    <textarea v-model="oneCategory.description"
                        class="mt-2 w-full px-3 py-2 mb-1 border-2 text-black border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        id="message" rows="3" placeholder="Sa description"></textarea>
                </div>
            </div>
            <template #footer>
                <div class="flex">
                    <button @click="updateCategory(Number(oneCategory.id))"
                        class="text-sm bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-md py-2 px-3.5">
                        Modifier
                    </button>
                    <button @click="updateCategoryDialog = false"
                        class="text-sm bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-md py-2 px-3.5">
                        Annuler
                    </button>
                </div>
            </template>
        </Dialog>

        <!-- delete category -->
        <Dialog v-model:visible="deleteCategoryDialog" position="top" :modal="true" :style="{ width: '650px' }"
            header="Suppression d'une catégorie">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="oneCategory">Êtes-vous sûr que vous voulez supprimer la catégorie
                    <b>{{ oneCategory.name }}</b>?</span>
            </div>
            <template #footer>
                <div class="flex">
                    <button @click="deleteCategory(Number(oneCategory.id))"
                        class="text-sm bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-md py-2 px-3.5">
                        Supprimer
                    </button>
                    <button @click="deleteCategoryDialog = false"
                        class="text-sm bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-md py-2 px-3.5">
                        Annuler
                    </button>
                </div>

            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import {ExpenseCategory} from "~/utils/models/ExpenseCategory";

import { useToast } from 'primevue/usetoast';

definePageMeta({
    layout: "settings",
    
});

const links = [
    {
        label: 'Paramètres',
    },
    {
        label: 'Gestion des categories de dépenses',
    }
]

const Category = useExpenseCategoryStore()

await Category.getExpenseCategories()

const toast = useToast()

const addCategoryDialog = ref(false);

const updateCategoryDialog = ref(false);

const deleteCategoryDialog = ref(false);

const display_error = ref('');

const loading = ref(false);

const success = ref('');

const isCheckedAll = ref<boolean>(false)

const checkedIds: Ref<(1 | undefined)[]> = ref([]);

const oneCategory = ref<ExpenseCategory>({
    name: ''
})

const add_category = ref<ExpenseCategory>({
    name: ''
})

const confirmAddCategory = () => {
    addCategoryDialog.value = true;
};

// dialog delete category
const confirmDeleteCategory = (category: ExpenseCategory) => {
    oneCategory.value = category;

    deleteCategoryDialog.value = true;
};

const confirmUpdateCategory = (category: ExpenseCategory) => {
    oneCategory.value = category

    updateCategoryDialog.value = true;
};

const checkAll = () => {
    if (isCheckedAll.value) {
        checkedIds.value = Category.allExpenseCategories.map(category => category.id)
    } else {
        checkedIds.value = []
    }
}

const showButton = () => {
    return checkedIds.value.length > 0;
}

// add category
const addCategory = () => {
    success.value = '';

    loading.value = true

    Category.createCategory({
        name : add_category.value.name,
        description : add_category.value.description
    }).then(async (data: any) => {

        await Category.getExpenseCategories()

        success.value = data.value.message

        loading.value = false

    }).catch((error) => {
        display_error.value = error.value.data?.errors

        loading.value = false
    })
    addCategoryDialog.value = false;
};

// update category
const updateCategory = (id : number) => {
    success.value = '';

    loading.value = true

    Category.updateCategory(id, {
        name : oneCategory.value.name,
        description : oneCategory.value.description
    }).then(async (data: any) => {

        await Category.getExpenseCategories()

        success.value = data.value.message

        loading.value = false

    }).catch((error) => {
        display_error.value = error.value.data?.errors

        loading.value = false
    })
    updateCategoryDialog.value = false;
};

// delete category
const deleteCategory = (id: number) => {
    loading.value = true

    Category.deleteCategory(Number(id)).then(async (data: any) => {
        await Category.getExpenseCategories()

        success.value = data.value.message

        loading.value = false
    }).catch((error) => {
        display_error.value = error.value.response._data?.message

        loading.value = false
    })
    deleteCategoryDialog.value = false;
};
</script>