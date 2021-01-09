<template>
<div class="serachview">
  <CustomInput refName="searchInput" :isFocused="focused" placeholderText="Search..." />

  <div class="serachview__result">
    <span>Search for messages with {{ currentContact.name }}.</span>
  </div>
</div>
  
</template>

<script>
import CustomInput from "~/components/CustomInput";
export default {
  components: {
    CustomInput
  },
  computed: {
    currentContact(){
      return this.$store.state.currentContact
    }
  },
  data(){
    return{
      focused: true
    }
  }
}
</script>

<style lang="scss" scoped>
.serachview{
  height: 100%;
  display: flex;
  // border-left: 1px solid $border-color2;
  flex-direction: column;
  &__result{
    flex-grow: 1;
    background-color: #fff;
    span{
      display: block;
      padding: 72px 50px;
      text-align: center;
      font-size: 1rem;
      color: $text-secondary;
    }
  }
}
</style>