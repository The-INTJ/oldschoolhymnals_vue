<template>
  <div class="hymnal-page-container">
    <h1>Hymnals</h1>
    <div class="hymnals">
      <hymnal-entry
        v-for="(hymnal, index) in hymnals"
        :title="hymnal.title"
        :description="hymnal.description"
        :image="hymnal.image"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HymnalEntry from "@/components/HymnalEntry.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "HymnalListView",
  components: {
    HymnalEntry,
  },
  data() {
    return {
      hymnals: [
        {
          title: "The Centennial",
          description: "The old and new in a confounding order",
          image: "centennial.png",
        },
        {
          title: "Old School Hymnal (12th Edition)",
          description: "The old and the gold",
          image: "osh12.jpg",
        },
        {
          title: "Songs of Zion",
          description: "With songs ever the bravest leaders shake to lead",
          image: "soz.jpg",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>

.hymnals {
    display: flex;
    flex-direction: row;
}
</style>