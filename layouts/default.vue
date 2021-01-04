<template>
  <div class="container">
    <div class="app-contacts">
      <Contacts />
    </div>
    <Nuxt />
  </div>
</template>

<script>
import Contacts from "~/components/Contacts";
export default {
  components: {
    Contacts
  }
}
</script>

<style scoped lang="scss">
html, body{
  font-family: 'Nunito Sans', sans-serif !important;
}
.container{
  width: 100%;
  min-width: 900px;
  display: flex;
  // background-color: #00f;
  height: 100vh;

  .app-contacts{
    // background-color: #f00;
    font-family: 'Nunito Sans', sans-serif;
    flex-basis: 43%;
    height: 100%;
    min-width: 380px;
  }
}
</style>
