function $ajax(options){
  options = Object.assign({
    url: '',
    method: 'POST',
    data: null,
    headers: {},
  }, options)
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(options.method, options.url)
    
    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key])
    })

    xhr.onreadystatechange = function(){
      if(this.readyState !== 4) return
      if(!/^(2|3)\d{2}$/.test(this.status)) return reject(this.statusText)

      return resolve(JSON.parse(this.responseText))
    }
    xhr.send(options.data)
  })
}