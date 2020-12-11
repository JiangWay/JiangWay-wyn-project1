<template>
  <div id="navbar">
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Titlexxxxxx</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <v-btn icon @click="goTo('Login')" v-if="user === null">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn icon @click="logout" v-else>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 側邊欄 -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-system-bar></v-system-bar>
      <v-list>
        <!-- 頭像 -->
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item> -->

        <!-- 帳號資訊 -->
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> {{userAlias}} </v-list-item-title>
            <v-list-item-subtitle>{{userEmail}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <!-- 我是分隔線 -->
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="selectedItem"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, i) in items" :key="i" @click="goTo(item.routerName)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import db from '@/firebase/init'
import firebase from 'firebase'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      user: null,
      drawer: false,
      sideBarList: [
        {
          name: 'Home',
          routerName: 'Home'
        },
        {
          name: '關於',
          routerName: 'About'
        },
        {
          name: '記帳',
          routerName: 'Accounting'
        }
      ],
      selectedItem: 0,
      items: [
        { text: 'Home', icon: 'mdi-folder', routerName: 'Home' },
        { text: 'About', icon: 'mdi-account-multiple', routerName: 'About' },
        { text: 'Accounting', icon: 'mdi-star', routerName: 'Accounting' }
        // { text: 'Recent', icon: 'mdi-history' },
        // { text: 'Offline', icon: 'mdi-check-circle' },
        // { text: 'Uploads', icon: 'mdi-upload' },
        // { text: 'Backups', icon: 'mdi-cloud-upload' }
      ]
    }
  },
  created () {
    // console.log(this.s_userInfo)
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.user = user
        // db.collection('users').where('user_id', '==', user.uid).get()
        //   .then(user => {
        //     this.m_serUserInfo({
        //       alias: user.alias,
        //       email: this.email
        //     })
        //   })
      } else {
        this.user = null
      }
    })
    console.log(this.user)
  },
  computed: {
    ...mapState(['s_userInfo']),
    userAlias () {
      console.log(this.s_userInfo)
      if (this.s_userInfo && this.s_userInfo.alias) {
        return this.s_userInfo.alias
      } else {
        return ''
      }
    },
    userEmail () {
      console.log(this.s_userInfo)
      if (this.s_userInfo && this.s_userInfo.email) {
        return this.s_userInfo.email
      } else {
        return ''
      }
    }

  },
  methods: {
    ...mapMutations(['m_setUserInfo']),
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.m_setUserInfo({})
          console.log(this.$route.name)
          if (this.$route.name !== 'Home') {
            console.log('loguot and go to home')
            this.$router.push({ name: 'Home' })
          }
        })
    },
    goTo (routerName) {
      this.$router.push({ name: routerName })
    }
  },
  watch: {

  }
}
</script>

<style>

</style>
