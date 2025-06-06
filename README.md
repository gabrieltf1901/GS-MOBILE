# NOME: GABRIEL TORRES FERNANDES - RM553635

## LINK VÍDEO DE APRESENTAÇÃO --> 
## LINK DA API .NET --> https://github.com/gabrieltf1901/GS---.NET.git

# Gestão Abrigos Mobile

Este projeto é um aplicativo móvel desenvolvido em React Native (com Expo) para gerenciar abrigos, recursos e estoques relacionados. Ele consome uma API backend construída em .NET 9.0 para realizar operações de CRUD (criar, ler, atualizar e excluir) em três entidades principais: Abrigos, Recursos e Estoques.

O aplicativo também conta com autenticação via Firebase Authentication, garantindo que apenas usuários autenticados possam acessar as funcionalidades após o login.

---

## Índice

1. [Funcionalidades Principais](#funcionalidades-principais)
2. [Pré-requisitos](#pré-requisitos)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configurações Iniciais](#configurações-iniciais)

   1. [Clone do Repositório](#clone-do-repositório)
   2. [Backend .NET](#backend-dotnet)
   3. [Configuração do Firebase](#configuração-do-firebase)
   4. [Front-end React Native](#front-end-react-native)
5. [Rodando o Backend .NET](#rodando-o-backend-dotnet)
6. [Rodando o App React Native](#rodando-o-app-react-native)
7. [Detalhes das Telas](#detalhes-das-telas)
8. [APIS e Rotas](#apis-e-rotas)
9. [Estrutura de Pastas](#estrutura-de-pastas)
10. [Bibliotecas e Dependências](#bibliotecas-e-dependências)
11. [Design e Estilização](#design-e-estilização)
12. [Arquitetura de Código](#arquitetura-de-código)
13. [Observações Finais](#observações-finais)

---

## Funcionalidades Principais

* **Autenticação**

  * Login e cadastro de usuários via Firebase Authentication (e-mail e senha).
  * Logout.
  * Controle de acesso às telas: somente usuários autenticados podem acessar as funcionalidades após o login.

* **CRUD de Abrigos**

  * Listar todos os abrigos.
  * Visualizar detalhes de um abrigo, incluindo informações e recursos associados.
  * Criar novo abrigo (nome, endereço, latitude, longitude, capacidade e status).
  * (Backend expõe rotas para editar e excluir abrigo, caso deseje estender).

* **CRUD de Recursos (EstoqueAbrigo)**

  * Listar recursos de um abrigo específico.
  * Criar novo recurso para um abrigo (nome, categoria, nível crítico, unidade de medida, quantidade atual).
  * Editar recurso existente (mesmos campos).

* **Design e Navegação**

  * Mínimo de 6 telas: Login, Home (lista de abrigos), Detalhes do Abrigo, Formulário de Recurso, Perfil de Usuário, Formulário de Abrigo.
  * Navegação com React Navigation (Stack Navigator e Bottom Tab Navigator).
  * Menu fixo (Footer) com abas para “Abrigos” e “Perfil”.
  * Estilização com paleta de cores preta/vermelha/branco e layout responsivo.

* **Integração com Backend .NET**

  * Consumo de API RESTful via Axios.
  * Rotas para gerenciamento de abrigos e estoques.

* **Outros**

  * Uso de Context API para controle de estado de autenticação (AuthContext).
  * Campos validados e tratamento de erros com Alert e Loader.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão LTS) e npm.
* **Expo CLI** (caso use Expo, no mínimo 6.x):

  ```bash
  npm install -g expo-cli
  ```
* **Visual Studio 2022/2025** ou **Rider** (para .NET).
* **.NET 9.0 SDK** instalado e configurado.
* **Conta no Firebase** com um projeto criado e o Authentication habilitado para e-mail/senha.
* (Opcional) **Postman** ou **Insomnia** para testar API.
* Em caso de testes em dispositivos físicos, garanta que o computador e o celular estejam na mesma rede Wi-Fi.

---

## Estrutura do Projeto

A seguir a estrutura de pastas do repositório:

```
GestaoAbrig osMobile/
├── backend/                          # Projeto .NET 9.0 (API RESTful)
│   ├── GestaoAbrig os.API/           # Projeto principal (controllers, models, services)
│   ├── GestaoAbrig os.Domain/        # Entidades e interfaces de serviço
│   ├── GestaoAbrig os.Infrastructure/ # Implementações de repositório (EF Core, contexto, migrations)
│   └── GestaoAbrig os.sln            # Solução .NET
│
├── mobile/                           # Projeto React Native (Expo)
│   ├── assets/
│   │   ├── fonts/                    # (opcional) fontes customizadas
│   │   ├── images/                   # imagens, ícones, splash, logo
│   │   └── styles/
│   │       └── colors.js             # definição da paleta de cores
│   │
│   ├── components/                   # componentes reutilizáveis (ShelterCard, Loader)
│   │   ├── ShelterCard.js
│   │   └── Loader.js
│   │
│   ├── contexts/                     # Context API (AuthContext)
│   │   └── AuthContext.js
│   │
│   ├── navigation/                   # Configuração de rotas (Stack e Tab Navigators)
│   │   ├── AppNavigator.js           # Controla fluxo de Auth vs MainTabs
│   │   ├── AuthNavigator.js          # Pilha de autenticação (Login)
│   │   ├── ShelterStackNavigator.js  # Pilha de abrigos (Home, Detalhes, FormResource, FormShelter)
│   │   └── MainTabNavigator.js       # Bottom Tab Navigator (Abrigos, Perfil)
│   │
│   ├── screens/                      # Telas principais
│   │   ├── LoginScreen.js            # tela de login/cadastro Firebase
│   │   ├── HomeScreen.js             # lista de abrigos + botão “+ Adicionar Abrigo”
│   │   ├── ShelterDetailScreen.js    # detalhes do abrigo e lista de recursos
│   │   ├── ResourceFormScreen.js     # criar/editar recurso de um abrigo
│   │   ├── ProfileScreen.js          # perfil do usuário + logout
│   │   └── ShelterFormScreen.js      # formulário para cadastrar novo abrigo
│   │
│   ├── services/                     # serviços de integração
│   │   ├── api.js                    # instância Axios configurada (BASE_URL)
│   │   └── firebaseConfig.js         # configuração do Firebase Auth para React Native
│   │
│   ├── App.js                        # ponto de entrada do app
│   ├── babel.config.js               # configuração Babel (expo)
│   └── app.json                      # configurações Expo (ícones, splash etc.)
│
└── README.md                         # este arquivo
```

---

## Configurações Iniciais

### 1. Clone do Repositório

No terminal, faça:

```bash
git clone <URL_DO_REPOSITÓRIO>
cd GestaoAbrig osMobile
```

---

#### 2. Backend .NET

1. Navegue até a pasta `backend/GestaoAbrig os.API/` (ou a solução conforme nome local)
2. Abra o arquivo de solução `.sln` no Visual Studio ou JetBrains Rider.
3. No `launchSettings.json`, confirme que a URL está configurada para ouvir em todas as interfaces:

   ```json
   "applicationUrl": "http://0.0.0.0:5108;https://0.0.0.0:7108"
   ```

   Isso permite que o emulador ou dispositivo móvel acesse o backend via IP da máquina.
4. Verifique o ConnectionString do banco de dados no `appsettings.Development.json` (por exemplo, SQL Server local ou outro). Configure conforme seu ambiente.
5. No terminal, navegue até o projeto de infraestrutura (onde está o DbContext) e rode as Migrations (se ainda não tiver migrado):

   ```bash
   dotnet ef database update -p GestaoAbrig os.Infrastructure -s GestaoAbrig os.API
   ```
6. Execute o projeto (`F5` ou `dotnet run`) para subir a API em `http://localhost:5108`.
7. No navegador, acesse o Swagger em:

   ```
   http://localhost:5108/swagger/index.html
   ```

   Verifique se as rotas `/api/abrigos`, `/api/recursos`, `/api/estoqueabrigo` (ou semelhantes) aparecem e respondem adequadamente.

---

### 3. Configuração do Firebase

1. No console do Firebase ([https://console.firebase.google.com/](https://console.firebase.google.com/)), crie um novo projeto (ou use um existente).
2. Em **Authentication**, habilite o provedor **Email/Password**.
3. Na seção de configurações do projeto, copie as credenciais **Firebase SDK** (apiKey, authDomain, etc.).
4. No front-end, abra `mobile/services/firebaseConfig.js` e substitua pelo JSON do seu projeto. Exemplo:

   ```js
   import { initializeApp } from "firebase/app";
   import { initializeAuth, getReactNativePersistence } from "firebase/auth";
   import AsyncStorage from "@react-native-async-storage/async-storage";

   const firebaseConfig = {
     apiKey: "SEU_API_KEY",
     authDomain: "SEU_AUTH_DOMAIN",
     projectId: "SEU_PROJECT_ID",
     storageBucket: "SEU_STORAGE_BUCKET",
     messagingSenderId: "SEU_MESSAGING_SENDER_ID",
     appId: "SEU_APP_ID",
     measurementId: "SEU_MEASUREMENT_ID"
   };

   const app = initializeApp(firebaseConfig);
   const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

   export { auth };
   ```
5. Salve as alterações. O `AuthContext.js` e as telas de login (LoginScreen.js) já estão configurados para usar esse `auth`.

---

### 4. Front-end React Native (Expo)

1. Navegue até a pasta `mobile/`:

   ```bash
   cd mobile
   ```
2. Instale dependências:

   ```bash
   npm install
   expo install react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @expo/vector-icons @react-native-async-storage/async-storage @react-native-picker/picker
   ```

   Isso garante que todas as bibliotecas necessárias (React Navigation, Axios, Firebase, AsyncStorage, Picker) estejam presentes.
3. Verifique se o arquivo `mobile/services/api.js` está configurado para usar a URL correta do backend:

   ```js
   import axios from "axios";
   import { Platform } from "react-native";

   const BASE_URL =
     Platform.OS === "android"
       ? "http://10.0.2.2:5108/api"
       : "http://localhost:5108/api";

   export default axios.create({ baseURL: BASE_URL, timeout: 5000 });
   ```

   * Se você estiver testando em

     * Android Emulator: usa `10.0.2.2`
     * iOS Simulator: usa `localhost`
     * Dispositivo físico: altere para `http://<IP_DA_SUA_MAQUINA>:5108/api`
4. Verifique o arquivo `mobile/assets/styles/colors.js` para ver se exporta o objeto de cores corretamente.
5. Certifique-se de que a estrutura de pastas está conforme o esperado (components/, contexts/, navigation/, screens/, services/).
6. No terminal (dentro de `mobile/`), execute:

   ```bash
   expo start -c
   ```

   Isso iniciará o **Metro Bundler** e abrirá o Expo Dev Tools.
7. Para testar:

   * **Android Emulator**: pressione `a` no terminal ou clique em “Run on Android device/emulator”.
   * **iOS Simulator (macOS)**: pressione `i` ou clique em “Run on iOS simulator”.
   * **Dispositivo físico**: abra o app Expo Go e escaneie o QR Code.

---

## Rodando o Backend .NET

1. Abra a solução `.sln` em Visual Studio ou Rider.
2. Se necessário, atualize o connection string ou outras configurações específicas.
3. Execute as migrations para criar o banco de dados:

   ```bash
   dotnet ef database update -p GestaoAbrig os.Infrastructure -s GestaoAbrig os.API
   ```
4. Rode o projeto (F5 ou `dotnet run`) e confirme no console:

   ```
   Now listening on: http://localhost:5108
   ```
5. Acesse o Swagger: `http://localhost:5108/swagger/index.html`. Assuntos esperados:

   * **GET /api/abrigos** → lista todos os abrigos (deve retornar 200).
   * **POST /api/abrigos** → cria novo abrigo (envie JSON via Swagger). 
   * **GET /api/abrigos/{id}** → busca um abrigo específico.
   * **PUT /api/abrigos/{id}** → atualiza abrigo.
   * **DELETE /api/abrigos/{id}** → exclui abrigo.
   * Rotas para recursos e estoque (Ex: /api/recursos, /api/estoqueabrigo) também disponíveis no Swagger.

---

## Rodando o App React Native

1. No terminal dentro da pasta `mobile/`, rode:

   ```bash
   npm install           # garante todas as dependências instaladas
   expo start -c         # inicia o Metro Bundler e limpa o cache
   ```

2. Selecione o ambiente:

   * **Android Emulator**: pressione `a` (ou clique em “Run on Android”).
   * **iOS Simulator**: pressione `i` (ou clique em “Run on iOS”).
   * **Dispositivo físico**: abra o Expo Go no celular e escaneie o QR Code.

3. **Fluxo de teste**:

   1. **Login / Cadastro**: ao abrir, a tela de Login aparecerá. Tente criar novo usuário (e-mail + senha). Se criar com sucesso, redireciona ao **HomeScreen**. Senão, mostre alerta de erro.
   2. **HomeScreen (Abrigos)**: ao entrar, o app faz `GET /api/abrigos` e exibe a lista. Se não houver, mostra texto “Nenhum abrigo encontrado.”
   3. **Adicionar Abrigo**: no Home, clique no botão flutuante vermelho “+ Adicionar Abrigo” → abre **ShelterFormScreen**. Preencha dados e clique em “Salvar Abrigo”. Se sucesso, alerta e volta ao Home com a lista atualizada.
   4. **Detalhar Abrigo**: clique em qualquer card de abrigo na lista → abre **ShelterDetailScreen**. Mostra informações do abrigo e lista de recursos relacionados (via `GET /api/abrigos/{id}/recursos`). Se não houver recursos, exibe texto “Nenhum recurso cadastrado.”
   5. **Adicionar Recurso**: de **ShelterDetail**, clique no botão “+ Adicionar Recurso” → abre **ResourceFormScreen**. Preencha nome, categoria, nível crítico, unidade e quantidade. Clique em “Salvar Recurso” → voltará à tela de detalhes com recursos atualizados.
   6. **Perfil**: no rodapé, clique em “Perfil” → **ProfileScreen** exibe e-mail do usuário logado e botão “Logout”. Ao clicar, o usuário é deslogado e retorna à tela de Login.
   7. **Abas (Footer)**: o menu fixo no rodapé aparece em todas as telas após o login, com duas abas: “Abrigos” (ícone de casa) e “Perfil” (ícone de usuário). O usuário pode alternar a qualquer momento.

---

## Detalhes das Telas

### 1. LoginScreen

* Inputs: e-mail e senha.
* Botão: “Entrar” ou “Cadastrar” (depende se está no modo registro).
* Toggle para alternar entre login e registro.
* Valida se e-mail/senha estão preenchidos.
* Usa Firebase Auth (`signInWithEmailAndPassword` e `createUserWithEmailAndPassword`).
* Apresenta `Loader` (ícone de carregamento) enquanto aguarda resposta.

### 2. HomeScreen

* Cabeçalho: título “Abrigos” e botão “Sair” (logout). 
* Lista de abrigos com `FlatList`, cada item renderiza `ShelterCard`.
* `ShelterCard` exibe nome, capacidade e status (ícone verde/vermelho). 
* Botão flutuante “+ Adicionar Abrigo” no rodapé.
* Chama `GET /abrigos` ao abrir a tela (useEffect no `navigation.addListener("focus")`).
* Em caso de erro, mostra alerta.

### 3. ShelterDetailScreen

* Recebe parâmetro `shelter` (objeto com dados do abrigo).
* Exibe informações:

  * Nome (no header), Endereço, Capacidade Total e Status (texto colorido).
* Lista de recursos (`FlatList`) obtida via `GET /abrigos/{id}/recursos`.
* Cada recurso exibe nome, quantidade e unidade.
* Botão flutuante “+ Adicionar Recurso” → leva a `ResourceFormScreen` (passa `shelterId`).
* Se sem recursos, exibe texto “Nenhum recurso cadastrado.”

### 4. ResourceFormScreen

* Parâmetros: `route.params.shelterId` (se for criação) e, opcionalmente, `resourceId` (se edição).
* Campos:

  * Nome do recurso (TextInput)
  * Categoria (Picker com opções: ALIMENTO, AGUA, COBERTOR, KIT\_PRIMEIROS\_SOCORROS, MEDICAMENTO, OUTRO)
  * Nível Crítico (TextInput numérico)
  * Unidade de Medida (TextInput: ex “KG”, “L”, “UN”)
  * Quantidade Atual (TextInput numérico)
* Botão “Salvar Recurso”: se `resourceId` existe → `PUT /estoqueabrigo/{id}`, senão → `POST /estoqueabrigo`.
* Valida todos os campos e converte para números. Mostra alerta em caso de erro.
* Ao salvar, volta para `ShelterDetailScreen`.

### 5. ProfileScreen

* Exibe e-mail do usuário (`user.email`).
* Botão “Logout”: exibe confirmação via `Alert` e, se confirmado, chama `logout()` do `AuthContext`, retornando à tela de Login.

### 6. ShelterFormScreen

* Campos:

  * Nome do Abrigo (TextInput)
  * Endereço (TextInput)
  * Latitude (TextInput decimal)
  * Longitude (TextInput decimal)
  * Capacidade Total (TextInput numérico)
  * Status (dois botões: “Aberto” e “Fechado”; ao selecionar, botão muda para fundo vermelho)
* Botão “Salvar Abrigo”: envia `POST /abrigos` com payload JSON:

  ```json
  {
    "nome": "...",
    "endereco": "...",
    "latitude": -23.55,
    "longitude": -46.63,
    "capacidadeTotal": 200,
    "status": "ABERTO"
  }
  ```
* Valida preenchimento e conversão de números. Em caso de sucesso, alerta e volta para HomeScreen.

---

## APIS e Rotas (Backend .NET)

As rotas abaixo estão disponíveis no Swagger e são consumidas pelo app:

### Abrigos

* **GET** `/api/abrigos` → retorna `200 OK` + array de `AbrigoDto`.
* **GET** `/api/abrigos/{id}` → retorna `200 OK` + `AbrigoDto` ou `404 Not Found` se não existir.
* **POST** `/api/abrigos` → recebe `AbrigoDto` (sem `Id`), retorna `201 Created` com cabeçalho `Location: /api/abrigos/{id}`.
* **PUT** `/api/abrigos/{id}` → recebe `AbrigoDto` (com `Id`), retorna `200 OK` com o `AbrigoDto` atualizado ou `404 Not Found`/`400 Bad Request`.
* **DELETE** `/api/abrigos/{id}` → retorna `204 No Content` ou `404 Not Found`.
* **GET** `/api/abrigos/status/{status}` → retorna lista de abrigos filtrados por status ("ABERTO" ou "FECHADO").

### Recursos / EstoqueAbrigo

* **GET** `/api/recursos` → retorna lista de recursos disponíveis.
* **POST** `/api/recursos` → cria novo recurso.
* **GET** `/api/estoqueabrigo` → retorna todos os estoques de todos abrigos.
* **POST** `/api/estoqueabrigo` → cria novo estoque (recurso em abrigo), recebe JSON:

  ```json
  {
    "abrigoId": 1,
    "recursoId": 2,
    "quantidadeAtual": 50
  }
  ```
* **GET** `/api/estoqueabrigo/{id}` → retorna detalhes de um estoque específico.
* **PUT** `/api/estoqueabrigo/{id}` → atualiza estoque.
* **DELETE** `/api/estoqueabrigo/{id}` → exclui estoque.

**Observação**: No **ShelterDetailScreen**, usamos `GET /api/abrigos/{id}/recursos` (pode ser um método custom de seu controller ou um endpoint do serviço) que retorna recursos e quantidades de forma agregada para aquele abrigo. Caso não haja esse endpoint, implemente um método no controller que faça o `JOIN` entre Abrigo e EstoqueAbrigo, retornando a lista de recursos para um Abrigo específico.

---

## Estrutura de Pastas (detalhada)

```
GestaoAbrig osMobile/
├── backend/
│   ├── GestaoAbrig os.API/
│   │   ├── Controllers/
│   │   │   └── AbrigosController.cs      # controller de abrigos
│   │   ├── DTOs/                         # classes de DTO (AbrigoDto, RecursoDto, EstoqueAbrigoDto)
│   │   ├── Models/                       # entidades (Abrigo, Recurso, EstoqueAbrigo, LinkResource)
│   │   ├── Services/Interfaces/          # interfaces de serviço (IAbrigoService, IRecursoService, etc.)
│   │   ├── Services/Implementations/     # implementação de serviços
│   │   ├── Utils/                        # utils (LinkService, mapeamentos HATEOAS)
│   │   ├── Program.cs                    # configuração do ASP.NET (Cors, Routes, Serilog/Middleware)
│   │   ├── appsettings.json              # configurações gerais
│   │   ├── appsettings.Development.json  # Database ConnectionString, Logging:
│   │   └── launchSettings.json           # configurações de URL e perfil de execução
│   │
│   ├── GestaoAbrig os.Infrastructure/
│   │   ├── Data/                         # DbContext (GestaoAbrig osContext.cs)
│   │   ├── Migrations/                   # Migrations geradas pelo EF Core
│   │   ├── Repositories/                 # classes que implementam interfaces para acesso a dados
│   │   └── GestaoAbrig os.Infrastructure.csproj
│   │
│   ├── GestaoAbrig os.Domain/            # projeto de modelo de domínio (entidades e interfaces)
│   │   ├── Entities/                     # classes de entidade (Abrigo, Recurso, EstoqueAbrigo)
│   │   ├── Interfaces/                   # interfaces de repositório e serviço
│   │   └── GestaoAbrig os.Domain.csproj
│   │
│   ├── GestaoAbrig os.Application/       # (opcional) serviços de aplicação, DTO mapping, configurações extras
│   │
│   └── GestaoAbrig os.sln                # solução contendo todos os projetos (.API, .Domain, .Infrastructure)
│
├── mobile/
│   ├── assets/
│   │   ├── fonts/                        # (opcional) fontes customizadas
│   │   ├── images/                       # ícones, logo, splash
│   │   └── styles/
│   │       └── colors.js                 # define cores da paleta (preto/vermelho/branco)
│   │
│   ├── components/                       # componentes reaproveitáveis
│   │   ├── ShelterCard.js                # cartão de exibição de abrigo na lista
│   │   └── Loader.js                     # indicador de carregamento (ActivityIndicator)
│   │
│   ├── contexts/                         # Context API para autenticação
│   │   └── AuthContext.js                # gerencia estado de usuário e loading
│   │
│   ├── navigation/                       # configuração de rotas
│   │   ├── AppNavigator.js               # escolhe Auth vs MainTabs
│   │   ├── AuthNavigator.js              # Stack de login (LoginScreen)
│   │   ├── ShelterStackNavigator.js      # Stack de Abrigos (Home, Detalhes, FormRecurso, FormAbrigo)
│   │   └── MainTabNavigator.js           # Bottom Tabs (AbrigosTab, ProfileTab)
│   │
│   ├── screens/                          # telas principais do app
│   │   ├── LoginScreen.js                # login/cadastro com Firebase
│   │   ├── HomeScreen.js                 # lista de abrigos + botão cadastrar abrigo
│   │   ├── ShelterDetailScreen.js        # detalhes do abrigo + lista de recursos
│   │   ├── ResourceFormScreen.js         # criar/editar recurso                                                                                                                                                                                                                                                                                                                                                                                                                                              
│   │   ├── ShelterFormScreen.js          # criar novo abrigo
│   │   └── ProfileScreen.js              # exibe email + logout
│   │
│   ├── services/                         # serviços de integração
│   │   ├── api.js                        # instância Axios configurada (baseURL + timeout)
│   │   └── firebaseConfig.js             # config do Firebase Auth para RN
│   │
│   ├── App.js                            # ponto de entrada (envolve AuthProvider e AppNavigator)
│   ├── babel.config.js                   # Babel preset (expo)
│   └── app.json                          # configurações do Expo (ícones, splash etc.)
│
└── README.md                             # este arquivo explicativo
```

---

## Bibliotecas e Dependências

Aqui estão as principais bibliotecas utilizadas no projeto móvel (`mobile/package.json`):

* **`expo`**: framework principal para React Native.
* **`react-native`**: núcleo do React Native.
* **`@react-navigation/native`**: núcleo do React Navigation.
* **`@react-navigation/native-stack`**: Stack Navigator.
* **`@react-navigation/bottom-tabs`**: Bottom Tab Navigator.
* **`react-native-screens`** e **`react-native-safe-area-context`**: dependências obrigatórias do React Navigation.
* **`axios`**: cliente HTTP para consumir a API .NET.
* **`firebase`**: SDK do Firebase (usado apenas para Auth via `initializeAuth`).
* **`@react-native-async-storage/async-storage`**: usado para persistência de sessão no Firebase Auth.
* **`@expo/vector-icons`**: ícones (Ionicons) para as abas e botões.
* **`@react-native-picker/picker`**: componente Picker para escolher categoria de recurso.

No backend (.NET), as principais dependências (em `GestaoAbrig os.API.csproj` ou `.Infrastructure.csproj`) incluem:

* **`Microsoft.EntityFrameworkCore`** e **`Microsoft.EntityFrameworkCore.SqlServer`**: para acesso a dados via EF Core.
* **`MassTransit`** e **`MassTransit.RabbitMQ`**: mensageria (RabbitMQ) para consumo de eventos (pode ser pendente de outra disciplina).
* **`AutoMapper`** (opcional) ou mapeamentos manuais nos controllers para converter Entidades ↔ DTOs.
* **`Swashbuckle.AspNetCore`**: para geração de Swagger UI e documentação automática das rotas.
* **`Serilog`** (ou outro logging) para middleware de logs de requisição.

---

## Design e Estilização

A paleta de cores adotada segue:

```js
// assets/styles/colors.js
export default {
  primary: "#D32F2F",       // Vermelho escuro (botões, status)
  secondary: "#212121",     // Preto (textos principais)
  background: "#FFFFFF",    // Branco puro (fundo das telas e cards)
  text: "#212121",          // Preto (texto em inputs e labels)
  inputBorder: "#BDBDBD",   // Cinza claro (borda de inputs e cards)
  placeholder: "#757575",   // Cinza intermediário (placeholder em inputs)
  error: "#B00020"          // Vermelho intenso (mensagens de erro)
};
```

* **Fundo branco** em toda a aplicação.
* **Textos e Labels** em preto (colors.secondary ou colors.text).
* **Botões**, abas ativas e status “Aberto”/“Fechado” usam vermelho (colors.primary).
* **Inputs** possuem borda cinza clara, fundo branco e placeholder cinza escuro.
* **Abas no rodapé** usam fundo branco, ícones pretos inativos e vermelhos ativos.
* **Cards de Abrigo** e **Recursos** usam fundo branco, borda cinza clara, sombra leve e texto preto.

As fontes padrão são as do sistema. Caso deseje adicionar fontes customizadas, coloque-as em `assets/fonts/` e registre usando `expo-font` no `App.js`.

---

## Arquitetura de Código

### Front-end (React Native)

* **Componentes (mobile/components)**

  * `ShelterCard.js`: exibe nome, capacidade e status de um abrigo.
  * `Loader.js`: componente de carregamento centralizado (ActivityIndicator).

* **Contextos (mobile/contexts)**

  * `AuthContext.js`: fornece `user`, `loading` e `logout`. Monitora mudanças no estado de autenticação com `onAuthStateChanged(auth, ...)`. Armazena usuário no AsyncStorage.

* **Serviços (mobile/services)**

  * `api.js`: instância Axios com baseURL e timeout. Detecta plataforma (Android ou iOS) e escolhe o host correto (`10.0.2.2` para Android emulador, `localhost` para iOS). 
  * `firebaseConfig.js`: configura Firebase usando `initializeAuth` + `getReactNativePersistence(AsyncStorage)`, e exporta `auth` para uso nas telas.

* **Navegação (mobile/navigation)**

  * `AuthNavigator.js`: Stack Navigator contendo apenas a tela de Login (sem header). `contentStyle` com fundo branco.
  * `ShelterStackNavigator.js`: Stack Navigator para telas de Abrigos:

    * Home (lista) → ShelterDetail (detalhes) → ResourceForm (recurso) → ShelterForm (cadastro de abrigo).
  * `MainTabNavigator.js`: Bottom Tab Navigator com duas abas: “AbrigosTab” aponta para `ShelterStackNavigator`, “ProfileTab” aponta para `ProfileScreen`. Ícones Ionicons e estilos personalizados.
  * `AppNavigator.js`: Componente principal que, com base em `AuthContext` (`user` e `loading`), escolhe renderizar ou `AuthNavigator` (quando `user == null`) ou `MainTabNavigator` (quando `user != null`).

* **Telas (mobile/screens)**

  * `LoginScreen.js`: Formulário de login/cadastro, usa `signInWithEmailAndPassword` e `createUserWithEmailAndPassword`. Gerencia estado local (`email`, `password`, `isRegistering`, `loading`). Usa `AuthContext.setUser` ao autenticar.
  * `HomeScreen.js`: Chama `api.get("/abrigos")`, armazena em `shelters`. Exibe lista com `ShelterCard` e botão flutuante “+ Adicionar Abrigo” (navega para `ShelterForm`). Logout via `AuthContext.logout()`.
  * `ShelterDetailScreen.js`: Recebe `shelter` via `route.params`. Chama `api.get(`/abrigos/\${shelter.id}/recursos`)`. Exibe dados do abrigo e lista de recursos (`FlatList`). Botão “+ Adicionar Recurso” navega para `ResourceFormScreen`.
  * `ResourceFormScreen.js`: Se `route.params.resourceId` existe, faz `api.get(`/estoqueabrigo/\${resourceId}`)` e preenche campos. Ao salvar, faz `POST /estoqueabrigo` ou `PUT /estoqueabrigo/${resourceId}`. Valida campos e mostra `Loader`.
  * `ProfileScreen.js`: Exibe `user.email` e botão de logout com confirmação. Logout chama `AuthContext.logout()`.
  * `ShelterFormScreen.js`: Campos para criar abrigo: `nome`, `endereco`, `latitude`, `longitude`, `capacidadeTotal`, `status` (botões “Aberto”/“Fechado”). Ao salvar, `POST /abrigos`.

### Backend (.NET 9.0)

* **Controllers (GestaoAbrig os.API/Controllers)**

  * `AbrigosController.cs`: define rotas com `[ApiController]` e `[Route("api/[controller]")]`. Métodos:

    * `GET /api/abrigos` → `GetAll()`
    * `GET /api/abrigos/{id}` → `GetById(int id)`
    * `POST /api/abrigos` → `Create([FromBody] AbrigoDto dto)`
    * `PUT /api/abrigos/{id}` → `Update(int id, [FromBody] AbrigoDto dto)`
    * `DELETE /api/abrigos/{id}` → `Delete(int id)`
    * `GET /api/abrigos/status/{status}` → `GetByStatus(string status)`
  * Mapeamento Entidade ↔ DTO e geração de links HATEOAS via `LinkService`.
  * Sem rota `/api/abrigo` (singular); usa `/api/abrigos` (plural).

* **DTOs (GestaoAbrig os.API/DTOs)**

  * `AbrigoDto.cs`: inclui `Id`, `Nome`, `Endereco`, `Latitude`, `Longitude`, `CapacidadeTotal`, `Status`, `IEnumerable<EstoqueAbrigoDto> Estoques`, `List<LinkResource> Links`.
  * `EstoqueAbrigoDto.cs` e outros conforme necessidade.

* **Models (GestaoAbrig os.API/Models)**

  * `Abrigo.cs`, `Recurso.cs`, `EstoqueAbrigo.cs` com propriedades mapeando colunas do banco.
  * `LinkResource.cs`: para HATEOAS (Href, Rel, Method).

* **Services (GestaoAbrig os.Services)**

  * **Interfaces (IAbrigoService, IRecursoService)** definem métodos async como `GetAllAsync()`, `GetByIdAsync()`, `CreateAsync()`, `UpdateAsync()`, `DeleteAsync()`, `GetByStatusAsync()`.
  * **Implementações** consomem Repositories para CRUD no banco.

* **Infrastructure (GestaoAbrig os.Infrastructure)**

  * `GestaoAbrig osContext.cs` (DbContext do EF Core, com DbSets de Abrigos, Recursos, EstoqueAbrigo).
  * Classes de Repositório que implementam interfaces, executando consultas via EF.
  * Migrations geradas e pacotes do EF Core.

* **LinkService (GestaoAbrig os.Utils)**

  * Gera URLs HATEOAS para inclusão em DTOs (método `Generate(routeName, routeValues)`).

* **Program.cs / Startup**

  * Configura serviços, CORS (permitir origens do Emulador/Expo), Identity, DI de services e repositories, Serilog e middlewares.
  * `builder.WebHost.UseUrls("http://0.0.0.0:5108");` para permitir conexões externas.

---

## Observações Finais

* Caso **adicione mais telas** ou funcionalidades, siga o mesmo padrão de arquitetura e design (cores, organização de pastas, nomenclaturas). 
* Se estiver testando em **dispositivo físico**, lembre-se de trocar `localhost` por `http://<IP_DA_SUA_MAQUINA>` no `services/api.js`.
* Para **edição/exclusão de abrigos**, o backend já expôs as rotas `PUT /api/abrigos/{id}` e `DELETE /api/abrigos/{id}`. Você pode criar telas adicionais conforme necessidade.
* **Teste completo**: crie usuários, adicione abrigos, detalhes, recursos, edite e exclua para garantir que as requisições estão corretas.
* Caso enfrente **erros de rede**, verifique se o backend está realmente rodando em `http://localhost:5108` e que `Platform.OS === "android"` usa `http://10.0.2.2:5108`.

---

