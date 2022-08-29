<template>
  <div :class="compactViewClass + ' ' + selectedColorClass + ' hymnal-container'" @click="changeSelected">
    <div class="image-container">
      <img :src="require('@/assets/' + image + '')" :alt="altText" />
    </div>
    <div class="description">
      <h4>
        <b>{{ title }}</b>
      </h4>
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
    bookInCart: Boolean,
    compactView: Boolean
  },
  data() {
    return {
      selected: false
    };
  },
  computed: {
    selectedColorClass() {
      return this.selected | this.bookInCart ? "selected" : "unselected";
    },
    compactViewClass() {
      return this.compactView ? "compact" : "";
    }
  },
  methods: {
    changeSelected() {
      this.selected = !this.selected;
      this.$emit('onHymnalClicked', this.selected);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/styles/components/HymnalEntry.scss";
</style>