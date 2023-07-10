import { dialog } from 'electron'
import { ParseExifInfo } from '../logic/exif'

export async function UploadHandler(_event) {
  const res = await dialog.showOpenDialog({
    title: '选择素材',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg'] }]
  })
  if (res.canceled) {
    _event.returnValue = false
    return
  }
  const pa = res.filePaths.map((v) => {
    return ParseExifInfo(v)
  })
  try {
    const ExifInfoArrRes = await Promise.all(pa)

    _event.returnValue = ExifInfoArrRes
  } catch (e) {
    _event.returnValue = false
  }
  // returnValue必须要写～ 否则渲染层会阻塞
  // _event.returnValue = false
}
