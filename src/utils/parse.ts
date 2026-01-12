const imageRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif|webp))/gi

export const parseImageFromText = (text: string): { content: string; images: string[] } => {
  const images = text.match(imageRegex) ?? []
  const content = text.replace(imageRegex, "").trim()

  return {
    content,
    images,
  }
}
