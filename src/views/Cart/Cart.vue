<template>
  <div class="container">
    <v-card
      class="mx-auto"
      tile>
      <v-card-title>Cart</v-card-title>
      <v-data-table
        :headers="headers"
        :items="cart"
        hide-default-footer>
        <template #[`item.remove`]="{ item }">
          <v-btn
            color="error"
            icon
            @click="removeFromCart(item.id)">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </template>
        <template #[`item.amount`]="{ item }">
          <v-text-field
            v-model.number="item.amount"
            type="number"
            outlined
            dense
            hide-details
            @change="updateCart(item.id)" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cart: [],
        headers: [
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'remove'
          },
          {
            text: 'Title',
            align: 'start',
            sortable: false,
            value: 'title'
          },
          {
            text: 'Description',
            value: 'description',
            sortable: false
          },
          {
            text: 'Status',
            value: 'published',
            sortable: false
          },
          {
            text: 'Amount',
            value: 'amount',
            align: 'center',
            width: '250px',
            sortable: false
          }
        ]
      }
    },
    mounted () {
      if (localStorage.getItem('cart')) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    },
    methods: {
      updateCart (itemId) {
        const item = this.cart.find((item) => item.id === itemId)

        if (item.amount <= 0) {
          return this.removeFromCart(itemId)
        }

        const cartItems = JSON.parse(localStorage.getItem('cart'))
        const itemInCart = cartItems.findIndex((cartItem) => cartItem.id === item.id)

        cartItems[itemInCart].amount = item.amount
        
        localStorage.setItem('cart', JSON.stringify(cartItems))
        this.cart = JSON.parse(localStorage.getItem('cart'))
      },
      removeFromCart (itemId) {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        const itemIndex = cartItems.findIndex((item) => item.id === itemId)

        cartItems.splice(itemIndex, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    }
  }
</script>

<style scoped>

</style>