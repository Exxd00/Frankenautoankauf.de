import imageCompression from 'browser-image-compression'

export interface CompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
  useWebWorker?: boolean
}

const defaultOptions: CompressionOptions = {
  maxSizeMB: 0.5, // Compress to max 500KB
  maxWidthOrHeight: 1920, // Max dimension
  useWebWorker: true,
}

/**
 * Compress a single image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const opts = { ...defaultOptions, ...options }

  try {
    // Skip if already small enough
    if (file.size <= (opts.maxSizeMB || 0.5) * 1024 * 1024) {
      console.log(`Image ${file.name} is already small enough (${(file.size / 1024).toFixed(1)}KB)`)
      return file
    }

    console.log(`Compressing ${file.name}: ${(file.size / 1024).toFixed(1)}KB`)

    const compressedFile = await imageCompression(file, {
      maxSizeMB: opts.maxSizeMB,
      maxWidthOrHeight: opts.maxWidthOrHeight,
      useWebWorker: opts.useWebWorker,
      fileType: 'image/jpeg', // Convert to JPEG for better compression
    })

    console.log(`Compressed ${file.name}: ${(compressedFile.size / 1024).toFixed(1)}KB`)

    // Return as a proper File object with original name
    return new File([compressedFile], file.name.replace(/\.[^/.]+$/, '.jpg'), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  } catch (error) {
    console.error(`Failed to compress ${file.name}:`, error)
    return file // Return original if compression fails
  }
}

/**
 * Compress multiple images in parallel
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = {},
  onProgress?: (current: number, total: number) => void
): Promise<File[]> {
  const compressedFiles: File[] = []

  for (let i = 0; i < files.length; i++) {
    const compressedFile = await compressImage(files[i], options)
    compressedFiles.push(compressedFile)
    onProgress?.(i + 1, files.length)
  }

  return compressedFiles
}

/**
 * Get total size of files in MB
 */
export function getTotalSizeMB(files: File[]): number {
  return files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)
}
