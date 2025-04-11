# Consulta de CNPJ | Portal Empresarial

Este é o frontend de uma aplicação web para consultar informações de empresas brasileiras a partir do número do CNPJ. O sistema oferece uma interface moderna e minimalista para facilitar a busca e visualização dos dados.

## Tecnologias Utilizadas

* **Next.js:** Framework React para construção de aplicações web com renderização do lado do servidor (SSR) e roteamento fácil.
* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API.

## Como Executar Localmente

Siga estes passos para rodar o frontend em sua máquina de desenvolvimento:

1.  **Certifique-se de ter o Node.js e o npm (ou yarn) instalados em seu sistema.** Você pode verificar as versões com os seguintes comandos no terminal:
    ```bash
    node -v
    npm -v
    # ou
    yarn --version
    ```

2.  **Clone o repositório do frontend:**
    ```bash
    git clone [https://github.com/gustavokurtz/buscacnpj-frontend](https://github.com/gustavokurtz/buscacnpj-frontend)
    cd buscacnpj-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Crie um arquivo `.env.local` na raiz do projeto e adicione a URL base da API:**
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```
    Certifique-se de que o backend da API esteja rodando no endereço especificado. Você pode encontrar o repositório do backend aqui: [https://github.com/gustavokurtz/buscacnpj](https://github.com/gustavokurtz/buscacnpj).

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Funcionalidades Principais

* **Consulta por CNPJ:** Permite ao usuário inserir um número de CNPJ e buscar informações da empresa correspondente.
* **Formatação Automática do CNPJ:** O campo de entrada formata o CNPJ automaticamente durante a digitação.
* **Validação do CNPJ:** Verifica se o formato do CNPJ inserido é válido antes de realizar a consulta.
* **Exibição Detalhada dos Dados:** Apresenta informações relevantes da empresa, como razão social, nome fantasia, porte, capital social, CNAE fiscal, informações de contato, endereço e quadro societário.
* **Interface Moderna e Minimalista:** Design limpo e intuitivo para uma experiência de usuário agradável.
* **Mensagens de Erro:** Exibe mensagens claras em caso de CNPJ inválido ou não encontrado.
* **Animações Sutis:** Utiliza animações para melhorar a interação e a percepção do usuário.

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

* `NEXT_PUBLIC_API_URL`: A URL base da API que fornece os dados das empresas. Esta variável deve ser definida no arquivo `.env.local`.

## Autor

Este frontend foi desenvolvido por **Gustavo**.
