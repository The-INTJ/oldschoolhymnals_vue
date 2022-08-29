<template>
  <div class="hymnal page-container">
    <div class="title-cart-container">
    <h1>Hymnals</h1>
    <button class="cart-button">Cart ({{computeItemsInCart}})</button>
    </div>
    <button v-if="compactView" class="view-button" @click="changeViewStyle">Enlarge Hymnal Image</button>
    <button v-else class="view-button" @click="changeViewStyle">Shrink Hymnal Image</button>
    <div class="hymnals">
      <hymnal-entry
        v-for="(hymnal, index) in hymnals"
        :title="hymnal.title"
        :description="hymnal.description"
        :image="hymnal.image"
        :key="index"
        :compactView="compactView"
        @onHymnalClicked="onHymnalClicked($event, index)"
        tabindex="0"
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
          selected: false
        },
        {
          title: "Old School Hymnal (12th Edition)",
          description: "The old and the gold",
          image: "osh12.jpg",
          selected: false
        },
        {
          title: "Songs of Zion",
          description: "With songs ever the bravest leaders shake to lead",
          image: "soz.jpg",
          selected: false
        },
      ],
      compactView: true 
    };
  },
  methods: {
    changeViewStyle() {
      console.log(this.compactView)
      this.compactView = !(this.compactView);
    },
    onHymnalClicked($event, index) {
      this.hymnals[index].selected = $event;
    }
  },
  computed: {
    computeItemsInCart() {
      let currentItems = 0;
      this.hymnals.forEach(hymnal => {
        if(hymnal.selected) {
          currentItems = currentItems + 1;
        }
      })
      return currentItems;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/views/HymnalListView.scss";
</style>