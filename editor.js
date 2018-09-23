let cheerio = require('cheerio')

function editor(stories) {
  return new Promise(function(resolve, reject) {
    let editingRoom = []
    let $ = cheerio.load(stories)

    try{
      $('a').each(function(i, elem) {
          var current = $(this).text()
          var link = $(this).attr('href')
          current = current.replace(/  /g, '')
          current = current.replace(/(\r\n|\n|\r)/gm, "")

          if(link.indexOf('2018') > -1 && (current.length > 2)){
              var display = [current, link]
              editingRoom.push([display])
          }
          resolve(editingRoom)
      })
    }catch(e){
        reject('error',e)
    }

  })

}

module.exports = {
  editor:editor,
}
