import { Api } from './GeneratedApi'

export function useApi() {
  const api = new Api({
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  })

  return api
}
