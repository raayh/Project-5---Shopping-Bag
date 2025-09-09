<template>
<!-- 
  O router-link funciona como um "botão" ou "atalho" que podemos usar para mudar a URL. 
  Ao invés de causar um reload completo da página (como um link <a> faria), ele apenas instrui 
  o Vue Router a trocar o componente exibido no <router-view> 
  ---
  Já o router-view funciona como uma janela na aplicação, onde o vue router olha para a URL atual 
  e, com base nas rotas que você configurou, ele exibe o componente da página correspondente dentro 
  dessa "janela"
-->
  <div id="nav">
    <router-link to="/">Home</router-link> -
    <router-link to="/basket">Shopping Bag ({{this.productsInBag.length}}) </router-link> 
  </div>
  <router-view/>
</template>

<script>
  import {mapState} from 'vuex'

  export default {

    created() {
      // Estamos chamando a action da store para iniciar a busca por produtos na API. Essa action, por sua vez, 
      // vai chamar uma mutation que atualizará o state com a lista de produtos, fazendo com que eles sejam exibidos 
      this.$store.dispatch('loadProducts'); 

      // Estamos chamando a action da store para carregar os produtos do carrinho que estão salvos no localStorage. 
      // Essa action irá commitar uma mutation que atualizará o state com os dados do carrinho, garantindo que os 
      // itens persistam mesmo após um refresh da página.
      this.$store.dispatch('loadBag'); 
    },
    computed: mapState([
       'productsInBag' // estamos usando a sintaxe de array do mapstate para cahamr uma propriedade de estado da store
    ]),
  }
  
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgb(37, 37, 37);
  color: white;


  a {
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #007bff;
    }
  }
}
</style>
