<template>
    <div class="pb-8 w-full bg-white h-full">
        <div class="form-wrapper h-screen  p-4 md:p-6 lg:p-8 flex justify-center items-center ">
            <form
                class="rounded-2xl  backdrop-blur-lg p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-1px border-solid border-white border-opacity-30 shadow-black/70 shadow-2xl">
                <h3 class="mb-1 text-md ">
                    KITUO Invoice - Configuration de l’organisation
                </h3>
                <h1 class="mb-6 uppercase font-bold  text-xl md:text-2xl lg:text-2xl ">
                    Bienvenue à bord, Nebel Mass !
                </h1>
                <p class="mb-6  text-sm /70 text-opacity-50 ">
                    Entrez les détails de votre organisation pour démarrer avec KITUO Invoice.
                </p>

                <label for="email" class="form-label relative block mb-4 text-black/50 focus-within:text-#333"> Nom de l'organisation</label>
                <input
                    class="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  transition-colors duration-200 py-3 pr-3 md:py-4 mb-4 md:pr-4 lg:py-4 lg:pr-4 pl-2 bg-black/20 focus:bg-black/25 text-#333 focus:text-black "
                    type="email" name="email" id="email" placeholder="Email" />


                <label for="password" class="form-label relative text-black/50 focus-within:text-#333 block mb-4"></label>

                <input
                    class="block mb-4 w-full rounded-lg leading-none focus:outline-none placeholder-black/50  transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-2 bg-black/20 focus:bg-black/25 text-#333 focus:text-black "
                    type="password" name="password" id="password" placeholder="Password" />


                <button
                    class="form-input w-full rounded-lg font-bold text-white focus:outline-none  p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700 ">
                    Mise en route
                </button>
            </form>
        </div>
    </div>
</template>


<style scoped>
.form-wrapper {
    background: #07c url(https://source.unsplash.com/qDbaQGEwPtI/2400x1823) center / cover no-repeat fixed;
    font: 1em/1.618 Nunito, sans-serif;
}
</style>
