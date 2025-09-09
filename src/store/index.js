import { createStore } from 'vuex'
import  axios from 'axios'

export default createStore({
  // O state é onde vai ficar as propriedades de dados. Como se fosse o 'data'.
  // Essas listas do state estão em branco, porque vamos chamar os produtos dessa array dinamicamente nas views usando v-if e v-for
  state: {
    products: [], // um objeto em branco onde vamos salvar os dados dos produtos que vamos pegar por uma requisição de http
    productsInBag: [] // um objeto em branco onde vamos salvar os produtos que adicionamos no carrinho e salvar na localStorage pelo addToBag
  },
  mutations: {
    loadProducts(state, products){ // Recebe a lista de produtos, da API que a action pegou e a atualiza a lista do state
      state.products =  products; 
    },
    loadBag(state, products){ // Recebe a lista de produtos do carrinho, que foi lida pelo localStorage na action, e atualiza a lista productsInBag
      state.productsInBag =  products; 
    },
    mutationAddToBag(state, product){ 
    // Atualiza o estado da propriedade no array, enviando o produto que foi adicionado
      state.productsInBag.push(product); 
    // Salva a informação no navegador como texto JSON. 
    // Assim, se você atualizar a página ou abrir outra aba, o carrinho continua com os mesmos produtos.
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
       
    },
    mutationRemoveFromBag(state, productId){
      // Cria um novo array usando o método filter para incluir apenas os itens que não tem o productId que será removido
      var updatedBag = state.productsInBag.filter(item => productId != item.id); 
      state.productsInBag = updatedBag; // Atribui os novos valores da lista 'updatedBag' para a lista 'productsInBag'
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag)) // Salva essas alterações no localStorage
    },
  },
  actions: {
    loadProducts ({commit}){
      axios 
        .get('https://fakestoreapi.com/products') // Faz um requisição assíncrona para a API de produtos
        .then(response => { 
          commit('loadProducts', response.data); // Quando a resposta do get chega, envia para a mutação com a lista de produtos como dado
        });
    },

    loadBag ({commit}){
      if(localStorage.getItem("productsInBag")) // Verifica se existe um valor salvo no localStorage na productsInBag
       commit('loadBag', JSON.parse(localStorage.getItem("productsInBag"))); // Se existir, converte a tstring em objeto de novo e envia para a mutação
    },

    actionAddToBag({ commit }, product){ // A action está recebendo o produto
      commit('mutationAddToBag', product) // E o envia para a mutation que vai alterar o estado dessa propriedade
    },
    actionRemoveFromBag({ commit }, productId){ // Recebe o produto que queremos excluir
      if(confirm('Tem certeza que quer remover o item?')){ // Exibe uma caixa de confirmação 
        commit('removeFromBag', productId) // Se for verdadeira, não exclui, se não for não faz nada
      }
      commit('mutationRemoveFromBag', productId)
    }
  },
  modules: {
  }
})
