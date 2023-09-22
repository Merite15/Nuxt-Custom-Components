<template>
    <component
        class="btn font-medium  cursor-pointer border focus:outline-none transition duration-150 ease-in-out leading-tight disabled:bg-gray-400 disabled:hover:bg-gray-700 disabled:cursor-default"
        :is="buttonType" :href="href" :type="type" :class="btnClasses">

        <span v-if="!loading">
            <slot />
        </span>

        <span v-else class="flex items-center gap-x-3">
            <Icon name="svg-spinners:180-ring" size="20"/>
            <!-- <span>Chargement</span> -->
        </span>
    </component>
</template>

<script setup lang="ts">
interface buttonAttributes {
    href?: string,
    type?: 'submit' | 'button' | 'reset',
    id?: string,
    name?: string,
    color: string,
    size?: string,
    outline?: boolean,
    icon?: boolean,
    round?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full',
    isUppercase?: boolean,
    textSize?: 'xs' | 'sm' | 'md' | 'base' | 'lg',
    loading?: boolean
}

const props = withDefaults(defineProps<buttonAttributes>(), ({
    color: "teal",
    size: "md",
    type: "button",
    isUppercase: true,
    textSize: 'xs',
    loading: false,
    round: 'sm'
}))

function isValidHexColor(hexColor: string) {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    return hexRegex.test(hexColor);
}

const colorClasses = computed(() => {
    const color = props.color;

    let baseClasses = ''

    let outlineClasses = ''

    if (isValidHexColor(color)) {
        baseClasses = `bg-[${color}] text-white hover:bg-[${color}]/60 hover:text-white`;

        outlineClasses = `border-[${color}] bg-white text-[${color}] hover:bg-[${color}] hover:border-[${color}] hover:text-white`;

        console.log(outlineClasses);
        
    } else {
        baseClasses = `bg-${color}-600 text-${color}-100 text-white border-${color}-600 hover:bg-${color}-700 hover:border-${color}-700 hover:text-white`;

        outlineClasses = `border-${color}-600 bg-white text-${color}-600 hover:bg-${color}-600 hover:border-${color}-600 hover:text-white`;
    }

    return props.outline ? outlineClasses : baseClasses;
});

const sizeClasses = computed(() => {
    const isIcon = props.icon;
    const sizeMappings = {
        sm: `h-9 text-sm ${isIcon ? "px-3 " : "px-4"}`,
        md: `h-10 ${isIcon ? "px-3.5" : "px-6"}`,
        lg: `text-lg  h-11 ${isIcon ? "px-3" : "px-12"}`,
    };

    return sizeMappings[props.size as keyof typeof sizeMappings] || sizeMappings.md;
});

const btnClasses = computed(() => {
    const borderRadiusClasses = props.round ? `rounded-${props.round}` : "rounded-sm";

    const textClasses = props.isUppercase ? `uppercase` : ""

    const size = `text-${props.textSize}`

    return `${colorClasses.value} ${sizeClasses.value} ${borderRadiusClasses} ${textClasses} ${size}`;
});

const buttonType = computed(() => {
    return props.href ? "a" : "button";
});
</script>