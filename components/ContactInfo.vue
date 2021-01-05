<template>
  <div class="contact-info">
    <div class="contact-info__header">
      <div class="contact-info__header-action">
        <div @click="closeContactInfo()" class="svg">
          <CancelIcon />
        </div>
        <span>Contact Info</span>
      </div>
    </div>
    <template v-if="currentView === 'profile'">
      <ContactProfile />
    </template>
    <template v-else>
      <SearchView />
    </template>
      
  </div>
</template>

<script>
import { gsap } from "gsap";
import ContactProfile from "~/components/ContactProfile";
import SearchView from "~/components/SearchView";
import CancelIcon from "~/components/icons/close-icon";
import ForwardIcon from "~/components/icons/forward-icon";
  export default {
    components: {
      CancelIcon,
      ForwardIcon,
    },
    computed: {
      currentView(){
        return this.$store.state.currentView
      }
    },
    methods: {
      closeContactInfo(){
        this.$store.commit("set_contactOpened", false)
      }
    },
    mounted(){
      gsap.timeline({})
      .from('.contact-info', {x: '100%', opacity: 0, ease:"power2.inOut", duration: .3})
    }
  }
</script>

<style lang="scss" scoped>
  .contact-info{
    // position: absolute;
    // top: 0;
    // right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // background-color: #00f;

    &__header{
      background: $side-header-bg;
      border-left: 1px solid $border-color2;
      height: 60px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-right: 20px;
      padding-left: 25px;
      position: relative;
      z-index: 22;
      &-action{
        display: flex;
        align-items: center;
        .svg{
          width: 54px;
          svg{
            cursor: pointer;
            width: 24px;
            height: 24px;
            fill: $svg-fill;
          }
        }

        span{
          font-size: 1rem;
        }
        
      }
    }
  }
</style>