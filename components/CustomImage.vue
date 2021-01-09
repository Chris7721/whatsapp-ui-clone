<template>
  <div v-lazyload class="lazy-image">
    <Person v-if="type !== 'file'"/>
    <img :data-url="imageUrl" :alt="imageAlt"/>    
  </div>  
</template>

<script>
import Person from "~/components/icons/person.vue";
export default {
  props: {
        imageUrl: {
            type: String,
            default() {
                return '';
            }
        },
        imageAlt: {
            type: String,
            default() {
                return '';
            }
        },
        type: {
            type: String,
            default() {
                return '';
            }
        }
    },
    components: {
      Person,
    }
}
</script>

<style lang="scss" scoped>
  .lazy-image, img, svg{
    width: 100%;
    height: 100%;
    display: block;
  }
  .lazy-image{
    // display: flex;
    // align-items: center;
    // justify-content: center;
    img{
        object-fit: cover;
        object-position: center;
        visibility: hidden;
        opacity: 0;
        transition: 500ms all;
      }
      svg{
        display: block;
        fill: #fff;
      }

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

  }
</style>