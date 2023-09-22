<template>
  <div class="bg-gray-200/40 pb-80 h-full">
    <div class="w-10/12 mx-auto">
      <div class="my-2">
        <h2 class="mb-2 underline">InputSwitch</h2>
        <InputSwitch :isChecked="toggleSwitch" @change:value="toggleButton" />
      </div>

      <Button type="button" round="lg" icon color="green" outline size="sm">
        <Icon name="fa6-solid:trash-can" />
      </Button>

      <ButtonTest icon outline color="red" size="sm">

        <Icon name="fa6-solid:trash-can"/>
      </ButtonTest>

      <div>
        <h2 class="mb-2 underline"> Message</h2>
        <Message :timeout="10000" type="success" />
        <Message :timeout="0" type="error" />
      </div>

      <div>
        <h2 class="mb-2 underline">FileUpload</h2>
        <div>
          <FileUpload :maxSize="2" accept="png" @file-uploaded="getUploadedData" />
        </div>

        <div v-if="fileSelected">
          Successfully Selected file: {{ selectedFile }}
        </div>
      </div>

      <div>
        <h2 class="my-2 underline">Tooltip</h2>
        <Tooltip text="I am  button">
          <button> hover over me </button>
        </Tooltip>
      </div>

      <div class="my-2">
        <div class="p-4 max-w-sm rounded border border-gray-200 md:p-6">
          <SkeletonMe class="mb-4 h-48 flex justify-center items-center text-gray-400"> Image </SkeletonMe>
          <SkeletonMe class="h-2.5 w-48 mb-4" />
          <SkeletonMe class="h-2 mb-2.5" />
          <SkeletonMe class="h-2 mb-2.5" />
          <SkeletonMe class="h-2" />
          <div class="flex items-center mt-4 space-x-3">
            <SkeletonMe type="circle" class="w-14 h-14 flex justify-center items-center text-gray-400"> Icon
            </SkeletonMe>
            <div>
              <SkeletonMe class="h-2.5 w-32 mb-2"></SkeletonMe>
              <SkeletonMe class="w-48 h-2" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <h2 class="mb-2 underline">Accordéons</h2>
        <Accordion :accordions="accordions" :activeAccordion="activeAccordion" @changeAccordion="toggleAccordion">
          <template #title="{ accordion }">
            {{ accordion.title }}
          </template>

          <template #content="{ accordion }">
            {{ accordion.content }}
          </template>
        </Accordion>
      </div>

      <div class="w-full">
        <h2 class="mb-2 underline">Toast</h2>
        <Toast />

        <div class="cursor-pointer" @click="successToast">Success Toast</div>
        <div class="cursor-pointer" @click="errorToast">Error Toast</div>
      </div>

      <div>
        <h2 class="mb-2 underline">Loading button</h2>
        <div class="flex">

          <form @submit.prevent="onSubmit">
            <LoadingButton :isLoading="isLoading" class="text-white bg-rose-600 hover:bg-rose-600/80">
              Save changes
            </LoadingButton>
          </form>

        </div>
      </div>

      <div>
        <h2 class="mb-2 underline">Pagination</h2>
        <Pagination :total-pages="11" :total="113" :per-page="10" :current-page="currentPage"
          @pagechanged="onPageChange" />
      </div>

      <div>
        <h2 class="mb-2 underline">Autocomplete</h2>
        <Autocomplete
          :items="['Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
      </div>

      <div>
        <h2 class="ml-6 pt-3 text-lg font-semibold">Colors</h2>
        <div class="flex flex-wrap p-4">
          <ProgressBar v-for="(color, index) in colors" :color="color" :percentage="progressStart + index * 10"
            :key="color" class="mx-2 mb-2" />
        </div>

        <h2 class="ml-6 pt-3 text-lg font-semibold">Sizes</h2>
        <div class="flex flex-wrap p-4">
          <ProgressBar :percentage="20" class="mx-2 mb-2 bg-red-400" />
          <ProgressBar :percentage="40" class="mx-2 mb-2 h-3" />
          <ProgressBar :percentage="60" class="mx-2 mb-2 h-4" />
          <ProgressBar :percentage="80" class="mx-2 mb-2 h-6 bg-green-400" />
        </div>

        <h2 class="ml-6 pt-3 text-lg font-semibold">Content</h2>
        <div class="flex flex-wrap p-4">
          <ProgressBar :percentage="contentProgress" class="mx-2 mb-2 h-5">
            <span class="text-xs text-white w-full flex justify-end bg-green-500 pr-2">{{ contentProgress }}%</span>
          </ProgressBar>
          <div class="ml-2 mt-1 flex">
            <button @click="decreasePercentage"
              class="px-4 border text-xl border-teal-600 border-r-0 text-teal-600 hover:bg-teal-600 hover:text-white rounded-l focus:outline-none focus:shadow-outline">-</button>
            <button @click="increasePercentage"
              class="px-4 border text-xl border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded-r focus:outline-none focus:shadow-outline">+</button>
          </div>
        </div>

        <h2 class="ml-6 pt-3 text-lg font-semibold">Indeterminate</h2>
        <div class="flex flex-wrap p-4">
          <ProgressBar :percentage="contentProgress" class="mx-2 mb-2 bg-red-400" indeterminate></ProgressBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toggleSwitch = ref<boolean>(false)

const toggleButton = () => {
  toggleSwitch.value = !toggleSwitch.value
}

const isLoading = ref(false);

function onSubmit() {
  isLoading.value = true;
  setTimeout(() => isLoading.value = false, 1000);
}

const toasterStore = useToasterStore();

const successToast = () => toasterStore.success({ text: "Article ajouté avec succès", summary: "Success" });

const errorToast = () => toasterStore.error({ text: "Le nom est deja utilisé", summary: "erreur", timeout: 3000 });

const tabs = ref([
  { header: "Header I", slotName: "tab-content-1" },
  { header: "Header II", slotName: "tab-content-2" },
  { header: "Header III", slotName: "tab-content-3" },
  { header: "Header '4'", slotName: "tab-content-4" },
]);

const activeTab = ref(0);

const updateActiveTab = (index: number) => {
  activeTab.value = index;
};

const accordions = ref([
  { title: 'Accordeon 1', content: 'Contenu de l\'accordeon 1' },
  { title: 'Accordeon 2', content: 'Contenu de l\'accordeon 2' },
  { title: 'Accordeon 3', content: 'Contenu de l\'accordeon 3' },
  { title: 'Accordeon 4', content: 'Contenu de l\'accordeon 4' },
]);

const activeAccordion = ref(-1);

const toggleAccordion = (index: number) => {
  if (index === activeAccordion.value) {
    activeAccordion.value = -1;
  } else {
    activeAccordion.value = index;
  }
};

const currentPage = ref<number>(1)

const onPageChange = (page: any) => {
  currentPage.value = page;
}

const selectedFile = ref<object>({})
const fileSelected = ref(false)

const getUploadedData = (file: any) => {
  fileSelected.value = true;
  selectedFile.value = file;
}

const colors = ref([
  "gray",
  "yellow",
  "orange",
  "red",
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "pink"
])
const progressStart = ref(10)
const contentProgress = ref(20)

const increasePercentage = () => {
  if (contentProgress.value <= 80) {
    contentProgress.value += 20;
  }
}

const decreasePercentage = () => {
  if (contentProgress.value >= 20) {
    contentProgress.value -= 20;
  }
}

const form = ref({
  person_id: '',
  role_ids: []
});
</script>