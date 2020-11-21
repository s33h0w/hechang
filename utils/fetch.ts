export default function fetchApi(api: string, init?: RequestInit) {
  const url = window.origin + '/api/' + api
  return fetch(url, init)
}
