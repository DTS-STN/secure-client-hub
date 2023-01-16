export function buildLink(linkType, link) {
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
