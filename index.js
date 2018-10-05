#! /usr/bin/env node

var getnews = require('./reporter')
var editnews = require('./editor')

console.log(`
  ___________                  .__
  \\\__    ___/__________  _____ |__| ____   ______  _  ________
    |    |_/ __ \\\_  __ \\\/     \\\|  |/    \\\_/ __ \\\ \\\/ \\\/ /  ___/
    |    |\\\  ___/|  | \\\/  Y Y  \\\  |   |  \\\  ___/\\\     /\\\___ \\\\
    |____| \\\___  >__|  |__|_|  /__|___|  /\\\___  >\\\/\\\_//____  >`);

  console.log("\n\n       TERMINEWS - READ THE NEWS IN YOUR TERMINAL ");
  console.log("\n\n       To open a link in your browser hold command and click the link \n\n\n");

const startThePresses = () => {

  let numberOfArticles = findArticleFlag(process.argv)

  getnews.reporter().then((result) => {
    //getnews.reporter level
    editnews.editor(result).then((newspaper) => {
      //editnews.editor level

      const shuffle = (newspaper) => {

        var tmp, current, top = newspaper.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = newspaper[current];
          newspaper[current] = newspaper[top];
          newspaper[top] = tmp;
        }

        for(var z = 0; z < /*newspaper.length*/10; z++){
          var  title = ''
          var link = ''
          var titleLength = 0
          var linkLength = 0
          var dottedLineA = ' '//starts with one whitespace
          var dottedLineB = ' '//starts with one whitespace

          if(newspaper[z][0][0].indexOf('Comments') === -1){

            title = newspaper[z][0][0]
            link = 'https://www.nytimes.com'+newspaper[z][0][1]

            title.length > 100 ? title = title.substring(0, 100) + '...' : null

            titleLength = title.length
            for(var zz = 0; zz < titleLength+16; zz++){//+16 to account to Article, Link, and whitespace
              dottedLineA = dottedLineA + '-'
            }

            linkLength = link.length
            for(var zzz = 0; zzz < linkLength+16; zzz++){//+16 to account to Article, Link, and whitespace
              dottedLineB = dottedLineB + '-'
            }

            console.log("\n"+dottedLineA)
            console.log(" | Article: |  " + title + " | ")
            if(dottedLineA.length > dottedLineB.length){
              console.log(dottedLineA)
            }else{
              console.log(dottedLineB)
            }
            console.log(" |  Link:   |  " + link + " | ")
            console.log(dottedLineB)
          }

        }

      }
      shuffle(newspaper)

    })
    .catch((e) => {/*editnews.editor level error*/ console.log('2catch.e:',e)})
  })
  .catch((e) => {/*getnews.reporter level error*/ console.log('1catch.e:',e)})

}

const findArticleFlag = args => {
  let numberOfArticles = ''
  if (args[1].charAt(0) === '-') numberOfArticles = args[1].slice(1)
  if (args[2].charAt(0) === '-') numberOfArticles = args[2].slice(1)
  return numberOfArticles
}

startThePresses()
