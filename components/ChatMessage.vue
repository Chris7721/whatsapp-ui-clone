<template>
  <div :class="['msg-box', lastMessage.sender === authUser._id || lastMessage.sender === currentContact._id  ? 'mt' : '', ]">
    <div :class="['msg-box-main', isAuthUser ? 'msg-box-main-right' : 'msg-box-main-left']">      
      <div :class="['flag', isAuthUser ? 'flag-right' : 'flag-left']">
        <template v-if="isAuthUser">
          <FlagRight />
        </template>
        <template v-else>
          <FlagLeft />
        </template>        
      </div>
      <div class="msg-box-cont">

        <span>
          {{ message.text }}
        </span>
        <div class="msg-box-timestamp">
          <span>{{ timeStamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FlagLeft from "~/components/icons/flag-left";
import FlagRight from "~/components/icons/flag-right";
export default {
  props: {
    message: {
        type: String,
        default() {
            return ''
        }
    },
    index: {
        type: Number,
        default() {
            return 0
        }
    },
  },
  components: {
    FlagLeft
  },
  computed: {
    currentContact(){
      return this.$store.state.currentContact
    },
    currentMessages(){
      return this.$store.getters.currentMessages
    },
    lastMessage(){
      return this.$store.getters.lastMessage(this.currentContact._id)
    },
    authUser(){
      return this.$store.state.authUser
    },
    isAuthUser(){
      return this.message.sender === this.$store.state.authUser._id
    },
    timeStamp(){      
      return `${this.addZero(dayjs(this.message.timeStamp).hour())}:${this.addZero(dayjs(this.message.timeStamp).minute())}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .msg-box{
    width: 100%;
    margin-top: 2px;  
    &.mt{
      margin-top: 12px;
    }
    &.mb{
      margin-bottom: 12px;
    }
    &-main{
      position: relative;
      width: fit-content;
      max-width: 75%;
      border-radius: 7.5px;      
      padding: 7px 7px 5px 9px;
      box-sizing: border-box;
      box-shadow: 0 1px .5px rgba(0, 0, 0, .13);

      &-left{
        border-top-left-radius: 0;
        margin-right: auto;
        background-color: #fff;
          .flag-left{
            svg{
              fill: #fff;
            }
          }
      }
      &-right{
        border-top-right-radius: 0;
        margin-left: auto;
        background-color: $msg-sender-bg;
          .flag-right{
            svg{
              fill: $msg-sender-bg;
            }
          }
      }

      & .flag{
        position: absolute;
        top: 0;        
        z-index: 100;
        display: block;
        width: 8px;
        height: 13px;
        svg{
          display: block;
        }
        &-left{
          left: -8px;
        }
        &-right{
          right: -8px;
        }
      }
    }

    &-cont{
      font-size: 14px;
      min-width: 170px;
    }

    &-timestamp{
      width: fit-content;
      font-size: 11px;
      margin-left: auto;
    }
  }
</style>