<template>
    <div class="app-chat">
    <div class="app-chat-header">
      <div @click="openContact('profile')" class="app-chat-header-person">
        <img src="/portrait.png" alt="">
        <span>Christopher</span>
      </div>

      <div class="app-chat-header-actions">
        <div class="svg" tabindex="0" @click="openContact('search')"><SearchIcon /></div>
        <div class="svg" tabindex="0">
          <div @click="showMenu=true" v-click-outside="hideDropdown">
            <MenuIcon />
          </div>
          
          <transition name="fade">
            <div v-if="showMenu" class="control-options">
                <ul>
                  <li>Contact info</li>
                  <li>Report business</li>
                  <li>Block</li>
                  <li>Select messages</li>
                  <li>Mute notifications</li>
                  <li>Clear messages</li>
                  <li>Delete chat</li>
                </ul>
            </div>
          </transition>
        </div>       
        
      </div>
    </div>

    <div class="app-chat-body">
      <div class="app-chat-body-note">
        <LockIcon />
        <span>
          Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
        </span>
      </div>
    </div>

    <div class="app-chat-footer">
      <div tabindex="0" class="svg"><SmileyIcon /></div>
      <div tabindex="0" class="svg"><Attachment /></div>     
      <input v-model="msgText" type="text" placeholder="Type a message" class="app-input msg">
      
      <div tabindex="0" v-if="msgText.length < 1" class="svg"><MicIcon /></div>
      <div tabindex="0" v-else class="svg"><SendMessage /></div>


      
    </div>


    <div class="app-chat-bg"></div>
  </div>
</template>

<script>
import ImageModal from "~/components/ImageModal";
import ClickOutside from 'vue-click-outside'
import SearchIcon from "~/components/icons/search-icon";
import MenuIcon from "~/components/icons/menu";
import LockIcon from "~/components/icons/lock-icon";
import SmileyIcon from "~/components/icons/smiley-icon";
import Attachment from "~/components/icons/attachment";
import MicIcon from "~/components/icons/mic-icon";
import SendMessage from "~/components/icons/send-message";
export default {
  directives: {
    ClickOutside
  },
  components: {
    SearchIcon,
    MenuIcon,
    LockIcon,
    SmileyIcon,
    Attachment,
    MicIcon,
    SendMessage,
  },
  data(){
    return{
      msgText: '',
      showMenu: false
    }
  },
  methods: {
    openContact(view){
      this.$store.commit("set_contactOpened", {isOpened: true, currentView: view})
    },
    hideDropdown(){
      this.showMenu=false
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-chat{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: $chat-bg;

  &-header{
    @include flex;
    padding: 10px 16px;
    box-sizing: border-box;
    border-left: 1px solid $border-color2;
    position: relative;
    z-index: 33;
    background:$side-header-bg;
    height: 60px;
    &-person{
      cursor: pointer;
      display: flex;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
        object-fit: cover;
      }
      span{
        display: block;
        margin-left: 15px;
      }
    }

    &-actions{
      display: flex;
      align-items: center;
      & > *{
        &:not(:last-child){
            margin-right: 5px;
        }
      }      
    }
  }

  &-body{
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
    z-index: 22;
    padding-right: 9%;
    padding-left: 9%;
    &-note{      
      display: flex;
      align-items: flex-start;
      color: $text-color;
      background-color: $chat-note-bg;
      font-size: 12.5px;
      border-radius: 7.5px;
      margin-top: 20px;
      padding: 10px 12px 10px;
      text-align: center;
      transition: .2s all;
      text-shadow: 0 1px 0 rgba(255, 255, 255, .4);
      box-shadow: 0 1px .5px rgba(0, 0, 0, .13);
      svg{
        fill: $text-secondary;
        flex-shrink: 0;
        display: block;
        margin-right: 5px;
      }
    }
  }

  &-footer{
    box-sizing: border-box;
    position: relative;
    border-left: 1px solid $border-color2;
    width: 100%;
    z-index: 22;
    display: flex;
    align-items: center;
    padding: 7.5px 10px;
    background-color: #f0f0f0;

    input{
      margin: 0 10px;
    }

    .svg{
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;                
      background-color: transparent;
      transition: background-color .3s;
      svg{
        display: block;
        fill: $svg-fill;
      }
      &:focus{
        outline: none;
        background-color: $svg-focus;
      }      
    }

    
    input{
      flex-grow: 1;
    }
  }

  &-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .06;
    z-index: 11;
    background-image: url('/chat-bg.png');
  }
}

</style>