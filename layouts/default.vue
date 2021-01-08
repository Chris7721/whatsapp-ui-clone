<template>
  <div class="container">
    <div class="app-contacts">
      <Contacts />
    </div>
    <div :class="['app-main-content', contactOpen ? 'absolute' : '']">
      <Nuxt />
    </div>
    
      <transition
        v-on:before-leave="beforeLeave"
        >
        <template v-if="contactOpen">
          <div class="app-profile">
            <ContactInfo />
          </div> 
        </template>
        
      </transition>
      <template v-if="modalOpened">
        <ImageModal />
      </template>      
  </div>
</template>

<script>
import ImageModal from "~/components/ImageModal";
import Contacts from "~/components/Contacts";
import ContactInfo from '~/components/ContactInfo'
export default {
  components: {
    Contacts,
    ImageModal
  },
  computed: {
    contactOpen(){
      return this.$store.state.contactOpened
    },
    modalOpened(){
      return this.$store.state.modalOpened
    }
  },
  methods: {
    beforeLeave(el){
        el.classList.add('slideRightClass')
    },
  }
}
</script>

<style scoped lang="scss">
html, body, *{
  font-family: 'Nunito Sans', sans-serif !important;
}
.container{
  width: 100%;
  min-width: 900px;
  display: flex;
  overflow: hidden;
  // background-color: #00f;
  height: 100vh !important;
  // position: relative;

  .app-contacts{
    // background-color: #f00;
    flex-basis: 30%;
    max-width: 30%;
    height: 100%;
    // min-width: 300px;
    @include respond-not-web{
      flex-basis: 43%;
      min-width: 300px;
    }
  }
  

  .app-main-content{
    flex-grow: 1;
    &.absolute{
      @include respond-not-web{
      position: absolute;
      z-index: -33;
    }
    }    
  }

  .app-profile{
    overflow: hidden;
    background-color: $side-header-bg;
    flex-basis: 30%;
    min-width: 300px;
    position: relative;
    transition: all .2s;
    transform-origin: center center;
    transition: all .17s;
    @include respond-not-web{
      flex-grow: 1;
    }
  }
}
</style>
