<template>
  <div class="hymnal page-container">
    <div class="title-cart-container">
      <h1>Hymnals</h1>
      <button class="cart-button" @click="changeCartState">
        Cart ({{ computeItemsInCart }})
      </button>
    </div>
    <button v-if="compactView" class="view-button" @click="changeViewStyle">
      Enlarge Hymnal Image
    </button>
    <button v-else class="view-button" @click="changeViewStyle">
      Shrink Hymnal Image
    </button>
    <div class="purchase-container" v-if="cartClicked">
      <h2>Purchase?</h2>
      <div class="buttons-container">
        <button @click="purchase">Yes</button>
        <button @click="unpurchase">No</button>
      </div>
    </div>
    <div class="hymnals">
      <hymnal-entry
        v-for="(hymnal, index) in hymnals"
        v-show="hymnal.selected || !cartClicked"
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
import { HymnalType } from "@/definitions/types";
import { hymnalNames } from "@/definitions/data";
import { unlockSelectedHymnals, lockSelectedHymnals } from "@/lib/functions";
import { auth } from "@/lib/firebase";

export default Vue.extend({
  name: "HymnalListView",
  components: {
    HymnalEntry,
  },
  data() {
    return {
      hymnals: [
        {
          title: hymnalNames[3],
          image: "centennial.png",
          selected: false,
        },
        {
          title: hymnalNames[2],
          image: "osh12.jpg",
          selected: false,
        },
        {
          title: hymnalNames[0],
          image: "soz.jpg",
          selected: false,
        },
        {
          title: hymnalNames[1],
          image: "osh12.jpg",
          selected: false,
        },
        {
          title: hymnalNames[4],
          image: "osh12.jpg",
          selected: false,
        },
        {
          title: hymnalNames[5],
          image: "osh12.jpg",
          selected: false,
        },
      ],
      compactView: true,
      selectedHymnals: [] as HymnalType[],
      cartClicked: false,
    };
  },
  methods: {
    changeViewStyle() {
      this.compactView = !this.compactView;
    },
    onHymnalClicked($event, index) {
      this.hymnals[index].selected = $event;
      this.updateSelectedHymnals();
    },
    changeCartState() {
      this.cartClicked = !this.cartClicked;
    },
    async purchase() {
      if (auth.currentUser) {
        unlockSelectedHymnals(this.selectedHymnals, auth.currentUser);
      } else {
        alert("User not logged in")
      }
    },
    async unpurchase() {
      if (auth.currentUser) {
        lockSelectedHymnals(this.selectedHymnals, auth.currentUser);
      } else {
        alert("User not logged in")
      }
    },
    updateSelectedHymnals() {
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