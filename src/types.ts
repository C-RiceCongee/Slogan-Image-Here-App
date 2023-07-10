export interface EXIFRootObject {
  image: Image
  thumbnail: any
  exif: Exif
  gps: any
  interoperability: any
  makernote: any
  originSrc: string
  fileName: string
}

export interface Image {
  PhotometricInterpretation: number
  Make: string
  Model: string
  Orientation: number
  XResolution: number
  YResolution: number
  ResolutionUnit: number
  Software: string
  ModifyDate: string
  ExifOffset: number
}

export interface Exif {
  ExposureTime: number
  FNumber: number
  ExposureProgram: number
  ISO: number
  SensitivityType: number
  RecommendedExposureIndex: number
  DateTimeOriginal: string
  CreateDate: string
  ExposureCompensation: number
  MeteringMode: number
  LightSource: number
  Flash: number
  FocalLength: number
  SubSecTime: string
  SubSecTimeOriginal: string
  SubSecTimeDigitized: string
  ExifImageWidth: number
  ExifImageHeight: number
  SensingMethod: number
  FileSource: FileSource
  SceneType: SceneType
  CustomRendered: number
  ExposureMode: number
  WhiteBalance: number
  FocalLengthIn35mmFormat: number
  SceneCaptureType: number
  GainControl: number
  Contrast: number
  Saturation: number
  Sharpness: number
  SubjectDistanceRange: number
  SerialNumber: string
  LensInfo: number[]
  LensMake: string
  LensModel: string
  LensSerialNumber: string
}

export interface FileSource {
  type: string
  data: number[]
}

export interface SceneType {
  type: string
  data: number[]
}

export interface DB_Default {
  loginHistory: Array<string> // 登陆记录
  importHistory: Array<EXIFRootObject> // 导入记录
  exportHistory: Array<EXIFRootObject> // 导出记录
  draftList: Array<EXIFRootObject> // 草稿记录
  editingStack: Array<EXIFRootObject> // 当前修改的栈内存记录 用于撤销
  editStackIdx: number
}
