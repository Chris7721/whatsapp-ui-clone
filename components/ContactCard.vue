<template>
    <div @click="updateChatView" class="contact-card">
        <div class="contact-card__img">
            <img :src="contact % 2 > 0 ? `/avatar.jpg` : '/portrait.png'" alt="">
        </div>
        <div class="contact-card__content">
            <div class="contact-card__msg">
                <span class="contact-card__msg-name">
                    Mr Ajimola
                </span>
                <span v-if="!noInfo" class="contact-card__msg-time">
                    15:09
                </span>
            </div>
            <div class="contact-card__info">
                <span class="contact-card__info-msg" v-if="!noInfo">Hi how are you</span> 
                <div v-if="!noInfo" class="contact-card__actions">
                    <span><Mute /></span>
                    <span class="unread">{{ contact }}</span>
                    <span class="arrow"><ArrowDown /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MuteIcon from "~/components/icons/mute.vue";
import ArrowDown from "~/components/icons/arrow-down.vue";
export default {
    props: {
        contact: {
            type: Number,
            default() {
                return 0;
            }
        },
        noInfo: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    components: {
        MuteIcon,
        ArrowDown
    },
    methods: {
        updateChatView(){
            this.$store.commit("set_chatView", "chat")
        }
    }
    
}
</script>

<style lang="scss" scoped>
.contact-card{
    @include flex;
    // padding: 0 16px;
    padding-left: 16px;
    background-color: #fff;
    transition: .3s all;
    cursor: pointer;
    height: 72px;
    &:hover{
        background-color: $contact-focus;
        .contact-card__actions{
        & > *{
            &:last-child{
                margin-left: 5px;
                width: 20px;
                // overflow: hidden;
            }
        }
    }

    }
    &__img{
        width: 49px;
        height: 49px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 500rem;
        }
    }
    &__content{
        border-top: 1px solid $border-color;
        align-self: stretch;
        padding-right: 16px;
        margin-left: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    &__msg{
        
        width: 100%;
        color: #000;
        @include flex;

        &-name{
            font-size: 17px;
        }
        &-content{

        }
    }
    &__info{
        min-height: 20px;
        @include flex;      
        margin-top: 2px;
        color: $msg-color;
        svg{
            width: 20px;
            height: 20px;
            fill: $svg-fill-light;
            
        }
        &-msg{
            font-size: 14px;
        }
    }

    &__actions{
        flex: 0 1 0;
        @include flex;
        & > *{
            &:not(:last-child){
                margin-left: 5px;
            }
        }
        .unread{
            background-color: $unread-bg;
            padding: 5px;
            color: #fff;
            font-weight: 600;
            text-align: center;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            font-size: 12px;
            display: block;
            @include flex;
            justify-content: center;            
        }
        .arrow{
            width: 0;
            overflow: hidden;
            transition: .05s width;
        }
    }
}
</style>