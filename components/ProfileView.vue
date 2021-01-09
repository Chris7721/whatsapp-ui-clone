<template>
    <div class="profile-view">
        <div class="profile-view-top">
            <div @click="$emit('close-profile')" class="profile-view-top-info">
                <BackIcon />
                <span>Profile</span>
            </div>            
        </div>
        <vue-scroll :ops="scroller" ref="scroller">
        <div class="profile-view-main">
            <div class="profile-view-main-img">
                <LazyImage :imageUrl="authUser.image" :imageAlt="authUser.name"/>
            </div>
            
            <div class="profile-view-main-box">
                <div class="profile-view-main-info">
                    <div class="profile-view-main-title">
                        <span>Your name</span>
                    </div>
                    <div class="profile-view-main-action">
                        <span class="name">
                            {{ authUser.name }}
                        </span>
                        <div class="action-pen">
                            <EditIcon />
                        </div>
                    </div>
                </div>

                <span class="info-text">
                    This is not your username or pin.This name will be visible to your WhatsApp contacts.
                </span>

                <div class="profile-view-main-info">
                    <div class="profile-view-main-title">
                        <span>About</span>
                    </div>
                    <div class="profile-view-main-action">
                        <span class="name">
                            {{ authUser.status }}
                        </span>
                        <div class="action-pen">
                            <EditIcon />
                        </div>
                    </div>
                </div>
            </div>            

        </div>
        </vue-scroll>
    </div>
</template>

<script>
import { gsap } from "gsap";
import EditIcon from "~/components/icons/edit-icon.vue";
import BackIcon from "~/components/icons/back-icon.vue";
export default {
    props: {
        showProfile: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    data(){
        return{
            scroller: this.$store.state.scroller
        }
    },
    components: {
        EditIcon,
        BackIcon
    },
    computed: {
        authUser(){
            return this.$store.state.authUser
        }
    },
    mounted: function(){
        gsap.timeline()
        .from('.profile-view', {x: '-100%', ease:"power2.inOut", duration: .4})
        .from('.profile-view-top-info', {x: '-100px', ease:"power4.out", duration: .83}, ".2")
        .from('.profile-view-main-img', {scale:.05, opacity: 0, ease:"power2.inOut"}, "-=.85")
        .from('.profile-view-main-box', {y:-25, opacity: 0, ease:"power2.inOut", },"-=.7")
    },
  
}
</script>

<style lang="scss" scoped>


</style>