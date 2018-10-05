const findArticleFlag = args => {
  let flag;
  if (args[1] && args[1].charAt(0) === '-') flag = args[1].slice(1)
  else if (args[2] && args[2].charAt(0) === '-') flag = args[2].slice(1);
  // make sure arg is a number and limit to max 10 articles
  let numberOfArticles = new Number(flag);
  if (numberOfArticles == 0 || isNaN(numberOfArticles) || numberOfArticles > 10) numberOfArticles = 10
  return numberOfArticles
}

module.exports = {
    findArticleFlag
}