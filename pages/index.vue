<template>
  <section v-if="!selectedContact" class="main-content">       
    <div class="main-content__init">
      <div class="main-content__init-box">
        <div class="init-img">
          <LazyImage imageUrl="/init.jpg" imageAlt="Whatsapp" type="file"/>
        </div>
        
        <div class="main-content__init-bottom">
          <h3>Keep your phone connected</h3>
          <span class="show">
            WhatsApp connects to your phone to sync messages. 
            To reduce data usage, connect your phone to Wi-Fi.
          </span>

          <span class="info">
            <Computer />&nbsp;WhatsApp is available for Windows. <span class="link">&nbsp; Get it here.</span>
          </span>
        </div>
      </div>      
    </div>
  </section>
  <ChatView v-else />
</template>

<script>
import { gsap } from "gsap";
import Computer from "~/components/icons/computer.vue";
import ChatView from "~/components/ChatView.vue";
export default {
  components: {
    ChatView
  },
  computed: {
    selectedContact(){
      return this.$store.state.currentContact
    }
  },
  mounted(){
    gsap.timeline({delay: .65})
    .from('.main-content__init-bottom', { opacity: 0, y: 15,  ease:"linear", duration: .1 })
    .from('.init-img', { scale: .5, opacity: 0, ease:"linear", transformOrigin: '40% top', duration: .13 , }, "-=.4")
  },
  
}
</script>

<style lang="scss">


.main-content{
  flex-grow: 1;
  height: 100%;
  background-color: #0f0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden !important;
  &__init{
    width: 100%;
    height: 100%;
    @include flex;
    justify-content: center;
    background-color: $main-bg;
    position: relative;

    &::after{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0;
      content: "";
      border-top: 6px solid $main-border;
    }

    &-box{
      width: 80%;
      max-width: 460px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .init-img{
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: #dfe5e7;
      }
    }

    &-bottom{
      & > *{
        font-family: 'Nunito Sans', sans-serif;
        display: block;
        text-align: center;
      }

      h3{
        margin-top: 28px;
        font-weight: 200;
        font-size: 2rem;
        color: #525252;
      }
      span{
        font-size: 14px;
        margin-top: 18px;
        color: $text-secondary;
      }
      .show{
        line-height: 20px;
        margin-top: 24px;
        margin-bottom: 34px;
      }
      .info{
        font-size: 14px;
        border-top: 1px solid $border-color2;
        padding-top: 34px;
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .link{
          cursor: pointer;
          margin-top: 0;
          display: block;
          color: $link-color;
          font-weight: 500;
        }
      }
    }
    
  }
}
</style>
