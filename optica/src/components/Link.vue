<template>
<div class="link-component">
    <a href="#" @click="click">{{ data.shared.label }}</a>
</div>
</template>

<script>
export default {
    name: "Link-vue",
    props: ["data"],
    methods: {
        click(event = new MouseEvent()) {
            event.preventDefault();
            this.data.internalEvent = event;
            console.log(this.data);
            this.$emit("event", this.data);
        },
    },
};
</script>
