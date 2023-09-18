# App

 GymPass style app.

 ## RFs (Requisitos funcionais)

 - [ ] Deve ser possível se cadastrar;
 - [ ] Deve ser possível se autenticar;
 - [ ] Deve ser possível obter o perfil de um usuário logado;
 - [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
 - [ ] Deve ser possível o usuário obter seu histórico de check-ins;
 - [ ] Deve ser possível o usuário buscar academias próximas;
 - [ ] Deve ser possível o usuário buscar uma academias pelo nome;
 - [ ] Deve ser possível o usuário realizar check-in em uma academia;
 - [ ] Deve ser possível validar o check-in de um usuário;
 - [ ] Deve ser possível cadastrar uma academia;

 ## RN (Regras de negócio)

 - [ ] O usuário nao deve poder se cadastrar com um e-mail duplicado;
 - [ ] O usuário nao pode fazer 2 check-ins no mesmo dia;
 - [ ] O usuário nao pode fazer check-in se nao tiver perto(100m) da academia;
 - [ ] O check-in só pode ser validado até 20 minuto após criado;
 - [ ] O check-in só pode ser validado por administradores;
 - [ ] A academia só pode ser cadastrada por administradores

 ## RNFs (Requisitos nao-funcionais)

 - [ ] A senha do usuário precisa estar criptografada;
 - [ ] Os dados da aplicacao precisam estar persistidos em banco PostgresSQL;
 - [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
 - [ ] O usu;ario deve ser identificado por um JWT (JSON Web Token);