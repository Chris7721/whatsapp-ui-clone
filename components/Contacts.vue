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
            <NewChat  v-if="showNewChat" :showNewChat="showNewChat" @close-chat="openNewChat(false)" />            
        </transition>

        
        <div class="contacts__top">
            <div v-lazyload @click="showProfile = true" class="contacts__top-img">
                <Person />
                <img :data-url="authUser.image" alt="">
            </div>
            <div class="contacts__top-control">
                <div class="contacts__top-control-svg" tabindex="0" title="Status" role="button"><Story /></div>
                <div @click="openNewChat(true)" class="contacts__top-control-svg" tabindex="0" title="New Chat" role="button"><Message /></div>
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
            <template v-for="(contact, index) in contacts">
                <ContactCard :contact="contact" :key="index"/>                
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { gsap } from "gsap";
import ClickOutside from 'vue-click-outside'
import ProfileView from "~/components/ProfileView.vue";
import NewChat from "~/components/NewChat.vue";
import CustomInput from "~/components/CustomInput.vue";
import Story from "~/components/icons/story.vue";
import Person from "~/components/icons/person.vue";
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
    computed: {
        ...mapState(['contacts', 'showNewChat', 'authUser']),
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
        },
        openNewChat(status){
            this.$store.commit('set_showNewChat', status)
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

            &.loaded {
                img {
                    visibility: visible;
                    opacity: 1;
                }
                svg {
                    display: none;
                    width: 100%;
                    height: 100%;
                }
            }

            img{
                width: 100%;
                height: 100%;
                visibility: hidden;
                opacity: 0;
                transition: 500ms all;
                border-radius: 500rem;
            }
            svg {
                    display: block;
                    width: 100%;
                    height: 100%;
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