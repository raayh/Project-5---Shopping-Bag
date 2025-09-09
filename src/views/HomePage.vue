<template>
    <div class="home">
      <div class="products">
    <!-- Por que aqui usamos o v-for dessa forma e não só "v-for="product in products"?

        Usamos v-for com o atributo ":key='index'" para rastrear as mudanças, criando uma chave única para cada item na lista.
        
        Isso garante que o Vue atualize apenas os elementos que mudaram, ao invés de recriar toda a lista. Por exemplo: 
        - Se você remove um item com o id: 10, o Vue remove o componente que tem a chave 10.
        - Se você adiciona um novo item com o id: 50, o Vue cria um novo componente para a chave 50.
        
        Sem esse atributo, teriamos problemas de lentidão, por exemplo, porque o vue não ia saber qual item foi alterado e
         ia analisar um por um.
     -->
        <div 
          v-for="(product, index) in this.products" :key="index" 
          class="product"
          :class="{inBag : isInBag(product)}"
          >
           
          <div 
            class="product-image" 
            :style="{backgroundImage: 'url(' + product.image + ')'}">
          </div> 

          <h4>{{product.title}}</h4>

          <p class="price">US$ {{product.price.toFixed(2)}} </p>

          <button v-if="!isInBag(product)" @click="addToBag(product)" >Add to bag</button>
          <button 
            v-else 
            class="remove"
            @click="this.$store.dispatch('actionRemoveFromBag', product.id)"
            > Remove from bag</button>

        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import {mapState} from 'vuex'
  
  export default {
    name: 'Home',
    data() {
      return {

      }
    }, 
    // O que o mapState faz? 
    // O mapState nós ajuda a evitar códigos repetivivos quando precisamos fazer muitas chamadas às propriedades de estado que estão na store,
    // já que ele gera essas funções computadas. 

    computed: mapState([ 
        'products', 
        'productsInBag'
      ]), // Esse é um exemplo de um mapState usando a sintaxe com Array, 
      // usada quando o nome da propriedade no componente é o mesmo que esta no state na store

    methods: {
      addToBag(product){
        product.quantity =1; // Todo item que entra no carrinho começa com uma quantidade mínima definida.
        this.$store.dispatch('actionAddToBag', product); // O produto é enviado para a store, onde vamos fazer as alterações nesse dado
      },
      isInBag(product){
      // Faz uma verificação na lista 'productsInBag' para ver se o id do item, que está na pagina do carrinho, é igual ao id do produto que queremos adicionar
        return this.productsInBag.find(item => item.id == product.id); 
      }
    }
  }
  </script>
  
  <style lang="scss">
  
    .home {
  
      .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
  
  
        .product {
          flex: 0 0 30%;
          box-sizing: border-box;  
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          padding: 16px;
          margin: 8px;
          height: 360px;
  
          @media only screen and (max-width: 769px) {
            flex: 0 0 40%;
          }
  
          @media only screen and (max-width: 640px) {
            flex: 0 0 90%;
          }
  
          &.inBag {
            border: 1px solid #007bff;
          }
          
          .product-image {
            margin: 20px auto;
            width: 160px;
            height: 140px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
          h4 {
            margin: 22px auto;
            font-size: 12px;
            max-width: 60%;
            font-weight: normal;
          }
  
          p.price {
            font-size: 20px;
            font-weight: bold;
          }
  
          button {
            color: #fff;
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 100px;
            font-weight: 400;
            text-align: center;
            padding: 8px 16px;
            cursor: pointer;
  
            &:hover {
              opacity: 0.8;
            }
  
            &.remove {
              background-color: transparent;
              border: none;
              color: black;
              text-decoration: underline;
            }
          }
        }
      }
  
    }
  
  
  </style>
  