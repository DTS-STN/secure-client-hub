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

//swapUserTestingLink handles links that need to be swapped for User testing.
//This function was addded January 20th 2023 and can be romved after UT is completed
function swapUserTestingLink(link) {
  if (process.env.SWAP_USER_TESTING_LINKS?.toLowerCase() === 'true') {
    const swapLink = swapLinksList.find(
      (element) => element.originalLink === link
    )
    return swapLink?.swappedLink
  }
}

const swapLinksList = [
  {
    originalLink:
      '/sc/msca-mdsc/portal-portail/pro/home-accueil/ei-doc-upload-instruction?lang=eng',
    swappedLink: '/beta/documents',
  },
]
