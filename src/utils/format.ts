
export const spacesToDashes = (s : string) : string => {
  let res = ''
  for(let i=0;i<s.length;i++) res+=(s[i]==' ' ? '-' : s[i]);
  return res
}