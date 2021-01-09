<template>
  <div class="image-modal">
    <div class="image-modal-header">
      <div class="image-modal-header-left">
        <div class="image-modal-header-left-img">
          <img :src="currentContact.image" alt="">
        </div>        
        <span>{{ currentContact.name }}</span>
      </div>
      <div class="image-modal-header-right">
        <div @click="closeModal" tabindex="0" class="svg">
          <CloseIcon />
        </div>
      </div>
    </div>
    <div class="image-modal-body">
      <div class="image-modal-body-img">
        <img :src="currentContact.image" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
import { gsap } from "gsap";
import CloseIcon from "~/components/icons/close-icon";
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside
  },
  components: {
    CloseIcon
  },
  computed: {
    currentContact(){
      return this.$store.state.currentContact
    },
  },
  methods: {
    closeModal(){
      const profileView = document.querySelector('#profileViewImage').getBoundingClientRect()
      gsap.timeline()
        .to('.image-modal-body-img', {x: `${profileView.left/2}px`, y: `-${(screen.height/2)-(profileView.height)}px`, width: '200px', height: '200px', marginTop: `52px`, marginRight: '57px', ease:"power2.inOut", duration: .2})
        .to('.image-modal-body-img img', { borderRadius: '50%', ease:"power2.inOut", duration: .3}, '-=.5')
        .to('.image-modal', { opacity: 0, ease:"power2.inOut", duration: .1})
        setTimeout(()=>this.$store.commit("set_modalOpen", false), 280)
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-modal{
    background-color: $modal-bg;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 777;
    display: flex;
    flex-direction: column;
    &-header{
      margin: 0 18px;
      height: 60px;
      @include flex;
      background-color: #fff;
      &-left{
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 17px;
        color: $text-color;
        &-img{
          width: 40px;
          height: 40px;
          padding: 0 15px 0 13px;
          // box-sizing: border-box;
          img{
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 50%;
          }
        }
      }
    }
    &-body{
      flex-grow: 1;
      height: calc(100vh - 60px);
      // background-color: #0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      &-img{
        // background-color: #00f;
        flex-shrink: 0;
        margin: 0;
        width: 100%;
        max-width: 411px;
        min-width: 200px;
        box-sizing: border-box;
        img{
          display: block;
          margin: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>