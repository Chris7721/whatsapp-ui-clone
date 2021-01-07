<template>
  <div class="image-modal">
    <div class="image-modal-header">
      <div class="image-modal-header-left">
        <div class="image-modal-header-left-img">
          <img src="/portrait.png" alt="">
        </div>        
        <span>Christopher</span>
      </div>
      <div class="image-modal-header-right">
        <div @click="closeModal" tabindex="0" class="svg">
          <CloseIcon />
        </div>
      </div>
    </div>
    <div class="image-modal-body">
      <div class="image-modal-body-img">
        <img src="/portrait.png" alt="">
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
  methods: {
    closeModal(){
      const profileView = document.querySelector('#profileViewImage').getBoundingClientRect()
      console.log(profileView)
      console.log(screen.height)
      // 
      gsap.timeline()
        .to('.image-modal-body-img', {x: `${profileView.left/2}px`, y: `-${(screen.height/2)-(profileView.top)}px`, marginTop: `150px`, marginRight: '30px', width: '200px', borderRadius: '50%', ease:"power2.inOut", duration: .2})
        .to('.image-modal-body-img img', { borderRadius: '50%', ease:"power2.inOut", duration: .3}, '-=1')
        setTimeout(()=>this.$store.commit("set_modalOpen", false), 260)
      
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

      &-right{
        .svg{
          svg{
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
        width: 100%;
        max-width: 411px;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>