<template>
  <div class="hymnal page-container">
    <div class="title-cart-container">
      <h1>Hymnals</h1>
      <button class="cart-button" @click="openConfirmModal">
        Cart ({{ computeItemsInCart }})
      </button>
    </div>
    <button v-if="compactView" class="view-button" @click="changeViewStyle">
      Enlarge Hymnal Image
    </button>
    <button v-else class="view-button" @click="changeViewStyle">
      Shrink Hymnal Image
    </button>
    <div class="hymnals">
      <hymnal-entry
        v-for="(hymnal, index) in hymnals"
        :title="hymnal.title"
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
import {HymnalType} from "@/definitions/types";

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
          image: "centennial.png",
          selected: false,
        },
        {
          title: "Old School Hymnal (12th Edition)",
          image: "osh12.jpg",
          selected: false,
        },
        {
          title: "Songs of Zion",
          image: "soz.jpg",
          selected: false,
        },
      ],
      compactView: true,
      selectedHymnals: null,
      modalOpen: false,
    };
  },
  methods: {
    changeViewStyle() {
      this.compactView = !this.compactView;
    },
    onHymnalClicked($event, index) {
      this.hymnals[index].selected = $event;
    },
    openConfirmModal() {
      let selectedHymnals: HymnalType[] = [];
      this.hymnals.forEach((hymnal) => {
        if (hymnal.selected) {
          selectedHymnals.push(hymnal);
        }
      });
      this.selectedHymnals = selectedHymnals;
    },
  },
  computed: {
    computeItemsInCart() {
      let currentItems = 0;
      this.hymnals.forEach((hymnal) => {
        if (hymnal.selected) {
          currentItems = currentItems + 1;
        }
      });
      return currentItems;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/views/HymnalListView.scss";
</style>