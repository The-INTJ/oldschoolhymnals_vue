<template>
  <div :class="selectedColor + ' hymnal-container'">
    <div class="image-container">
      <img :src="require('@/assets/' + image + '')" :alt="altText" />
    </div>
    <div class="description">
      <h4>
        <b>{{ title }}</b>
      </h4>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HymnalEntry",
  props: {
    title: String,
    description: String,
    image: {
      type: String,
      default: "",
    },
    altText: String,
    selected: Boolean
  },
  computed: {
    selectedColor() {
        return this.selected ? "selected" : "unselected";
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/styles/components/HymnalEntry.scss";
</style>