import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Basket from '../views/ShoppingBasket.vue'

const routes = [ // array de objetos onde cada objeto representa uma rota
  {
    path: '/', // o caminho na url
    name: 'Home', // o identificador único para a rota
    component: Home // o componente a ser renderizado, ou seja, carregado na pagina
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  
]
// função usada para criar e configurar a solicitação do roteador que  aplicação vai usar, 
// pegando as configurações e transformando em um objeto que gerencia tod a navegação do site.
const router = createRouter({ 
// O history diz ao roteador como ele deve se comportar com o navegador 
  history: createWebHashHistory(),
  // usa a # (hash) na URL, é útil para navegadores mais antigos ou para hospedar em servidores 
  // que não podem ser configurados para lidar com a rota no lado do cliente.
  routes // mapa das rotas que criamos no começo da página.
})

export default router
