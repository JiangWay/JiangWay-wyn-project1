<template>
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

          <v-col cols="12" md="12">
            <v-text-field
              v-model="alias"
              :rules="aliasRules"
              label="Alias"
              :counter="20"
              required
            ></v-text-field>
          </v-col>

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
        <v-btn @click="signup">Signup</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      valid: false,
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
      showPwd: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      pwdRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 20 || 'Password must be less than 20 characters'
      ],
      aliasRules: [
        (v) => !!v || 'Alias is required',
        (v) => v.length <= 20 || 'Alias must be less than 20 characters'
      ]
    }
  },
  methods: {
    signup () {
      console.log('hit sign up?')
      if (this.alias && this.email && this.password) {
        console.log('in')
        this.feedback = null
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        const ref = db.collection('users').doc(this.slug)
        console.log(ref)
        ref.get().then((doc) => {
          console.log(doc)
          if (doc.exists) {
            this.feedback = 'This alias already exists'
          } else {
            // this alias does not yet exists in the db
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((auth) => {
                ref.set({
                  alias: this.alias,
                  user_id: auth.user.uid
                })
              })
              .then(() => {
                this.$router.push({ name: 'Home' })
              })
              .catch((err) => {
                this.feedback = err.message
                console.log(err)
              })
            console.log('create user')
          }
        })
      } else {
        this.feedback = 'Please fill in all fields'
      }
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
