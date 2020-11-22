export default async function fetchApi<T>(
  api: string,
  init?: RequestInit
): Promise<T> {
  const url = window.origin + '/api/' + api
  return fetch(url, init).then((res) => res.json())
}
