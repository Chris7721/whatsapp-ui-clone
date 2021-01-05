<template>
    <div class="contacts">

        <transition
        v-on:before-leave="beforeLeave"
        >
            <ProfileView  v-if="showProfile" :showProfile="showProfile" @close-profile="showProfile=false" />            
        </transition>
        
        <transition
        v-on:before-leave="beforeLeave"
        >
            <NewChat  v-if="showNewChat" :showNewChat="showNewChat" @close-chat="showNewChat=false" />            
        </transition>

        
        <div class="contacts__top">
            <div @click="showProfile = true" class="contacts__top-img">
                <img src="/portrait.png" alt="">
            </div>
            <div class="contacts__top-control">
                <div class="contacts__top-control-svg notification" tabindex="0" title="Status" role="button"><Story /></div>
                <div @click="showNewChat=true" class="contacts__top-control-svg" tabindex="0" title="New Chat" role="button"><Message /></div>
                <div @click="showMenu=true" v-click-outside="hideDropdown" class="contacts__top-control-svg" tabindex="0" title="Menu" role="button">
                    <Menu />
                        <transition name="fade">
                            <div v-if="showMenu" class="control-options">
                                <ul>
                                    <li>New group</li>
                                    <li>Create a room</li>
                                    <li>Profile</li>
                                    <li>Archived</li>
                                    <li>Starred</li>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>
                            </div>
                        </transition>                        
                </div>         
                
            </div>
        </div>
        <CustomInput refName="contactInput" placeholderText='Search or start new chat' />        
        <div class="contacts__details">
            <template v-for="(contact, index) in 13">
                <ContactCard :contact="contact" :key="index"/>                
            </template>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
import ClickOutside from 'vue-click-outside'
import ProfileView from "~/components/ProfileView.vue";
import NewChat from "~/components/NewChat.vue";
import CustomInput from "~/components/CustomInput.vue";
import Story from "~/components/icons/story.vue";
import Message from "~/components/icons/message.vue";
import Menu from "~/components/icons/menu.vue";
import ContactCard from "~/components/ContactCard.vue";
export default {
    directives: {
        ClickOutside
    },
    data(){
        return{
            showMenu: false,
            showProfile: false,
            showNewChat: false,
            
        }
    },
    components:{
        Story,
        Message,
        Menu, 
        ContactCard,
        ProfileView,
        NewChat
    },
    methods: {
        beforeLeave(el){
            el.classList.add('fadeOutClass')
        },
        closeProfile(){
            this.showProfile = false
        },
        hideDropdown(){
            this.showMenu = false
        }
    }
}
</script>

<style lang="scss" scoped>
.contacts{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    &__top{
        padding: 10px 16px;
    }
    
    &__top{
        background-color: $side-header-bg;
        @include flex;
        &-img{
            width: 40px;
            height: 40px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
                border-radius: 500rem;
            }
        }
        &-control{
            display: flex;
            justify-content: center;
            & > *{
                cursor: pointer;
                &:not(:first-child){
                    margin-left: 10px;
                }
                @include flex;
                justify-content: center;
                padding: 8px;
                border-radius: 50%;                
                background-color: transparent;
                transition: background-color .3s;
                svg{
                    fill: $svg-fill;
                    display: block;
                }
                &:focus{
                    outline: none;
                    background-color: $svg-focus;
                }
            }
            &-svg{
                position: relative;  
                &.notification{
                    &::after{
                        content: '';
                        position: absolute;
                        border-radius: 50%;
                        top: 9px;
                        right: 8.5px;
                        background-color: $text-teal;
                        width: 7px;
                        height: 7px;
                    }                    
                }              
            }
        }
    }
    &__details{
        display: block;
        overflow-y: auto !important;
        flex-grow: 1;
        // height: 400px;
    }
}
</style>