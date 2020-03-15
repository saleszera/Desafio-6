<h1>Desafio 6 GoStack!</h1>
<br>
<h4>Projeto testado apenas no Android</h4>
<p>Neste desafio foram implementadas algumas funcionalidades no que foi desenvolvido no modulo-06.</p>
<br>
<p>
  O modulo-06 consistia na criação de uma aplicação mobile que consome a API do GitHub utilizando axios. Na aplicação o usuário pode inserir
  usuarios inserindo o login, quando adicionado o usuario do GitHub, podemos acessar os detalhes do usuario, que contém todos os projetos que
  o usuario do GitHub deu "star", os projetos com "star" podem ser acessados por meio de um browser integrado na aplicação.
</p>
<br>
<p>
  Nesta aplicação foram reutilizadas algumas verificações do modulo anterior que verificam se foi digitado algo, se o login informado está correto ou
  se há usuários duplicados, caso o dado informado caia em alguma das verifiações o component de input ficará com a borda vermelha.
  Também é possivel excluir um usuario adicionado arrastando o respectivo usuario para a direita e clicando no botão com o icone de lixeira.
  Sobre o loading na pagina de detalhes de usuarios, foi adicionado um loading semelhante ao loading do Youtube.
</p>
<br>
<p>
  O projeto pode ser iniciado utilizando o seguinte comando: yarn react-native run-android
</p>
