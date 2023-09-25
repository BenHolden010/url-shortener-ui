export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}
export const postUrls = (urlObj) => {
  return fetch('http://localhost:3001/api/v1/urls',{
    method: "POST",
    body: JSON.stringify(urlObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
  })
      .then(response => response.json())
}

export const deleteUrls = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`, {
    method: "DELETE"
  })
}
