<template>
  <div class="about">
    <h1>This is an Accouinting page</h1>
    <!-- 新增 -->
    <!-- 顯示該月 -->
     <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
// @ is an alias to /src
// import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Accounting',
  components: {

  },
  data () {
    return {
      headers: [
        {
          text: '日期',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        { text: '主分類', value: 'mainCategory' },
        { text: '子分類', value: 'subCategory' },
        { text: '帳務說明', value: 'detail' },
        { text: '幣別', value: 'currency' },
        { text: '該幣別金額', value: 'cost' }
      ],
      desserts: [

      ]
    }
  },
  created () {
    this.getData()
  },
  computed: {},
  methods: {
    getData () {
      db.collection('data').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data()
          // 日期
          // 主分類 mainCategory
          // 子分類 subCategory
          // 帳務說明
          // 幣別
          // 該幣別金額

          const dataToShow = {
            date: data.日期,
            mainCategory: data.主分類,
            subCategory: data.子分類,
            detail: data.帳務說明,
            currency: data.幣別,
            cost: data.該幣別金額
          }
          this.desserts.push(dataToShow)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {}
}
</script>
