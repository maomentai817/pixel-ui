export type AlertType = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  title?: string
  type?: AlertType
  description?: string
  effect?: 'light' | 'dark'
  closable?: boolean
  center?: boolean
  showIcon?: boolean
}

export interface AlertEmits {
  (_e: 'close'): void
}

export interface AlertInstance {
  open: () => void
  close: () => void
}
