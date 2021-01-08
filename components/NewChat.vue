<template>
    <div class="profile-view">
        <div class="profile-view-top">
            <div @click="$emit('close-chat')" class="profile-view-top-info">
                <BackIcon />
                <span>New chat</span>
            </div>            
        </div>
        <CustomInput placeholderText="Search contacts" />

        <div class="side">

            <div class="side__group">
                <div class="side__group-svg">
                    <People />
                </div>
                <div class="side__group-text">
                    <span>New group</span>
                </div>
            </div>
            <div class="side__frequent">
                Frequently contacted
            </div>
            <template v-for="(contact, index) in contacts">
                <ContactCard :contact="contact" :key="index" noInfo />
            </template>

        </div>        
    </div>
</template>

<script>
import { gsap } from "gsap";
import EditIcon from "~/components/icons/edit-icon.vue";
import BackIcon from "~/components/icons/back-icon.vue";
import People from "~/components/icons/people.vue";
import CustomInput from "~/components/CustomInput";
import ContactCard from "~/components/ContactCard";
export default {
    props: {
        showProfile: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    components: {
        EditIcon,
        BackIcon,
        People,
        ContactCard
    },
    computed: {
        contacts(){
            return this.$store.state.contacts
        }
    },
    mounted: function(){
        gsap.timeline()
        .from('.profile-view', {x: '-100%', ease:"power2.inOut", duration: .4})
  },
  methods: {
      
  }
}
</script>

<style lang="scss" scoped>

    .profile-view{
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 117889;
        display: flex;
        flex-direction: column;
        &-top{
            padding-right: 20px;
            padding-left: 23px;
            height: 112px;
            display: flex;
            align-items: flex-end;
            background-color: #00bfa5;
            flex-shrink: 0;
            &-info{
                margin-bottom: 15px;
                color: #fff;
                font-weight: 600;
                font-size: 19px;
                display: flex;
                align-items: center;
                cursor: pointer;
                svg{
                    fill: #fff;
                    display: block;
                    margin-right: 25px;
                }
            }
        }
        
    }

    .side{
        flex-grow: 1;
        overflow-y: auto;
        background: #fff;
        &__group{
            display: flex;
            align-items: center;
            height: 72px;
            border-bottom: 1px solid $border-color2;
            transition: background-color .2s;;
            cursor: pointer;
            &:hover{
                background-color: $border-color;
            }

            &-svg{
                border-radius: 50%;
                margin: 0 15px 0 13px;
                box-sizing: border-box;
                background-color: $text-teal;
                flex: 0 1 1;
                svg{
                    fill: #fff;
                    display: block;
                    padding: 8px;
                }
            }
        }
        &__frequent{
                padding: 30px 0 30px 32px;
                color: $text-teal;
                text-transform: uppercase;
                font-weight: 600;
        }
    }
</style>