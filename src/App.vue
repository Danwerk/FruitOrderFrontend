<template>
  <div id="app-container">
    <Header></Header>

    <div class="content-wrapper main-content">
      <main v-if="identityStore.isAdmin === false" role="main" class="content" style="background-color: #17090d;">
        <RouterView />
      </main>
      <main v-if="identityStore.isAdmin === true" role="main" class="container">
        <RouterView />
      </main>
    </div>

    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useIdentityStore } from "./stores/identity";

@Options({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {
  identityStore = useIdentityStore()
}
</script>

<style >
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 40px;
  box-sizing: border-box;
}

.main-content {
  flex-grow: 1;
  padding-bottom: 0px;
  margin: 0 auto;
 
}
</style>




<!-- <template>
  <Header></Header>
  
    
    <main v-if="identityStore.isAdmin === false" role="main" style="background-color: #17090d; font-family: italic; color: rgb(0, 0, 0); height: 100vh; padding-bottom: 10px;" class="content">
      <RouterView />
    </main>
    <main v-if="identityStore.isAdmin === true" role="main" style="color: rgb(0, 0, 0); height: 100vh; padding-bottom: 10px;" class="container">
      <RouterView />
    </main>
 
  <Footer></Footer>
</template> -->


