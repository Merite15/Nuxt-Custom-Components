<template>
    <div class="w-full flex items-start justify-center">
        <div class="w-full h-full flex">
            <div v-if="!file.isUploaded" class="p-4 bg-white rounded-lg">
                <div class="p-5 relative border-4 border-dotted flex flex-col border-gray-300 rounded-lg w-[450px]">
                    <Icon class="text-indigo-600  mx-auto mb-4" size="100" name="material-symbols:drive-folder-upload" />

                    <div class="flex flex-col text-center">
                        <label>
                            <input class="text-sm cursor-pointer w-36 hidden" type="file" name="" id=""
                                @change="handleFileChange($event)" />
                            <div
                                class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 uppercase w-96 mx-auto px-3 hover:bg-indigo-500">
                                Sélectionner un fichier</div>
                        </label>

                        <div class="title text-indigo-500 uppercase mt-2">ou Déposez des fichiers ici</div>

                        <div v-if="errors.length > 0">
                            <div class="mt-[10px] text-red-500 text-sm" v-for="(error, index) in errors" :key="index">
                                <span>{{ error }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="file.isUploaded"
                class="text-center p-5 relative border-4 border-dotted flex flex-col border-gray-300 rounded-lg w-[450px]">
                <img :src="file.url" v-if="file.isImage" class="w-full h-[300px]  object-contain" alt="" />
                <div v-if="!file.isImage"
                    class="h-[100px] w-[100px] rounded-md bg-gray-400 flex justify-center items-center text-lg p-2 uppercase font-medium mx-auto">
                    {{ file.fileExtension }}
                </div>

                <span class="text-base font-medium text-black">
                    {{ file.name }}{{ file.isImage ? `.${file.fileExtension}` : "" }}
                </span>
                <div>
                    <button
                        class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500"
                        @click="resetFileInput()">Changer le fichier</button>
                </div>
                <div style="margin-top: 10px">
                    <button
                        class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500"
                        @click="sendDataToParent()">Sélectionner le fichier</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
interface File {
    name: string,
    size: number,
    type: string,
    fileExtension: string,
    url: any,
    data?: string,
    isImage: boolean,
    isUploaded: boolean,
}

const props = defineProps({
    maxSize: {
        type: Number,
        default: 5,
        required: true,
    },
    accept: {
        type: String,
        default: "image/*",
    },
})

const errors = ref<string[]>([])

const isLoading = ref<boolean>(false)
const uploadReady = ref<boolean>(true)

const file = ref<File>({
    name: "",
    size: 0,
    type: "",
    fileExtension: "",
    url: "",
    isImage: false,
    isUploaded: false,
})


const handleFileChange = (e: any) => {    
    errors.value = [];

    if (e.target.files && e.target.files[0]) {
        const fileObj = e.target.files[0];
        const fileSize = Math.round((fileObj.size / 1024 / 1024) * 100) / 100;
        const fileExtension = fileObj.name.split(".").pop();
        const fileName = fileObj.name.split(".").shift();
        const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);

        if (isFileValid(e.target.files[0])) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                file.value = {
                    name: fileName,
                    size: fileSize,
                    type: fileObj.type,
                    fileExtension: fileExtension,
                    isImage: isImage,
                    url: reader.result,
                    isUploaded: true,
                };
            }, false);

            reader.readAsDataURL(fileObj);
        } else {
            console.log("Invalid file");
        }
    }
};

const isFileSizeValid = (fileSize: number) => {    
    if (fileSize <= props.maxSize) {
        return true;
    } else {
        errors.value.push(`La taille du fichier doit être inférieure à ${props.maxSize} MB`);
    }
}

const isFileTypeValid = (fileExtension: string) => {    
    if (props.accept.split(",").includes(fileExtension)) {
        return true;
    } else {
        errors.value.push(`Le type de fichier doit être ${props.accept}`);
    }
}

const isFileValid = (file: File) => {    
    isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
    isFileTypeValid(file.name.split(".").pop() || "");
    if (errors.value.length === 0) {
        return true;
    } else {
        return false;
    }
}

const resetFileInput = () => {
    uploadReady.value = false;
    nextTick(() => {
        uploadReady.value = true;
        file.value = {
            name: "",
            size: 0,
            type: "",
            data: "",
            fileExtension: "",
            url: "",
            isImage: false,
            isUploaded: false,
        };
    });
}

const emit = defineEmits()

const sendDataToParent = () => {
    resetFileInput();
    emit("file-uploaded", file.value);
}
</script>
