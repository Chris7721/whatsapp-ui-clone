import Vue from "vue";

Vue.mixin({
  methods: {
  addZero(val){
    return val.toString().length < 2 ? '0'+val.toString() : val.toString()
  },
  selectDocument(payload) {
    document.getElementById(payload).click();
  },
  scrollToEnd() {    	
    var container = document.querySelector("#chatBody");
    container.scrollTop = container.scrollHeight;
  },
  fakeAsync(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000);
    });
  }
}
})