## Como rodar o projeto

Para rodar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LucasVanni/ecommerce-test.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd backend
   ```
3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Rode o Docker Compose:**
   ```bash
   docker-compose up -d
   ```
5. **Execute as migrações:**

   ```bash
   npm run migration:run
   ```

6. **Navegue até o diretório do projeto em outro terminal:**

   ```bash
   cd web
   ```

7. **Instale as dependências:**

   ```bash
   npm install
   ```

8. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev

   ```

9. **Abra o navegador e acesse:**
   ```
   http://localhost:3000
   ```

Pronto! Agora você deve conseguir ver o projeto rodando em seu navegador.
