import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticatedNoLayout/Sample')({
  component: () => <div>Hello /_authenticatedNoLayout/Sample!</div>,
})
