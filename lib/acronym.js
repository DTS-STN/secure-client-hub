export const acronym = (longText) => {
  switch (longText.toLowerCase()) {
    case 'assurance emploi':
      return 'AE'
    case 'employment insurance':
      return 'EI'
    case 'canada pension plan':
      return 'CPP'
    case 'Régime de pensions du Canada':
      return 'RGPC'
    case 'Old Age Security and Guaranteed Income Supplement':
      return 'OASGIS'
    case 'sécurité de la vieillesse et supplément de revenu garanti':
      return 'SVSRG'
    default:
      return 'UND'
  }
}
