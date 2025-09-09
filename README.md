# Projeto: E-commerce com Carrinho de Compras
Este projeto é uma aplicação web de e-commerce que simula um carrinho de compras, com múltiplas páginas e gerenciamento de estado em tempo real. O objetivo principal foi aplicar conceitos de gerenciamento de estado (Vuex) e roteamento (Vue Router) em um cenário prático.

## Tecnologias Utilizadas
Vue.js 3: Framework principal.

Vuex: Gerenciamento de estado centralizado.

Vue Router: Gerenciamento de rotas.

Axios: Cliente HTTP para requisições à API.

Local Storage: Persistência de dados no navegador.

Fake Store API: API para obtenção dos dados de produtos.

## Decisões de Arquitetura
O maior desafio deste projeto era gerenciar os dados do carrinho, que precisavam ser acessados e modificados por diferentes componentes e páginas. Optamos pela seguinte abordagem para evitar o problema de "Prop Drilling":

Em vez de passar dados via props por toda a hierarquia de componentes, utilizamos o Vuex como uma "fonte única da verdade", centralizando o estado do carrinho.

Para criar uma experiência de múltiplas páginas (Home, Carrinho), utilizamos o Vue Router, que permite a navegação sem a necessidade de recarregar a página por completo.

## Estrutura do Projeto
O projeto é organizado com base na função de cada arquivo:

views/: Contém os componentes que representam uma página inteira da aplicação (ex: Home.vue, ShoppingBasket.vue).

components/: Contém os componentes reutilizáveis que são usados para construir as páginas (ex: ProductCard.vue).

store/: Contém toda a lógica de gerenciamento de estado do Vuex.

router/: Contém a configuração de todas as rotas da aplicação.

## Fluxo de Gerenciamento de Estado (Vuex)
O estado do carrinho de compras é gerenciado seguindo o fluxo de mão única do Vuex, garantindo previsibilidade e rastreabilidade:

Um Componente (ex: o botão "Adicionar ao Carrinho") chama uma action com dispatch.

A Action executa a lógica de negócio (ex: chamada à API ou validações) e chama uma mutation com commit.

A Mutation é a única responsável por alterar o state de forma síncrona.

As principais mutations e actions implementadas no projeto são:

Mutations:

loadProducts(state, products): Atualiza o estado da lista de produtos.

mutationAddToBag(state, product): Adiciona um produto ao carrinho e salva a lista atualizada no localStorage.

mutationRemoveFromBag(state, productId): Remove um produto do carrinho e salva a nova lista no localStorage.

Actions:

loadProducts({commit}): Busca os produtos na API e commita a mutação loadProducts.

loadBag({commit}): Carrega o estado do carrinho a partir do localStorage.

actionRemoveFromBag({commit}, productId): Remove um item do carrinho.

## Navegação (Vue Router)
O Vue Router nos permitiu criar uma experiência de navegação fluida:

As rotas são configuradas em router/index.js, associando um caminho (/ ou /basket) a um componente de página.

O componente <router-view> é o "bloco em branco" onde as páginas são carregadas.

O componente <router-link> é um atalho inteligente que navega entre as rotas sem recarregar a página.

## Principais Desafios e Aprendizados
Atributo :key: A importância de usar uma chave única para garantir a estabilidade da lista e a performance do Vue.

Computed Properties vs. Methods: Utilizamos computed properties para o cálculo do total do carrinho, pois elas são mais eficientes ao "cachear" o resultado e só recalcular quando os dados do carrinho mudam.

Separação de Responsabilidades: Aprendemos que a lógica de interação com o usuário (confirm()) deve ficar no componente, enquanto as actions do Vuex devem conter apenas a lógica de negócio.

localStorage: Utilizamos para garantir a persistência dos dados do carrinho, resolvendo o problema de os itens sumirem ao atualizar a página.