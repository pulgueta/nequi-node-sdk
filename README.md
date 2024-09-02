# @pulgueta/nequi-node

SDK de la comunidad de Nequi para Node.js

## Características

- Soporte para Node.js
- Soporte para TypeScript
- Fácil de usar

## Instalación

```sh
pnpm add @pulgueta/nequi-node

npm install @pulgueta/nequi-node

yarn add @pulgueta/nequi-node
```

## Uso

```ts
import { Nequi } from "@pulgueta/nequi-node";

const nequi = new Nequi({
  apiKey: "your-api-key",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  // env: "development" | "production" basado en process.env.NODE_ENV
});
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, lee el [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.
