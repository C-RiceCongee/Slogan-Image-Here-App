import { ipcMain } from 'electron'

import { UPLOAD } from '../../constant'
import { UploadHandler } from './exif'

ipcMain.on(UPLOAD, UploadHandler)
