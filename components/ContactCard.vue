<template>
    <div @click="selectContact" :class="['contact-card', currentContact ? (contact._id === currentContact._id ? 'active' : '') : '']">
        <div class="contact-card__img">
            <!-- <Person />            
            <img :data-url="contact.image" alt=""> -->
            <LazyImage :imageUrl="contact.image" :imageAlt="contact.name"/>
        </div>
        <!-- <Status1 /> -->
        <div class="contact-card__content">
            <div class="contact-card__msg">
                <span class="contact-card__msg-name">
                    {{ contact.name | shortenText(0, 20) }}
                </span>
                <span v-if="!noInfo" class="contact-card__msg-time">
                    {{ lastMessage ? timeStamp : '' }}
                </span>
            </div>
            <div class="contact-card__info">
                <div class="contact-card__info-msg">
                    <span v-if="!noInfo" :title="lastMessage.text ? lastMessage.text : ''" :class="{typing: contact.isTyping}">
                        {{ contact.isTyping ? '...typing' : lastMessage.text |  shortenText(0, 16) }}
                    </span> 
                </div> 
                <div v-if="!noInfo" class="contact-card__actions">
                    <span><Mute /></span>
                    <!-- <div class="unread"><span>{{ 0 }}</span></div> -->
                    <span class="arrow"><ArrowDown /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Status1 from '~/components/icons/status-1'
import MuteIcon from "~/components/icons/mute.vue";
import Person from "~/components/icons/person.vue";
import ArrowDown from "~/components/icons/arrow-down.vue";
export default {
    props: {
        contact: {
            type: Object,
            default() {
                return {};
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
    mounted(){
        console.log(this.lastMessage, "The last maessage!!!!!!1")
    },
    computed: {
        lastMessage(){
            const msg = this.$store.getters.lastMessage(this.contact._id)
            if(msg) {
                return msg
            }
            return {text: ''}
        },
        currentContact(){
            return this.$store.state.currentContact
        },
        timeStamp(){      
            return `${this.addZero(dayjs(this.lastMessage.timeStamp).hour())}:${this.addZero(dayjs(this.lastMessage.timeStamp).minute())}`
        }
    },
    methods: {
        selectContact(){
            this.$store.commit("set_currentContact", this.contact)
        }
    }
    
}
</script>

<style lang="scss" scoped>
.contact-card{
    @include flex;
    // padding: 0 16px;
    max-width: 100%;
    padding-left: 16px;
    background-color: #fff;
    transition: .3s all;
    cursor: pointer;
    height: 72px;
    svg{
        background: transparent;
    }

    &.active{
        background-color: #ebebeb !important;
    }
    &:hover{
        background-color: $contact-focus;
        .contact-card__actions{
            transform: translateX(0);
        }
    }
    &__img{
        width: 49px;
        height: 49px;
        flex-shrink: 0;
        border-radius: 500rem; 
        overflow: hidden;
        
    }
    &__content{
        border-top: 1px solid $border-color;
        align-self: stretch;
        padding-right: 16px;
        margin-left: 16px;
        flex-grow: 1;
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
        &-time{
            font-size: 12px;
            color: $text-secondary;
        }
    }
    &__info{
        max-width: 100%;
        min-height: 20px;
        @include flex;      
        margin-top: 2px;
        color: $msg-color;
        overflow: hidden;
        svg{
            width: 20px;
            height: 20px;
            fill: $svg-fill-light;
            
        }
        &-msg{
            max-width: 50%;
            overflow: hidden;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;

            .typing{
                color: $unread-bg;
                font-weight: 600;
            }
        }
        
    }

    &__actions{
        flex: 0 1 0;
        transform: translateX(20px);
        transition: .05s all;
        @include flex;
        & > *{
            &:not(:first-child){
                margin-left: 5px;
            }
        }
        .unread{
            background-color: $unread-bg;
            padding: 2px;
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
            span{
                display: block;
            }
        }
        svg{
            width: 20px;
            height: 20px;
        }
        .arrow{
            // width: 0;
            // overflow: hidden;
            // transition: .05s width;
        }
    }
}
</style>