export const programs = (acronym: string) => {
  switch (acronym.toLowerCase()) {
    case 'ei':
      return 'Employment Insurance'
    case 'oas':
      return 'Old Age Security'
    case 'cpp':
      return 'Canada Pension Plan'
    default:
      return 'UND'
  }
}
