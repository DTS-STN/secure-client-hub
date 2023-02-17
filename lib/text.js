// Converts text to Sentence Case in case
export const sentenceCase = (sentenceString) => {
  var rg = /(^\w{1}|\.\s*\w{1})/gi
  return sentenceString.replace(rg, function (toReplace) {
    return toReplace.toUpperCase()
  })
}
