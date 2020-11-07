<template>
<div class="button-component">
    <button class="button-field" @click="click">{{ data.shared.label }}</button>
</div>
</template>

<script>
export default {
    name: "Button-vue",
    props: ["data"],
    methods: {
        click(event) {
            this.data.internalEvent = event;
            this.$emit("event", this.data);
        },
    },
};
</script>
