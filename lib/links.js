//build links is used to prepend links with their corresponding environment. ie MSCA with their test vs prod environment
export function buildLink(linkType, link) {
  //-start- Handle links that need to changed for User Testing.
  //This code was added January 20th, 2023 and can be removed after UT is completed
  const swappedLink = swapUserTestingLink(link)
  if (swappedLink) {
    return swappedLink
  }
  //-end- Handle links that need to changed for User Testing.

  //If no type assume full or relative link
  if (linkType === undefined) {
    return link
  } else if (linkType === 'msca-base-url') {
    return process.env.MSCA_BASE_URL + link
  } else if (linkType === 'msca-eq') {
    return process.env.MSCA_EQ_BASE_URL + link
  } else if (linkType === 'ecas-rasc') {
    return process.env.MSCA_ECAS_RASC_BASE_URL + link
  }
  //Fall back on link if unknown type
  else {
    return link
  }
}
