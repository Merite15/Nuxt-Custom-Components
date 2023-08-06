
<template>
    <div class="flex justify-center h-screen items-center bg-gradient-to-r from-sky-400 to-blue-500">
        <div class="container mx-auto my-4 px-4 lg:px-20 ">
            <div
                class="w-full backdrop-blur-lg p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-1px border-solid border-white border-opacity-30 shadow-black/70 lg:w-8/12 mx-auto rounded-2xl shadow-2xl">
                <div class="flex p-2">
                    <h1
                        class="font-bold flex justify-center items-center w-full px-4 py-6 rounded-l-lg rounded-r-lg text-xl bg-blue-200">
                        <img alt="Logo" class="w-10 mr-2"
                            src="https://ges-flow.com/wp-content/uploads/2022/10/Plan-de-travail-1-copie-23.png" />
                        KITUO Invoice - Configuration de l’organisation
                    </h1>
                </div>

                <div class="p-8 my-3">
                    <h2 class="font-semibold text-lg">
                        Bienvenue à bord, {{ auth.getUser.name }} !
                    </h2>
                    <p class="text-sm my-2">
                        Entrez les détails de votre organisation pour démarrer avec KITUO
                        Invoice.
                    </p>
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-8">
                        <div class="col-span-2">
                            <label for="email" class="form-label relative block text-black text-sm">
                                Nom de l'organisation <span class="text-red-600">*</span></label>
                            <input required
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline shadow-sm"
                                type="text" placeholder="Nom de l'organisation*" />
                        </div>

                        <div>
                            <label for="country" class="form-label relative block text-black text-sm">
                                Pays de l'organisation
                                <span class="text-red-600">*</span></label>
                            <input
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Pays*" />
                        </div>
                        <div>
                            <label for="currency" class="form-label relative block text-black text-sm">
                                Devise de l'organisation
                                <span class="text-red-600">*</span></label>
                            <input
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Devise*" />
                        </div>
                        <div class="col-span-2">
                            <input
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Rue 1" />
                        </div>
                        <div class="col-span-2">
                            <input
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Adresse 2" />
                        </div>
                        <div class="col-span-2">
                            <input
                                class="w-full opacity-40 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Ville" />
                        </div>
                    </div>

                    <div class="mt-3 flex justify-between items-center">
                        <div class="flex">
                            <button
                                class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline">
                                Mise en route
                            </button>

                            <button @click="navigateTo(`/dashboard/companies`)"
                                class="uppercase text-sm font-bold tracking-wide bg-gray-200 text-black p-3 rounded-lg ml-2 focus:outline-none focus:shadow-outline">
                                Retour
                            </button>
                        </div>

                        <a class="block hover:text-blue-600 underline" href="#">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
</script>
