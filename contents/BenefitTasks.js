import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export const BenefitTasks_EN = {
  // general tasks
  UpdateProfileTask: {
    task: 'Update my profile',
    icon: solid('circle-user'),
    link: '/profile',
  },
  TaxSlipTask: {
    task: 'View my tax slips',
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  TaxSlipMailingTask: {
    task: 'Update my tax slip delivery options',
    icon: solid('envelope-open-text'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/mailing-option',
  },
  // oas cpp tasks
  AllPaymentsTask: {
    task: 'View past payments',
    icon: solid('dollar-sign'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-payment-information.action',
  },
  StatusUpdateTask: {
    task: 'View my status and messages',
    icon: solid('question'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vmas-vemd/view-application-status.action',
  },
  RetirementIncomeTask: {
    task: 'Estimate my retirement income',
    icon: solid('calculator'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/socv-vecc/socv/estimated-benefits',
  },
  ReconsiderationTask: {
    task: 'Reconsider my application',
    icon: solid('comments'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/reqr-demr/',
  },
  DelayOasPensionTask: {
    task: 'Delay receiving Old Age Security',
    icon: solid('clock-rotate-left'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/delay-oas-pension.action',
  },
  CppContributionTask: {
    task: 'View my contributions',
    icon: solid('hand-holding-dollar'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/socv-vecc/socv/earnings-contributions',
  },
  TaxDeductionsTask: {
    task: 'Change my tax slip delivery options',
    icon: solid('envelope-open-text'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-tax-deduction.action',
  },
  GiveConsentTask: {
    task: 'Give consent for someone to communicate on my behalf',
    icon: solid('user-check'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-consent-to-communicate.action',
  },
  TaxSlipT4aAndNr4Task: {
    task: 'View tax slips, T4A and NR4',
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  UploadMyDocuments: {
    task: 'Upload my documents',
    icon: solid('file-import'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/cppd-rpci/doc-upload',
  },
  ApplyForCppDisabilityBenefits: {
    task: 'Apply for Canada Pension Plan Disability Benefits',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForCppRetirementPensions: {
    task: 'Apply for Canada Pension Plan Retirement Pensions',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  EstimateMyMonthlyCppBenefits: {
    task: 'Estimate my monthly CPP Benefits',
    icon: solid('calculator'),
    link: '/dashboard',
  },
  ViewMyCppContributions: {
    task: 'View my CPP Contributions',
    icon: solid('hand-holding-dollar'),
    link: '/dashboard',
  },
  ApplyForCppDeathBenefits: {
    task: 'Apply for Canada Pension Plan Death Benefits',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForGuranteedIncomeSupplement: {
    task: 'Apply For Guranteed Income Supplement',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForCppSurvivorsPensionAndChildrensBenefit: {
    task: "Apply For Canada Pension Plan Survivor's Pension and Child(ren)'s Benefit",
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForOldAgeSecurity: {
    task: 'Apply For Old Age Security',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  RequestAReview: {
    task: 'Request a review of a decision',
    icon: solid('comments'),
    link: '/dashboard',
  },
  // ei tasks
  EiStatusUpdateTask: {
    task: 'View my status updates',
    icon: solid('list-check'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/ei-correspondence',
  },
  CompleteInsuranceReportTask: {
    task: 'Complete my report',
    icon: solid('pen-to-square'),
    link: 'https://www.canada.ca/en/services/benefits/ei/employment-insurance-reporting.html#Internet-Reporting-Service',
  },
  ViewPaymentInfo: {
    task: 'View my payments',
    icon: solid('file-invoice-dollar'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPayments.aspx?prov=6',
  },
  ApplyEI: {
    task: 'Apply for Employment Insurance',
    icon: solid('stamp'),
    link: '/',
  },
  AccessCode: {
    task: 'Get my access code',
    icon: solid('key'),
    link: '/dashboard',
  },
  SubmitDocuments: {
    task: 'Submit documents',
    icon: solid('file-import'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/ei-doc-upload-instruction',
  },
  ViewDocuments: {
    task: 'View my documents',
    icon: solid('folder-open'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
  ViewLetters: {
    task: 'View my letters',
    icon: solid('envelopes-bulk'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
  ViewLatestClaimTask: {
    task: 'View my latest claim',
    icon: solid('file-signature'),
    link: '/',
  },
  ViewPastClaimsTask: {
    task: 'View my past claims',
    icon: solid('suitcase'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPastClaims.aspx?prov=6',
  },
  SubmitEformsTask: {
    task: 'Submit eForms',
    icon: solid('laptop-file'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/256',
  },
  RegisterForAlerts: {
    task: 'Manage email notifications (Alert me)',
    icon: solid('bell'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/alert-me/confirm?action=confirm&return=ei-landing',
  },
  RecordOfEmployment: {
    task: 'View my Records of Employment',
    icon: solid('file-contract'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyRoeList.aspx?prov=6',
  },
  ReportMistake: {
    task: 'Report a mistake',
    icon: solid('file-circle-exclamation'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyMessages.aspx?mt=3&prov=6',
  },
  TaxSlipT4eTask: {
    task: 'View tax slips, T4E',
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  ViewPaymentInfoIconWhite: {
    task: 'View my past payments',
    icon: solid('dollar-sign'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPayments.aspx?prov=6',
  },
  //Seb tasks
  ViewAgreementStatus: {
    task: 'View my agreement status (self-employed)',
    icon: solid('person-walking-luggage'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
}

export const BenefitTasks_FR = {
  // general tasks
  UpdateProfileTask: {
    task: 'Mettre à jour mon profil',
    icon: solid('circle-user'),
    link: '/fr/profile',
  },
  TaxSlipTask: {
    task: "Consulter mes feuillets d'impôts",
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  TaxSlipMailingTask: {
    task: "Options d’expédition des feuillets d'impôt",
    icon: solid('envelope-open-text'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/mailing-option',
  },
  // oas cpp tasks
  AllPaymentsTask: {
    task: 'Consulter mes paiements',
    icon: solid('dollar-sign'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-payment-information.action',
  },
  StatusUpdateTask: {
    task: '(FR)View my status and messages',
    icon: solid('question'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vmas-vemd/view-application-status.action',
  },
  RetirementIncomeTask: {
    task: 'Estimer mon revenue de retraite',
    icon: solid('calculator'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/socv-vecc/socv/estimated-benefits',
  },
  ReconsiderationTask: {
    task: 'Faire une demande de révision',
    icon: solid('comments'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/reqr-demr/',
  },
  DelayOasPensionTask: {
    task: 'Reporter le début de ma pension',
    icon: solid('clock-rotate-left'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/delay-oas-pension.action',
  },
  CppContributionTask: {
    task: 'Consulter mes cotisations',
    icon: solid('hand-holding-dollar'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/socv-vecc/socv/earnings-contributions',
  },
  TaxDeductionsTask: {
    task: "Modifier mes options d’expédition des feuillets d'impôt",
    icon: solid('envelope-open-text'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-tax-deduction.action',
  },
  GiveConsentTask: {
    task: 'Autoriser une personne à communiquer en mon nom',
    icon: solid('user-check'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/vupi-vupi/view-consent-to-communicate.action',
  },
  TaxSlipT4aAndNr4Task: {
    task: '(FR)View tax slips, T4A and NR4',
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  UploadMyDocuments: {
    task: '(FR)Upload my documents',
    icon: solid('file-import'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/cppd-rpci/doc-upload',
  },
  ApplyForCppDisabilityBenefits: {
    task: '(FR)Apply for Canada Pension Plan Disability Benefits',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForCppRetirementPensions: {
    task: '(FR)Apply for Canada Pension Plan Retirement Pensions',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  EstimateMyMonthlyCppBenefits: {
    task: '(FR)Estimate my monthly CPP Benefits',
    icon: solid('calculator'),
    link: '/dashboard',
  },
  ViewMyCppContributions: {
    task: '(FR)View my CPP Contributions',
    icon: solid('hand-holding-dollar'),
    link: '/dashboard',
  },
  ApplyForCppDeathBenefits: {
    task: '(FR)Apply for Canada Pension Plan Death Benefits',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForGuranteedIncomeSupplement: {
    task: '(FR)Apply For Guranteed Income Supplement',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForCppSurvivorsPensionAndChildrensBenefit: {
    task: "(FR)Apply For Canada Pension Plan Survivor's Pension and Child(ren)'s Benefit",
    icon: solid('stamp'),
    link: '/dashboard',
  },
  ApplyForOldAgeSecurity: {
    task: '(FR)Apply For Old Age Security',
    icon: solid('stamp'),
    link: '/dashboard',
  },
  RequestAReview: {
    task: '(FR)Request a review of a decision',
    icon: solid('comments'),
    link: '/dashboard',
  },
  // ei tasks
  EiStatusUpdateTask: {
    task: '(FR)View my status updates',
    icon: solid('list-check'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/ei-correspondence',
  },
  CompleteInsuranceReportTask: {
    task: "Soumettre une déclarations de l'assurance-emploi",
    icon: solid('pen-to-square'),
    link: 'https://www.canada.ca/en/services/benefits/ei/employment-insurance-reporting.html#Internet-Reporting-Service',
  },
  ViewPaymentInfo: {
    task: 'Consulter mes paiements',
    icon: solid('file-invoice-dollar'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPayments.aspx?prov=6',
  },
  ApplyEI: {
    task: 'Présenter une demande d’assurance-emploi',
    icon: solid('stamp'),
    link: '/',
  },
  AccessCode: {
    task: "Consulter mon code d'accès",
    icon: solid('key'),
    link: '/dashboard',
  },
  SubmitDocuments: {
    task: 'Soumettre des documents',
    icon: solid('file-import'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/ei-doc-upload-instruction',
  },
  ViewDocuments: {
    task: 'Consulter mes documents',
    icon: solid('folder-open'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
  ViewLetters: {
    task: 'Consulter mes lettres',
    icon: solid('envelopes-bulk'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
  ViewLatestClaimTask: {
    task: 'Consulter ma dernière demande',
    icon: solid('file-signature'),
    link: '/',
  },
  ViewPastClaimsTask: {
    task: 'Consulter mes demandes antérieures',
    icon: solid('suitcase'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPastClaims.aspx?prov=6',
  },
  SubmitEformsTask: {
    task: 'Soumettre des formulaires électroniques',
    icon: solid('laptop-file'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/256',
  },
  RegisterForAlerts: {
    task: 'Gérer mes avis par courriel (Alertez-moi)',
    icon: solid('bell'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil/alert-me/confirm?action=confirm&return=ei-landing',
  },
  RecordOfEmployment: {
    task: 'Consulter mes relevés d’emploi',
    icon: solid('file-contract'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyRoeList.aspx?prov=6',
  },
  ReportMistake: {
    task: 'Communiquer une erreur',
    icon: solid('file-circle-exclamation'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyMessages.aspx?mt=3&prov=6',
  },
  TaxSlipT4eTask: {
    task: '(FR)View tax slips, T4E',
    icon: solid('receipt'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/tiso-frfd/tax-slip',
  },
  ViewPaymentInfoIconWhite: {
    task: 'Consulter mes paiements',
    icon: solid('dollar-sign'),
    link: 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/ei-ae/meiio-mraed/Pages/MyPayments.aspx?prov=6',
  },
  //Seb tasks
  ViewAgreementStatus: {
    task: "Consulter l'état de mon entente (travailleurs autonomes)",
    icon: solid('person-walking-luggage'),
    link: 'https://srv136.services.gc.ca/msca-mdsc/eq-qe/proxy/index/321',
  },
}
