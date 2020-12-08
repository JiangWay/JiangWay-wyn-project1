<template>
  <!-- <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
    <div @click="$router.push({ name: 'Signup' })">還沒有帳號？</div>
  </div> -->
  <div class="signup container">
    <!-- <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form> -->
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="12" md="12">
            <v-text-field
              v-model="alias"
              :rules="aliasRules"
              label="Alias"
              :counter="20"
              required
            ></v-text-field>
          </v-col> -->

          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :rules="pwdRules"
              :counter="20"
              label="Password"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              @click:append="showPwd = !showPwd"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <v-btn @click="login">Login</v-btn>
      </div>
    </v-form>
  </div>

</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null,
      showPwd: false,
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      pwdRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 20 || 'Password must be less than 20 characters'
      ]
    }
  },
  computed: {
    // ...mapState('s_userInfo')
  },
  methods: {
    ...mapMutations('m_setUserInfo'),
    login () {
      const self = this
      if (this.email && this.password) {
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(auth => {
            console.log(auth)
            db.collection('users').where('user_id', '==', auth.user.uid).get()
              .then(user => {
                self.m_setUserInfo({
                  alias: user.alias,
                  email: this.email
                })
              })
            this.$router.push({ name: 'Home' })
          }).catch(err => {
            this.feedback = err.message
            console.log(err)
          })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style>
.login{
  max-width: 400px;
  margin-top: 60px;
}
.login h2{
  font-size: 2.4em;
}
.login .field{
  margin-bottom: 16px;
}
</style>
