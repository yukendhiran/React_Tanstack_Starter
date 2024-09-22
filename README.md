# Project Configuration

=====================================

### Important: Read This Before Working on the Project

To ensure a better understanding of the project's configuration, please take a moment to read this section.

#### Development Environment

---

This project uses DevBox, although Node.js is the only requirement. While it's not mandatory to use DevBox, it's recommended if you need to manage system-wide packages or npm packages with the `-g` flag. This ensures that everyone has the same development environment, regardless of their operating system (BSD, Mac, Linux, Windows). Additionally, DevBox makes it easy to build Docker images if required.

- DevBox: https://github.com/jetify-com/devbox
- Package Search: https://www.nixhub.io/
- License: Apache License Version 2.0

#### Project Configuration

---

The project uses the following technologies:

- Vite + React + TypeScript + SWC: https://vitejs.dev/
- TanStack Router and Query: https://tanstack.com/
  - Reason: File-based router with better TypeScript support. TanStack Query makes it easy to manage fetching.
- ShadCN: While not a traditional component library, ShadCN provides easy-to-include reusable component code in your project. If you add a component from ShadCN, you can access the code under `components/ui`, giving you control and flexibility.
  - ShadCN: https://ui.shadcn.com/docs
  - ShadCN Expansion: https://shadcnui-expansions.typeart.cc/
- Tailwind CSS with Tailwind Prettier plugin for automatic class sorting

- React Hook Form: https://react-hook-form.com/
- Iconify : https://iconify.design/

- License: MIT License

---

This project is configured to use Jotai, Zustand, and the Context API for state management. You can find the relevant files under the following locations:

- `src/store/auth.tsx` (Context API)
- `src/store/authAtom.ts` (Jotai)
- `src/store/authStore.tsx` (Zustand)

Currently, the login functionality utilizes Zustand. Note that Jotai also provides similar functionality. For an example of using the Context API, you can refer to the authenticated routes example in Tanstack Router."
