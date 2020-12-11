<template>
<div class="add">
    <!-- 新增 記帳資料-->
      <v-card
      class="mx-auto"
      max-width="688"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            新增一筆吧！
          </v-list-item-title>
          <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
      <!-- 輸入列 -->
      <!-- 預設今天日期 （可選擇時間）
      主分類 副分類
      帳務說明
      金額 幣別（預設台幣）  -->

    <v-form>
        <v-container>
            <v-row>
                <v-col
                cols="12"
                sm="12"
                md="12"
                >
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="日期"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="6"
                >
                    <v-select
                    :items="mainCategoryList"
                    label="主分類"
                    ></v-select>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="6"
                >
                    <v-text-field
                        label="副分類"
                    ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="12"
                md="12"
                >
                    <v-text-field
                        label="帳務說明"
                    ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="8"
                md="8"
                >
                    <v-text-field
                        label="金額"
                    ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="4"
                md="4"
                >
                    <v-text-field
                        label="幣別"
                        v-model="currency"
                    ></v-text-field>
                </v-col>

            </v-row>
        </v-container>
     </v-form>

      <v-card-actions class="flex-row-reverse">
        <v-btn
          outlined
          rounded
          text
        >
          取消
        </v-btn>
        <v-btn
          outlined
          rounded
          text
        >
          新增
        </v-btn>
      </v-card-actions>
    </v-card>

        <!-- 新增一筆彈窗 -->
     <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
</div>
</template>
<script>
// @ is an alias to /src
// import firebase from 'firebase'
// import db from '@/firebase/init'

export default {
  name: 'Add',
  components: {

  },
  props: {

  },
  data () {
    return {
      mainCategoryList: [],
      currency: 'TWD',
      date: new Date().toISOString().substr(0, 10),
      menu2: false
    }
  },
  created () {
    this.mainCategoryList = ['食', '住', '收', '樂', '衣', '行', '育']
  },
  computed: {
  },
  methods: {
    // 預設今天日期 （可選擇時間）
    // 主分類 副分類
    // 帳務說明
    // 金額 幣別（預設台幣）
    clickToAdd () {
      // const dataToAdd = {
      // date: data.日期,
      // mainCategory: data.主分類,
      // subCategory: data.子分類,
      // detail: data.帳務說明,
      // currency: data.幣別,
      // cost: data.該幣別金額
      // }
    }
  },
  watch: {}
}
</script>
