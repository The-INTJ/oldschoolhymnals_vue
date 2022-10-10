<template>
  <div class="hymnal page-container">
    <div class="title-cart-container">
      <h1>Hymnals</h1>
      <button class="cart-button" @click="changeCartState">
        Cart ({{ computeItemsInCart.length }})
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
      <div id="paypal-button" ref="paypal"></div>
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

<script defer lang="ts">
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
  updated: function() { 
    if(this.$refs.paypal){
      const script = document.createElement("script");
      script.src =
      "https://www.paypal.com/sdk/js?client-id=AfusiI9TfzpfdP1-XN2YP119dZGyO-kQu4IdiZ6HsTp9o4bzPSnM0wKwbVE9_bHz8fSSB7-Sp8JSsXs_";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script); 
    }
  },
  methods: {
    setLoaded: function() {
      let cartDescription = "";
      const cartLength: number = this.computeItemsInCart.length;
      // optimized to reduce number of property lookups
      // TODO: calculate price of cart and pass to amount object
      for(let i = 0; i < cartLength; i++){
        if(i === cartLength-1) cartDescription = cartDescription + this.computeItemsInCart[i];
        else cartDescription = cartDescription = cartDescription + `, ${this.computeItemsInCart[i]}`;
      }
      window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: cartDescription,
                  amount: {
                    currency_code: "USD",
                    value: "10"
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions, resp) => {
            // https://developer.paypal.com/docs/api/orders/v2/
            const order = await actions.order.capture();
            window.location.href = "./paymentstatus/" + "success";
            // Change DB entry for hymnals in cart to owned or equivalent
          },
          onError: err => {
            console.log(err);
            window.location.href = "./paymentstatus/" + "failure";
          }
        })
        .render(this.$refs.paypal);
    },

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
        alert("User not logged in");
      }
    },
    async unpurchase() {
      if (auth.currentUser) {
        lockSelectedHymnals(this.selectedHymnals, auth.currentUser);
      } else {
        alert("User not logged in");
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
      let currentItems = this.hymnals.filter((hymnal) => {
        if (hymnal.selected) {
          console.log(hymnal)
          return hymnal;
        } 
      });
      console.log(currentItems)
      return currentItems;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/views/HymnalListView.scss";
</style>
