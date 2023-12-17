import axios from 'axios'

const client = axios.create({
  baseURL: 'https://twp.oxy-development.fr/wp-json/wp/v2',
  withCredentials: false,
  headers: {
    'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
  }
})
export default
  {
    getcategories() {
      return client.get('/categories')
    },
    getposts(id) {
      return client.get(`/posts?categories=${id}`)
    },
    getpost(id) {
      return client.get(`/posts/${id}`)
    },
    getcoms(id) {
      return client.get(`/comments?post=${id}`)
    },

    createCa(form) {
      return client.post(`/categories`, form)
    },
    createPo(form) {
      return client.post(`/posts`, form)
    },
    comment(id, form) {
      return client.post(`/comments?post=${id}`, form)
    },

    deletePo(id) {
      return client.delete(`/posts/${id}`)
    },
    deleteCo(id) {
      return client.delete(`/comments/${id}`)
    },
    deletepostcat(id) {
      return client.delete(`/posts?categories=${id}`)
    },
    deletecat(id) {
      return client.delete(`/categories/${id}?force=true`)
    },

    editPo(id, form) {
      return client.put(`/posts/${id}`, form)
    },

    editCo(id, form) {
      return client.put(`/comments/${id}`, form)
    },

    editCat(id, form) {
      return client.put(`/categories/${id}`, form)
    }
  }