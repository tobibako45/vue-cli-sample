<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">about</router-link>
      </li>
      <li>
        <router-link to="/help">help</router-link>
      </li>
      <li>
        <router-link to="/weather">weather</router-link>
      </li>
      <li>
        <router-link to="/qiita">Qiita Serach</router-link>
      </li>
    </ul>
    <div>
      <p>
        検索キーワード：
        <input type="text" v-model="keyword">
      </p>
      <p v-cloak>{{ message }}</p>
      <ul class="qiita-list">
        <li v-for="item in items" v-cloak :key="item">
          <a v-bind:href="item.url" target="_blank">{{ item.title }}</a>
          いいね数: {{ item.likes_count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Qiita Serach",
      items: null,
      keyword: "",
      message: ""
    };
  },
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      // lodash.debounceを利用してAPI呼び出しの負荷軽減
      this.message = "入力が終わるのを待ってます･･･";
      this.debouncedGetAnswer();
    }
  },
  created: function() {
    // lodash.debounce によって、1秒間操作が無くなった時点でAPI呼び出し実施
    // キー入力の度にAPIを呼び出すような負荷をかけないため
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000);
  },
  methods: {
    getAnswer: function() {
      // キーワードが空の場合はメッセージと検索結果を空にして処理終了
      if (this.keyword === "") {
        this.items = null;
        this.message = "";
        return;
      }

      this.message = "loading...";
      // var vm = this;
      var params = { page: 1, per_page: 20, query: this.keyword };
      this.$axios
        .get("https://qiita.com/api/v2/items", { params })
        .then(
          function(response) {
            console.log(response);
            this.items = response.data;
          }.bind(this)
        )
        .catch(
          function(error) {
            this.message = "Error!" + error;
          }.bind(this)
        )
        .finally(
          function() {
            this.message = "";
          }.bind(this)
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] {
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.qiita-list li {
  display: block;
  margin-bottom: 20px;
}
</style>
