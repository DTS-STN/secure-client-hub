// These acronyms are used to convert benefit categories into acronyms for AA.
export const acronym = (longText) => {
  switch (longText.toLowerCase()) {
    case 'assurance emploi':
      return 'AE'
    case 'assurance-emploi':
      return 'AE'
    case 'employment insurance':
      return 'EI'
    case 'canada pension plan':
      return 'CPP'
    case 'régime de pensions du canada':
      return 'RGPC'
    case 'old age security and guaranteed income supplement':
      return 'OASGIS'
    case 'old age security':
      return 'OASGIS'
    case 'sécurité de la vieillesse et supplément de revenu garanti':
      return 'SVSRG'
    case 'sécurité de la vieillesse':
      return 'SVSRG'
    default:
      return 'UND'
  }
}
