<template>
  <div class="contact-info__body">

    <div class="contact-info__body-img">
      <div @click="openModal" class="img-box">
        <img id="profileViewImage" :src="currentContact.image" alt="">
      </div>
      <span>{{ currentContact.name }}</span>
      <span class="online">Online</span>
    </div>

    <div class="contact-info__body-media">
      <div class="contact-info__body-media-top">
        <span>Media, Links and Docs</span>
        <ForwardIcon />
      </div>
      <div class="contact-info__body-media-images">
        <template v-for="(image, i) in currentContact.sharedImages">
          <img :src="image" :key="i" alt="shared image">
        </template>
      </div>
    </div>

    <div class="contact-info__body-actions">
      <div class="mute-message">
        <div class="mute-message-name">
          <span>Mute notifications</span>
          <span class="contact-action-status">
            Until today at 18:51
          </span>
        </div>
        
        <div class="mutebox-cont">
          <div class="mutebox">
            <div class="mutebox-tick"></div>
          </div>
        </div>          
      </div>

      <div class="contact-action">
        <div class="contact-action-name">
          <span>Starred Messages</span>
        </div>
        <div class="contact-action-forward">
          <ForwardIcon />
        </div>
      </div>

      <div class="contact-action">
        <div class="contact-action-name">
          <span>Disappearing Messages</span>
          <span class="contact-action-status">Off</span>
        </div>
        <div class="contact-action-forward">
          <ForwardIcon />
        </div>
      </div>
    </div>

    <div class="contact-info__body-details">
      <div class="about">
        <span>About and phone number</span>
      </div>
      <div class="number">
        <span>
         {{ currentContact.phoneNumber }}
        </span>          
      </div>
    </div>

    <div class="contact-info__body-block">
        <BlockedIcon />        
      <span>Block</span>
    </div>

    <div class="contact-info__body-block danger">
        <ThumbIcon />        
      <span>Report contact</span>
    </div>

    <div @click="deleteChat" class="contact-info__body-block danger">
        <BinIcon />        
      <span>Delete chat</span>
    </div>
  </div>    
</template>

<script>
import { gsap } from "gsap";
import faker from 'faker'
import BlockedIcon from "~/components/icons/blocked";
import BinIcon from "~/components/icons/bin";
import ThumbIcon from "~/components/icons/thumb";
export default {
  components: {
    BlockedIcon,
    BinIcon,
    ThumbIcon
  },
  mounted(){
    console.log(faker)
      gsap.timeline({delay: .29})
      .from('.contact-info__body', {y: '-20px', opacity: 0, ease:"ease.out", duration: .25},)
      // .from('.profile-view-main-img', {scale:.05, opacity: 0, ease:"power2.inOut"}, "-=.85")
      // .from('.profile-view-main-box', {y:-25, opacity: 0, ease:"power2.inOut", },"-=.7")
    },
    computed: {
      currentContact(){
        return this.$store.state.currentContact
      }
    },
    methods: {
    openModal(){
      this.$store.commit("set_modalOpen", true)
    },
    deleteChat(){
      this.$store.commit('deleteChat', this.currentContact._id)
    }
  }
}
</script>

<style lang="scss" scoped>

.contact-info{
      &__body{
      flex-grow: 1;
      overflow-y: auto;
      position: relative;
      z-index: 11;
      & > *{
        background-color: #fff;
        margin-bottom: 10px;
      }
      &-img{        
        display: flex;
        flex-direction: column;  
        padding: 28px 30px 25px;
        .img-box{
          cursor: pointer;
          img{
            width: 200px;
            height: 200px;
            margin: 0 auto;
            display: block;
            object-fit: cover;
            border-radius: 500rem;
          }
        }

        span{
          display: block;
          margin-top: 15px;
          font-size: 17px;
        }
        .online{
          font-size: 14px;
          min-height: 20px;
          color: $text-secondary;
        }
        
      }
      &-media{
        padding: 14px 30px 10px;
        color: $text-teal;
        &-top{
          cursor: pointer;
          @include flex;
          margin-bottom: 14px;
          font-size: 14px;
          svg{
            fill: $svg-fill;
          }
        }

        &-images{
          display: flex;
          img{
            width: 31.5%;
            display: block;
            margin-right: 7px;
            cursor: pointer;
          }
        }
      }
      &-actions{
        padding-left: 30px;
        
        .mute-message{
          cursor: pointer;
          .mutebox-cont{
            .mutebox{
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: 2px;
            background-color: $text-teal;
            border: 1.5px solid $text-teal;

            &-tick{
              position: absolute;
              width: 5px;
              height: 10px;
              top: 1px;
              // left: 4px;
              border-top: none;
              border-right: 2px solid #fff;
              border-bottom: 2px solid #fff;
              border-left: none;
              transform: rotate(45deg);
            }
          }
          }
          
        }
        .mute-message-name, .contact-action-name{
          font-weight: 600;
          font-size: 17px;
          padding-top: 25px;
          padding-bottom: 25px;
          color: $text-color;
          box-sizing: border-box
        }
        .mute-message, .contact-action{
          @include flex;
        }
        .contact-action-status{
          color: $text-secondary;
          margin-top: 5px;
          font-size: 14px;
        }
        .mute-message-name, .contact-action-name{
          display: flex;
          flex-direction: column;
        }
        .mutebox-cont, .contact-action-forward{
          padding-right: 30px;
        }        

        .contact-action{
          cursor: pointer;
          border-top: 1px solid $border-color;
        }
      }
      &-details{
        padding-left: 30px;
        .about, .number{
          padding-top: 25px;
          padding-bottom: 25px;
        }
        .about{
          color: $text-teal;
          font-size: 14px;
        }
        .number{
          font-size: 17px;
          border-top: 1px solid $border-color;
          color: $text-color;
          padding-right: 30px;
        }
      }
      &-block{
        display: flex;
        align-items: center;
        padding: 25px 30px;
        color: $text-color;
        font-size: 17px;
        cursor: pointer;
        span{
          display: block;
          margin-left: 26px;
        }
          svg{
            fill: $svg-fill;
          }   
        &.danger{
          color: $danger;
          svg{
            fill: $danger;
          }
        }
      }
    }
}
</style>