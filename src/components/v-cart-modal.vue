<template>
  <div class="page-overlay cart-modal">
    <div class="modal">
      <h2>Purchase these hymnals?</h2>
      <div class="hymnal-container">
        <hymnal-entry
          v-for="(hymnal, index) in hymnals"
          :title="hymnal.title"
          :description="hymnal.description"
          :image="hymnal.image"
          :key="index"
          :compactView="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HymnalEntry from "./HymnalEntry.vue";
export default Vue.extend({
  components: { HymnalEntry },
  name: "v-cart-modal",
  props: {
    hymnals: Array,
  },
});
</script>

<style lang="scss" scoped>

</style>