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

- Please try to move state to child components as much as possible and avoid global state.
- The Context API is currently used for state management.
- Always create pull request for main branch