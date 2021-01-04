<template>
    <div class="profile-view">
        <div class="profile-view-top">
            <div @click="$emit('close-profile')" class="profile-view-top-info">
                <BackIcon />
                <span>Profile</span>
            </div>            
        </div>
        
        <div class="profile-view-main">

            <div class="profile-view-main-img">
                <img src="/portrait.png" alt="">
            </div>
            
            <div class="profile-view-main-box">
                <div class="profile-view-main-info">
                    <div class="profile-view-main-title">
                        <span>Your name</span>
                    </div>
                    <div class="profile-view-main-action">
                        <span class="name">
                            Nonso
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
                        <span>Your name</span>
                    </div>
                    <div class="profile-view-main-action">
                        <span class="name">
                            Nonso
                        </span>
                        <div class="action-pen">
                            <EditIcon />
                        </div>
                    </div>
                </div>
            </div>            

        </div>
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
    components: {
        EditIcon,
        BackIcon
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
        &-main{
            flex-grow: 1;
            background-color: #ededed;
            overflow-y: auto;

            .info-text{
                display: block;
                font-size: 14px;
                text-align: left;
                color: $text-secondary;
                margin: 28px 20px 28px 30px;
            }

            &-title{
                margin-bottom: 18px;
                font-size: 14px;
            }
            &-info{
                margin-bottom: 10px;
                font-weight: 600;
                color: $text-teal;
                box-shadow: 0 1px 3px rgba($color: #000000, $alpha: .08);
            }

            &-action{
                @include flex;
                color: $text-color;

                .action-pen{

                    svg{
                        fill: #919191;
                    }
                }
            }

            &-img{
                width: 200px;
                height: 200px;
                margin: 28px auto;

                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 500rem;
                }
            }

            &-info{
                padding: 14px 30px 10px;
                background: #fff;
            }
        }
    }
</style>