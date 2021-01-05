<template>
    <div         
        class="contacts__input"
        :class="{ focused : inputFocus }"
        @click="inputFocus=true" >
            <div class="contacts__input-box">
                <div :id="`${refName}-search-icon`" class="search-icon">
                    <SearchIcon />
                </div>
                <div :id="`${refName}-arrow-icon`" @click="backAction" class="arrow-icon">
                    <BackIcon />
                </div>
                <div v-click-outside="hide" class="input-box">
                    <input :ref="refName" class="app-input" id="chatInput" type="text" v-model="inputText" :placeholder="placeholderText">
                    <transition name="fade">
                        <div @click="clearText()" v-if="inputText.length > 0" class="cancel-icon">
                            <CancelIcon />
                        </div>
                    </transition>
                </div>                    
            </div>            
    </div>
</template>

<script>
import { gsap } from "gsap";
import ClickOutside from 'vue-click-outside'
import SearchIcon from "~/components/icons/search-icon.vue";
import BackIcon from "~/components/icons/back-icon.vue";
import CancelIcon from "~/components/icons/close-icon.vue";
export default {
    props: {
        placeholderText: {
            type: String,
            default() {
                return 'Enter Info';
            }
        },
        refName: {
            type: String,
            default() {
                return '';
            }
        },
        isFocused: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    directives: {
        ClickOutside
    },
    data(){
        return{
            inputFocus: false,
            inputText: ''
        }
    },
    computed: {
        placeholder(){
            return this.inputFocus ? '' : this.placeholderText
        }
    },
    components:{
        SearchIcon,
        BackIcon,
        CancelIcon,
    },
    mounted(){
        if(this.isFocused) {
            this.clearText()
        }
    },
    methods: {
        backAction(){
            this.inputText = "";
        },
        hide() {
            if(this.inputText.length < 1) {
                this.inputFocus = false
            }
        },
        inputFocusMethod(){
            gsap.timeline()
            .to(`${this.refName}-search-icon`, {rotate: '90deg', opacity: 0, ease:"power2.inOut", duration: .2})
            .to(`${this.refName}arrow-icon`, {rotate: '0', opacity: 1, ease:"power2.inOut", duration: .2}, "-=.1375")
        },
        inputUnfocusMethod(){
            gsap.timeline()
            .to(`${this.refName}arrow-icon`, {rotate: '-70deg', opacity: 0, ease:"power2.inOut", duration: .2},)
            .to(`${this.refName}-search-icon`, {rotate: '0', opacity: 1, ease:"power2.inOut", duration: .2},  "-=.1375")
            
        },
        clearText(){
            this.inputText = ""
            this.inputFocusMethod()
            this.$refs[this.refName].focus()
        }

    },
    watch: {
        inputFocus: function(newVal){
            if(newVal){
                this.inputFocusMethod()
            }
            else{
                if(this.inputText.length < 1) {
                    this.inputUnfocusMethod() 
                }         
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .contacts{
    &__input{
        padding: 10px 16px;
    }

    &__input{
        background-color: $input-box-bg;
        transition: box-shadow .18s, background-color .25s; 
        border-bottom: 1px solid $border-color2;       
        &.focused{
            background-color: #fff;
            box-shadow: 0 2px 30px $border-color2;
        }

        &-box{
            position: relative;
            display: flex;
            align-items: center;
            height: 32px;
            
            .input-box{
                width: 100%;
                height: 100%;
                position: relative;
                @include flex;
            }
            
            .arrow-icon{
                opacity: 0;
                transform: rotate(310deg);
                svg{
                    fill: $text-blue;
                }                
            }
            .search-icon, .arrow-icon, .cancel-icon{
                cursor: pointer;
                width: 20px;
                height: 20px;
                position: absolute;
                left: 10px;
                z-index: 9;
            }
            .cancel-icon{
                right: 20px;
                left: unset;
            }
            svg{               
                fill: $svg-fill;
                width: 100%;
                height: 100%;
            }
        }        
    }
}
</style>