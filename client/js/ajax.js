function $ajax(options){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    options = Object.assign({
      url: '',
      method: 'POST',
      data: null,
    }, options)

    xhr.onreadystatechange = function(){
      if(this.readyState !== 4) return
      if(!/^(2|3)\d{2}$/.test(this.status)) return reject(this.statusText)

      return resolve(JSON.parse(this.responseText))
    }
    xhr.open(options.url, options.method)
    xhr.send(options.data)
  })
}