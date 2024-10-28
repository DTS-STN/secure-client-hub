// These acronyms are used to convert benefit categories into acronyms for AA.
// For logistical reasons, acronyms should only be returned in English, regardless of language.

export const acronym = (longText) => {
  switch (longText.toLowerCase()) {
    case 'assurance emploi':
      return 'EI'
    case 'assurance-emploi':
      return 'EI'
    case 'employment insurance':
      return 'EI'
    case 'canada pension plan':
      return 'CPP'
    case 'régime de pensions du canada':
      return 'CPP'
    case 'old age security and guaranteed income supplement':
      return 'OASGIS'
    case 'old age security':
      return 'OASGIS'
    case 'sécurité de la vieillesse et supplément de revenu garanti':
      return 'OASGIS'
    case 'sécurité de la vieillesse':
      return 'OASGIS'
    case 'social insurance number':
      return 'SINOM'
    case 'numéro d’assurance sociale':
      return 'SINOM'
    case 'canada apprentice loan':
      return 'CALSC'
    case 'prêt canadien aux apprentis':
      return 'CALSC'
    case 'canadian dental care plan':
      return 'CDCP'
    case 'régime canadien de soins dentaires':
      return 'CDCP'
    default:
      return 'UND'
  }
}
