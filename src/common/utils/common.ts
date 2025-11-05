export function FullName(u?: {
  firstName?: string;
  lastName?: string;
  fullName?: string;
}) {
  if (u?.fullName) {
    return u.fullName;
  }
  const fn = RemoveSpace(u?.firstName);
  const ln = RemoveSpace(u?.lastName);
  return [fn, ln].join(' ');
}

export const RemoveSpace = (str?: string) =>
  (str || '')
    .split(' ')
    .map(m => m.trim())
    .filter(Boolean)
    .join(' ');

export function removeTypeNameFromformData(data:any){
  const newData = { ...data };
  if (newData?.__typename) {
    delete newData.__typename;
  }
  return newData;

}