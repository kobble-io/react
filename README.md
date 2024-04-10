![Add authentication and monetization to your React application in minutes using Kobble](https://github.com/kobble-io/react/blob/main/.readme/banner.png?raw=true)

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/:status-stable-green.svg?style=flat)


This package helps you add authentication to your React Application with Kobble Auth SDK in a few minutes.

It's secure by design (using PKCE flow) and easy to use.

## Getting Started

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```sh
npm install @kobbleio/react
```

### Configure Kobble

Create an **Application** in your [Kobble Dashboard](https://app.kobble.io/p/applications).

Make sure your application can handle your localhost callback URL (see section below).

Note the **Client ID** and your **Portal Domain** values.

Visit our **[Quick Start Guide](https://docs.kobble.io/learning/quickstart/setup)** to learn more.

### Usage

Kobble requires your app to be wrapped in a `KobbleProvider` component. This component should be at the root of your application.

```tsx
import ReactDOM from 'react-dom/client';
import { KobbleProvider, SignedIn, SignedOut } from "@kobbleio/react";

render(
  <KobbleProvider
    domain={import.meta.env.VITE_KOBBLE_DOMAIN!}
    clientId={import.meta.env.VITE_KOBBLE_CLIENT_ID!}
    redirectUri={import.meta.env.VITE_KOBBLE_REDIRECT_URI!}
  >
    <App />
  </KobbleProvider>,
  document.getElementById('root'),
);

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <SignedIn>
        <p>This is only visible for signed in users.</p>
      </SignedIn>
      
      <SignedOut>
        <p>This is only visible for unauthenticated users.</p>
      </SignedOut>
    </>
  );
}
```

### Utility Components

The package provides various utility components to help you manage the user's authentication status.

- `<SignedIn />`: Only shows its children if the user is signed in.
- `<SignedOut />`: Only shows its children if the user is signed out.
- `<LoginButton />`: A button that triggers the login flow. I can be customized by passing a child prop.
- `<LogoutButton />`: A button that triggers the logout flow. I can be customized by passing a child prop.
- `<HandleCallback />`: A component that handles the authentication callback for the PKCE flow.

### Utility Hooks

The package provides some hooks to access the user's authentication status and Kobble Client.

- `useAuth()`: Returns the user's authentication status and the Kobble Client.
- `useAuthStateChanged(callback)`: Calls the callback function when the user's authentication status changes.
- `useKobble()`: Returns the Kobble Client instance (which uses [Kobble SPA SDK](https://npmjs.com/package/@kobbleio/auth-spa-js)).


#### Examples

```tsx 
import { LoginButton, LogoutButton } from "@kobbleio/react";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <>
      <SignedIn>
        <h1>Hello {user.name}</h1>
        <LogoutButton />
      </SignedIn>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  )
}
```

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/kobble-io/react/issues).

___

## What is Kobble?

<p align="center">
  <picture>
    <img alt="Kobble Logo" src="https://github.com/kobble-io/react/blob/main/.readme/logo.png?raw=true" width="150">
  </picture>
</p>
<p align="center">
 Kobble is the one-stop solution for monetizing modern SaaS and APIs. It allows to add authentication, analytics and payment to any app in under 10 minutes.
</p>