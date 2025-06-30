import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => Promise<{
        success: boolean
        content?: string
        filePath?: string
        error?: string
      }>
      saveFile: (content: string) => Promise<{
        success: boolean
        filePath?: string
        error?: string
      }>
    }
  }
}
