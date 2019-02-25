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

    <h2>{{ city }}の天気</h2>
    <div>
      <p>{{ city }}</p>
      <p>{{ temp }}</p>
      <p>{{ condition.main }}</p>
      <p>{{ condition.description }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "Weather",
  data() {
    return {
      msg: "Weather",
      city: null,
      temp: null,
      condition: {
        description: null,
        main: null
      }
    };
  },
  // methods: {},
  mounted() {
    this.$axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Nagoya,jp&units=metric&appid=<API KEY>"
      )
      .then(response => {
        (this.city = response.data.name),
          (this.temp = response.data.main.temp),
          (this.condition = response.data.weather[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  filters: {
    roundUp(value) {
      return Math.ceil(value);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
