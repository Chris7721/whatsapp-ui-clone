<template>
    <div class="app-chat">
    <div class="app-chat-header">
      <div @click="openContact('profile')" class="app-chat-header-person">
        <div class="app-chat-header-person-img">
          <LazyImage :imageUrl="currentContact.image" :imageAlt="currentContact.name" class="br-50" />
        </div>
        <!-- <img :src="currentContact.image" :alt="currentContact.name"> -->
        <!--  -->
        <span>{{ currentContact.name }}</span>
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
                  <li @click="openContact('profile')">Contact info</li>
                  <li>Report business</li>
                  <li>Block</li>
                  <li>Select messages</li>
                  <li>Mute notifications</li>
                  <li @click="deleteChat">Clear messages</li>
                  <li @click="deleteChat">Delete chat</li>
                </ul>
            </div>
          </transition>
        </div>       
        
      </div>
    </div>
    <vue-scroll :ops="scroller" ref="scroller">
      <div class="app-chat-body" id="chatBody">
        <div class="app-chat-body-note">
          <LockIcon />
          <span>
            Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
          </span>
        </div>

        <div class="app-chat-body-day">
          <div class="day">
            <span>Today</span>
          </div>
        </div>
        

        <template v-if="currentMessages.messages.length > 0">
          <template v-for="(message, i) in currentMessages.messages">
            <ChatMessage :key="i" :index="i" :message="message"/>
          </template>
        </template>     
        
      </div>
    </vue-scroll>
    

    <div class="app-chat-footer">
      <div tabindex="0" class="svg"><SmileyIcon /></div>
      <div tabindex="0" class="svg"><Attachment /></div>     
      <input ref="chatInput" @keydown.enter="sendMessage" v-model="msgText" type="text" placeholder="Type a message" class="app-input msg">    
      <div tabindex="0" v-if="!validText" class="svg"><MicIcon /></div>
      <div @click="sendMessage" tabindex="0" v-else class="svg"><SendMessage /></div>      
    </div>


    <div class="app-chat-bg"></div>
  </div>
</template>

<script>
import ImageModal from "~/components/ImageModal";
import ChatMessage from "~/components/ChatMessage";
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
    ChatMessage
  },
  data(){
    return{
      msgText: '',
      showMenu: false,
      validText: false,
      scroller: this.$store.state.scroller
    }
  },
  computed: {
    currentContact(){
      return this.$store.state.currentContact
    },
    messages(){
      return this.$store.state.messages
    },
    currentMessages(){
      return this.$store.getters.currentMessages
    }
  },
  mounted(){
    this.$refs['chatInput'].focus()
  },
  methods: {
    openContact(view){
      this.$store.commit("set_contactOpened", {isOpened: true, currentView: view})
    },
    hideDropdown(){
      this.showMenu=false
    },
    async sendMessage(){
      if(this.msgText.length > 0) {
        this.$store.commit('sendMessage', {_id: this.currentMessages._id, text: this.msgText, timeStamp: Date.now(), sender: this.$store.state.authUser._id})
        this.msgText=""
        this.scrollToEnd()
        this.$store.commit('set_typingStatus', {_id: this.currentContact._id, status: true})
        await this.fakeAsync()
        this.$store.commit('set_typingStatus', {_id: this.currentContact._id, status: false})
        this.$store.commit('sendMessage', {_id: this.currentMessages._id, timeStamp: Date.now(), sender: this.currentContact._id})   
        this.scrollToEnd()

      }
    },
    deleteChat(){
      this.$store.commit('deleteChat', this.currentContact._id)
    }
  },
  watch: {
    msgText: function(newVal){
      newVal.trim().length > 0 ? this.validText = true : this.validText = false
    },
    currentMessages: function(){
      this.$refs['chatInput'].focus()
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
      &-img{
        width: 40px;
        height: 40px;
        border-radius: 500rem; 
        overflow: hidden;
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
    padding-bottom: 15px;
    &::-webkit-scrollbar {
      display: none;
    }

    &-day{
      width: 100%;
      // background-color: #0f0;
      margin: 12px 0;

      .day{
        width: fit-content;
        padding: 9px 12px 8px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .4);
        background-color: $day-bg;
        border-radius: 7.5px;
        box-shadow: 0 1px .5px rgba(0, 0, 0,.13);
        text-transform: uppercase;
        color: #303030;
        font-size: 12.5px;
        display: block;
        margin: 0 auto;;
      }
    }
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