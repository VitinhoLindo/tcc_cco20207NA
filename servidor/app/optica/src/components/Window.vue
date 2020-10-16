<template>
  <div class="window-app" :id="app._id" draggable="true" @click="click" @dragend="dragend">
    <div class="window">
      <div class="img flex-center"><img :src="app.src" :alt="app.content"></div>
      <div class="label"><label>{{ app.appName }}</label></div>
      <div class="options flex-right">
        <img :src="$app.iconsBase64.minimize.src" :alt="$app.iconsBase64.minimize.alt">
        <img :src="$app.iconsBase64.maximize.src" :alt="$app.iconsBase64.maximize.alt">
        <img :src="$app.iconsBase64.close.src"    :alt="$app.iconsBase64.close.alt"   >
      </div>
    </div>
    
    <div class="content">
      <component 
        :is="'form-app'"
        :name="app.name"
      />
    </div> 
  </div>
</template>

<script>
export default {
  name: 'window',
  props: ['app'],
  methods: {
    dragend: function(event) {
      console.log(event);
    },
    click: function(event) {

    }
  }
}
</script>