export function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      if (Number(data.cod) < 300) {
        return {...data, error: false} as TResponse & { error: boolean}
      }
      throw data
    })
    .catch(err => {
      console.log("network error", err)
      return {...err, error: true}
    })
}