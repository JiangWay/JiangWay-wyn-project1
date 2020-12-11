<template>
  <div class="about">
    <h1>This is an Accouinting page</h1>
    <!-- 新增 記帳資料-->
    <Add/>

    <!-- 我是分隔線 -->
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <!-- 顯示該月 -->
     <v-data-table
      :headers="headers"
      :items="filterAccountingList"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>

  </div>
</template>
<script>
// @ is an alias to /src
// import firebase from 'firebase'
import db from '@/firebase/init'
import { mapState, mapMutations } from 'vuex'
import Add from '@/components/accounting/Add.vue'

export default {
  name: 'Accounting',
  components: {
    Add
  },
  data () {
    return {
      headers: [
        {
          text: '日期',
          align: 'start',
          filterable: false,
          value: 'date'
        },
        { text: '主分類', value: 'mainCategory' },
        { text: '子分類', value: 'subCategory' },
        { text: '帳務說明', value: 'detail' },
        { text: '幣別', value: 'currency' },
        { text: '該幣別金額', value: 'cost' }
      ],
      accountingList: [

      ]
    }
  },
  created () {
    if (this.s_accountingList.length > 0) {
      console.log('wyn test aaa')
      this.accountingList = this.s_accountingList
    } else {
      console.log('wyn test bbb')
      this.getData()
    }
    console.log(this.s_accountingList)
    // 印出所有分類
    // 主分類 mainCategory
    // 子分類 subCategory
    const mainCategory = new Set()
    const subCategory = new Set()
    const category = new Set()
    this.s_accountingList.forEach(item => {
      console.log(item)
      category.add(item.mainCategory + '-' + item.subCategory)
      mainCategory.add(item.mainCategory)
      subCategory.add(item.subCategory)
    })
    console.log(mainCategory)
    console.log(subCategory)
    console.log(category)
  },
  computed: {
    ...mapState(['s_accountingList']),
    filterAccountingList () {
      const accountingListToSort = this.accountingList
      return accountingListToSort.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
      })
    }
  },
  methods: {
    ...mapMutations(['m_setAccountingList']),
    getData () {
      db.collection('data').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          // console.log(doc.id)
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
          this.accountingList.push(dataToShow)
        })
      }).catch(error => {
        console.log(error)
        this.m_setAccountingList([])
      })
      this.m_setAccountingList(this.accountingList)
      console.log(this.s_accountingList)
    }
  },
  watch: {}
}
</script>
