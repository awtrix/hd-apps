<template>
  <div v-if="data" class="app">
    <div class="grid grid-cols-6 gap-1">
      <div class="col-span-2">
        <img class="m-10" src="./imgs/Vortex-R.png" />
      </div>
      <div
        class="values text-center text-4xl col-span-4 bg-opacity-50 m-10 rounded-lg bg-gray-600 shadow-2xl overflow-hidden"
      >
        <div class="grid grid-cols-6 gap-1">
          <div class="col-span-3 px-4 text-left">
            <br />
            Total queryies: <br />
            Queries Blocked: <br />
            Percent Blocked: asd <br />
            Domains on Blocklist:
          </div>
          <div class="col-span-3 text-right px-5">
            <br />

            {{ data.dns_queries_all_types }}<br />
            {{ data.ads_blocked_today }}<br />
            {{ data.ads_percentage_today.toFixed(1) }} &#037;<br />
            {{ data.domains_being_blocked }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";

export default createFrontend({
  data() {
    return {
      ip: "192.168.10.67",
      data: undefined,
    };
  },

  mounted() {
    console.log(this.asset("abc.def"));
    this.getData();
    setInterval(() => this.getData(), 6000);
  },

  methods: {
    getData() {
      fetch("http://" + this.ip + "/admin/api.php", {})
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          console.log(data);
          this.blocked = Object.keys(data.ads_blocked_today).length;
          console.log(data.ads_blocked_today);
        });
    },
  },
});
</script>

<style>
.app {
  background: url("./imgs/bg_networking.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  color: rgb(255, 255, 255);
}

img {
  max-width: 80%;
  height: auto;
}

.values {
  height: auto;
}
</style>
