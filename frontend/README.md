Frontend DOM v2 (React Native Web + TypeScript)

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Iniciar ambiente (Web)

```powershell
# Diretório: C:\dom-v2\frontend
npm install
npm run dev
```

## Integração com Backend (dev)

- Endpoints usados:
  - `GET http://localhost:3001/api/budgets`
  - `POST http://localhost:3001/api/budgets`
  - `GET http://localhost:3001/api/payments`
  - `POST http://localhost:3001/api/payments`
  - `GET http://localhost:3001/api/timeclock`
  - `POST http://localhost:3001/api/timeclock`
  - `GET http://localhost:3001/api/employees`
  - `POST http://localhost:3001/api/employees`
  - `PUT http://localhost:3001/api/employees/:id`
  - `DELETE http://localhost:3001/api/employees/:id`

Certifique-se de rodar o backend:

```powershell
# Diretório: C:\dom-v2\backend
npm install
npm run dev
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Como acessar Finanças

- Faça login no app.
- No dashboard, clique em “Financeiro” para ver listas de Orçamentos e Pagamentos.
- Use “+ Novo” para criar registros de exemplo (ambiente dev).

Now that you have successfully run the app, let's make changes!
## Como usar Ponto (Time Clock)

- Faça login no app.
- No dashboard, clique em “Ponto”.
- Use os botões para bater ponto (entrada/saída) e veja o histórico listado.

## Como usar Funcionários

- Faça login no app.
- No dashboard, clique em “Funcionários”.
- Veja a lista de funcionários.
- Use o formulário na parte inferior para adicionar um novo.
- Clique em “Editar” para carregar os dados no formulário, altere e “Salvar”.
- Clique em “Excluir” para remover um registro.

Observação: ao criar um funcionário, o backend dev associa o registro ao usuário logado (via `cpf`) quando disponível.

### RBAC (perfis e permissões)

- Perfis com gestão (admin, employer):
  - Podem criar/editar/excluir em Funcionários.
  - Podem criar novos registros em Orçamentos e Pagamentos.
- Perfis sem gestão (employee, family):
  - Visualização apenas (sem botões de criação/edição/exclusão).

### Dicas de UX

- Campo de salário aceita formatos PT-BR (ex.: `1.234,56`). O valor é sanitizado e validado antes do envio.


Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

## Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
