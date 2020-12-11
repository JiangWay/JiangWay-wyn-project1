<template>
  <div class="home">
    <h2>Home!!</h2>
    <!-- <Navbar/> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>{{s_userInfo}}</div>
    <v-btn @click="$router.push({ name: 'Accounting' })">記帳去</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

// import HelloWorld from '@/components/HelloWorld.vue'
// import Navbar from '@/components/layout/Navbar.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    // HelloWorld
    // Navbar
  },
  data () {
    return {
      test: 'wyn'

    }
  },
  created () {
  },
  computed: {
    ...mapState(['s_userInfo'])
  },
  methods: {},
  watch: {}
}
</script>
