import dayjs from "dayjs"

export const spacesToDashes = (s: string): string => {
  let res = ""
  for (let i = 0; i < s.length; i++) res += s[i] == " " ? "-" : s[i]
  return res
}

export const timestampToDate = (timestamp: number): string => {
  return dayjs(timestamp).format("DD/MM/YYYY - HH:mm")
}

export const textToHtml = (text: string) => {
  return text.replace(
    /(https?:\/\/\S+\.(png|jpe?g|gif|webp))/gi,
    url => `<img src="${url}" alt="" />`
  ).replace(
    /(https?:\/\/[^\s]+)/gi,
    url => `<a href="${url}">${url}</a>`
  );
}
