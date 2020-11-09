<template>
<div class="app-options">
    <div class="option-border">
        <div v-if="option" class="arrow-up pointer" @click="optionClick"></div>
        <div v-else class="arrow-down pointer" @click="optionClick"></div>
    </div>

    <div class="customer-options m4" v-if="option">
        <div class="card">
            <div class="fields">
                <label>{{ language.labels["language"] || "" }}</label>
                <component :is="select" :name="select" :data="getLanguageTranslate()" :default="getCurrentLang()" @[select]="change" />
            </div>
            <div class="fields">
                <label>{{ language.labels["clear-data"] || "" }}</label>
                <component :is="button" :data="{
              name: button,
              shared: { label: language.labels['clear-button'] || '' },
            }" @[button]="click" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import LanguageMixin from "../mixins/language";

export default {
    name: "",
    mixins: [LanguageMixin],
    mounted() {
        this.listen();
    },
    data() {
        return {
            select: "select-field",
            button: "button-component",
            option: false,
        };
    },
    methods: {
        async listen() {
            this.$app.on("body-click", () => {
                this.option = false;
            });
        },
        click(event) {
            // console.log(event);
        },
        change(value) {
            let originalLang = this.getOriginalLang(value);

            if (!originalLang) return;
            this.option = false;

            this.newLang = originalLang;
            this.$app.setlanguage(originalLang);
        },
        async optionClick() {
            await this.getLanguages();
            this.option = !this.option;
        },
    },
};
</script>
