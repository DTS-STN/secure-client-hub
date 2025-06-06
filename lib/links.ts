//build links is used to prepend links with their corresponding environment. ie MSCA with their test vs prod environment
export function buildLink(linkType: string | undefined, link: string) {
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

export function buildAemUri(endpointName: string) {
  if (process.env.AEM_GRAPHQL_FOLDER !== undefined) {
    return (
      process.env.AEM_GRAPHQL_ENDPOINT +
      endpointName +
      '%3BfolderName=' +
      encodeURIComponent(process.env.AEM_GRAPHQL_FOLDER)
    )
  }
  return process.env.AEM_GRAPHQL_ENDPOINT + endpointName
}
