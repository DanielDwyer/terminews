const findArticleFlag = args => {
  let flag;
  if (args[1] && args[1].charAt(0) === '-') flag = args[1].slice(1)
  else if (args[2] && args[2].charAt(0) === '-') flag = args[2].slice(1)
  // make sure arg is a number and limit to max 20 articles
  let numberOfArticles = new Number(flag);
  if (!numberOfArticles || numberOfArticles == 0 || isNaN(numberOfArticles) || numberOfArticles > 20) numberOfArticles = 20
  return numberOfArticles
}

module.exports = {
  findArticleFlag
}