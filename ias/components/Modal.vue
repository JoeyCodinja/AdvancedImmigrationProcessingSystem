<template>
<div class="blind flex" :class="hide ? 'hide' : ''" v-on:click="hideModal">
  <div class="modal-window self-center mx-auto flex flex-col text-center">
    <p class="mt-auto self-center text-xl font-semibold text-center">{{text}}</p>
    <button class="button mb-auto mx-20 font-bold" v-on:click="hideModal">OK</button>
  </div>
</div>
</template>


<script>
export default{
  props:{
    text: String,
    hide: Boolean
  },
  methods: {
    hideModal(){
      this.hide=true;
    }
  }
}
</script>

<style scoped>
.blind{
  position:absolute;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background: rgba(0,0,0,0.8);
  display: flex;
}

.hide {
  display: none;
}

.modal-window{
  width: 25vw;
  height: 25vh;
  background: white;
  border-radius: 2em;
}

.button{
  background-color: black;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}
</style>
