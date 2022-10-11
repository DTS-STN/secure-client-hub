import { ProgramCodes } from '../contents/ProgramCodes'

import { BenefitTasks_EN, BenefitTasks_FR } from './BenefitTasks'

// Employment Insurance

// EN
const EI_REQ_TASKS_EN = {
  header: 'Most Requested',
  tasks: [BenefitTasks_EN.StatusUpdateTask, BenefitTasks_EN.ViewPaymentInfo],
}

const EI_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [BenefitTasks_EN.StatusUpdateTask, BenefitTasks_EN.ApplyEI],
}

const EI_PAYMENT_CLAIM_TASKS_EN = {
  header: 'Payments and claims',
  tasks: [
    BenefitTasks_EN.ViewPaymentInfo,
    BenefitTasks_EN.ViewLatestClaimTask,
    BenefitTasks_EN.ViewPastClaimsTask,
  ],
}

const EI_TAXES_TASKS_EN = {
  header: 'Taxes',
  tasks: [BenefitTasks_EN.TaxSlipTask, BenefitTasks_EN.TaxDeductionsTask],
}

const EI_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_EN.UpdateProfileTask,
    BenefitTasks_EN.RegisterForAlerts,
    BenefitTasks_EN.AccessCode,
    BenefitTasks_EN.ViewAgreementStatus,
  ],
}

const EI_DOCS_TASKS_EN = {
  header: 'Reports and documents',
  tasks: [
    BenefitTasks_EN.CompleteInsuranceReportTask,
    BenefitTasks_EN.RecordOfEmployment,
    BenefitTasks_EN.ViewDocuments,
    BenefitTasks_EN.ViewLetters,
    BenefitTasks_EN.SubmitDocuments,
    BenefitTasks_EN.SubmitEformsTask,
    BenefitTasks_EN.ReportMistake,
  ],
}

// FR
const EI_REQ_TASKS_FR = {
  header: 'Demandes de prestations',
  tasks: [BenefitTasks_FR.StatusUpdateTask, BenefitTasks_FR.ViewPaymentInfo],
}

const EI_APPLICATIONS_TASKS_FR = {
  header: 'Applications',
  tasks: [BenefitTasks_FR.StatusUpdateTask, BenefitTasks_FR.ApplyEI],
}

const EI_PAYMENT_CLAIM_TASKS_FR = {
  header: 'Paiements et demandes',
  tasks: [
    BenefitTasks_FR.ViewPaymentInfo,
    BenefitTasks_FR.ViewLatestClaimTask,
    BenefitTasks_FR.ViewPastClaimsTask,
  ],
}

const EI_TAXES_TASKS_FR = {
  header: 'Impôt',
  tasks: [BenefitTasks_FR.TaxSlipTask, BenefitTasks_FR.TaxDeductionsTask],
}

const EI_DOCS_TASKS_FR = {
  header: 'Rapports et documents',
  tasks: [
    BenefitTasks_FR.CompleteInsuranceReportTask,
    BenefitTasks_FR.RecordOfEmployment,
    BenefitTasks_FR.ViewDocuments,
    BenefitTasks_FR.ViewLetters,
    BenefitTasks_FR.SubmitDocuments,
    BenefitTasks_FR.SubmitEformsTask,
    BenefitTasks_FR.ReportMistake,
  ],
}

const EI_PERSONAL_TASKS_FR = {
  header: 'Renseignements personnels',
  tasks: [
    BenefitTasks_FR.UpdateProfileTask,
    BenefitTasks_FR.RegisterForAlerts,
    BenefitTasks_FR.AccessCode,
    BenefitTasks_FR.ViewAgreementStatus,
  ],
}

// CPP

// EN
const CPP_REQ_TASKS_EN = {
  header: 'Most Requested',
  tasks: [BenefitTasks_EN.StatusUpdateTask, BenefitTasks_EN.ViewPaymentInfo],
}

const CPP_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [
    BenefitTasks_EN.StatusUpdateTask,
    BenefitTasks_EN.ApplyForCpp,
    BenefitTasks_EN.ApplyForCppDisabilityBenefits,
    BenefitTasks_EN.ApplyForCppDeathBenefits,
    BenefitTasks_EN.ApplyForCppSurvivorsPensionAndChildrensBenefit,
    BenefitTasks_EN.ApplyForCppChildBenefit,
  ],
}

const CPP_PAYMENT_TASKS_EN = {
  header: 'Payments',
  tasks: [
    BenefitTasks_EN.ViewPaymentInfo,
    BenefitTasks_EN.CppContributionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.RequestAReview,
  ],
}

const CPP_TAXES_TASKS_EN = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_EN.TaxSlipTask,
    BenefitTasks_EN.TaxDeductionsTask,
    BenefitTasks_EN.TaxDeliveryOptionsTask,
  ],
}

const CPP_DOCS_TASKS_EN = {
  header: 'Documents',
  tasks: [
    BenefitTasks_EN.SubmitCPPDDocuments,
    BenefitTasks_EN.SubmitScholarDeclaration,
  ],
}

const CPP_PROVISIONS_TASKS_EN = {
  header: 'Provisions',
  tasks: [
    BenefitTasks_EN.RequestChildProvision,
    BenefitTasks_EN.ViewChildProvision,
    BenefitTasks_EN.ApplyForCppCreditSplit,
    BenefitTasks_EN.ApplyForCppSharing,
  ],
}

const CPP_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [BenefitTasks_EN.UpdateProfileTask, BenefitTasks_EN.GiveConsentTask],
}

// FR
const CPP_REQ_TASKS_FR = {
  header: 'Demandes de prestations',
  tasks: [BenefitTasks_FR.StatusUpdateTask, BenefitTasks_FR.ViewPaymentInfo],
}

const CPP_APPLICATIONS_TASKS_FR = {
  header: 'Applications',
  tasks: [
    BenefitTasks_FR.StatusUpdateTask,
    BenefitTasks_FR.ApplyForCpp,
    BenefitTasks_FR.ApplyForCppDisabilityBenefits,
    BenefitTasks_FR.ApplyForCppDeathBenefits,
    BenefitTasks_FR.ApplyForCppSurvivorsPensionAndChildrensBenefit,
    BenefitTasks_FR.ApplyForCppChildBenefit,
  ],
}

const CPP_PAYMENT_TASKS_FR = {
  header: 'Paiements',
  tasks: [
    BenefitTasks_FR.ViewPaymentInfo,
    BenefitTasks_FR.CppContributionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.RequestAReview,
  ],
}

const CPP_TAXES_TASKS_FR = {
  header: 'Impôts',
  tasks: [
    BenefitTasks_FR.TaxSlipTask,
    BenefitTasks_FR.TaxDeductionsTask,
    BenefitTasks_FR.TaxDeliveryOptionsTask,
  ],
}

const CPP_DOCS_TASKS_FR = {
  header: 'Documents',
  tasks: [
    BenefitTasks_FR.SubmitCPPDDocuments,
    BenefitTasks_FR.SubmitScholarDeclaration,
  ],
}

const CPP_PROVISIONS_TASKS_FR = {
  header: 'Clauses',
  tasks: [
    BenefitTasks_FR.RequestChildProvision,
    BenefitTasks_FR.ViewChildProvision,
    BenefitTasks_FR.ApplyForCppCreditSplit,
    BenefitTasks_FR.ApplyForCppSharing,
  ],
}

const CPP_PERSONAL_TASKS_FR = {
  header: 'Renseignements personnels',
  tasks: [BenefitTasks_FR.UpdateProfileTask, BenefitTasks_FR.GiveConsentTask],
}

// OAS

// EN
const OAS_REQ_TASKS_EN = {
  header: 'Most Requested',
  tasks: [BenefitTasks_EN.StatusUpdateTask, BenefitTasks_EN.ViewPaymentInfo],
}

const OAS_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [
    BenefitTasks_EN.StatusUpdateTask,
    BenefitTasks_EN.ApplyForOASandGIS,
    BenefitTasks_EN.ApplyForGIS,
    BenefitTasks_EN.ApplyForAllowance,
  ],
}

const OAS_PAYMENT_TASKS_EN = {
  header: 'Payments',
  tasks: [
    BenefitTasks_EN.ViewPaymentInfo,
    BenefitTasks_EN.DelayOasPensionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.RequestAReview,
  ],
}

const OAS_TAXES_TASKS_EN = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_EN.TaxSlipTask,
    BenefitTasks_EN.TaxDeductionsTask,
    BenefitTasks_EN.TaxDeliveryOptionsTask,
  ],
}

const OAS_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [BenefitTasks_EN.UpdateProfileTask, BenefitTasks_EN.GiveConsentTask],
}

// FR
const OAS_REQ_TASKS_FR = {
  header: 'Demandes de prestations',
  tasks: [BenefitTasks_FR.StatusUpdateTask, BenefitTasks_FR.ViewPaymentInfo],
}

const OAS_APPLICATIONS_TASKS_FR = {
  header: 'Demandes de prestations',
  tasks: [
    BenefitTasks_FR.StatusUpdateTask,
    BenefitTasks_FR.ApplyForOASandGIS,
    BenefitTasks_FR.ApplyForGIS,
    BenefitTasks_FR.ApplyForAllowance,
  ],
}

const OAS_PAYMENT_TASKS_FR = {
  header: 'Paiements',
  tasks: [
    BenefitTasks_FR.ViewPaymentInfo,
    BenefitTasks_FR.DelayOasPensionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.RequestAReview,
  ],
}

const OAS_TAXES_TASKS_FR = {
  header: 'Impôts',
  tasks: [
    BenefitTasks_FR.TaxSlipTask,
    BenefitTasks_FR.TaxDeductionsTask,
    BenefitTasks_FR.TaxDeliveryOptionsTask,
  ],
}

const OAS_PERSONAL_TASKS_FR = {
  header: 'Renseignements personnels',
  tasks: [BenefitTasks_FR.UpdateProfileTask, BenefitTasks_FR.GiveConsentTask],
}

// Task Groups

const TASK_GROUPS = {
  [ProgramCodes.EI]: {
    en: {
      programTitle: 'Employment Insurance',
      taskHeadingKey:
        'Applications, payments and claims, taxes, reports and documents, personal information',
      tasksGroups: [
        EI_REQ_TASKS_EN,
        EI_APPLICATIONS_TASKS_EN,
        EI_TAXES_TASKS_EN,
        EI_PAYMENT_CLAIM_TASKS_EN,
        EI_PERSONAL_TASKS_EN,
        EI_DOCS_TASKS_EN,
      ],
    },
    fr: {
      programTitle: 'Assurance-emploi',
      taskHeadingKey:
        'Demandes de prestations, paiements et demandes, impôts, rapports et documents, renseignements personnels',
      tasksGroups: [
        EI_REQ_TASKS_FR,
        EI_APPLICATIONS_TASKS_FR,
        EI_PAYMENT_CLAIM_TASKS_FR,
        EI_TAXES_TASKS_FR,
        EI_PERSONAL_TASKS_FR,
        EI_DOCS_TASKS_FR,
      ],
    },
  },

  [ProgramCodes.CPP]: {
    en: {
      programTitle: 'Canada Pension Plan',
      taskHeadingKey:
        'Applications, payments, taxes, documents, provisions, personal information',
      tasksGroups: [
        CPP_REQ_TASKS_EN,
        CPP_APPLICATIONS_TASKS_EN,
        CPP_PAYMENT_TASKS_EN,
        CPP_TAXES_TASKS_EN,
        CPP_DOCS_TASKS_EN,
        CPP_PROVISIONS_TASKS_EN,
        CPP_PERSONAL_TASKS_EN,
      ],
    },
    fr: {
      programTitle: 'Régime de pensions du Canada',
      taskHeadingKey:
        'Demandes de prestations, paiements, impôts, documents, clauses, renseignements personnels',
      tasksGroups: [
        CPP_REQ_TASKS_FR,
        CPP_APPLICATIONS_TASKS_FR,
        CPP_PAYMENT_TASKS_FR,
        CPP_TAXES_TASKS_FR,
        CPP_DOCS_TASKS_FR,
        CPP_PROVISIONS_TASKS_FR,
        CPP_PERSONAL_TASKS_FR,
      ],
    },
  },

  [ProgramCodes.OAS]: {
    en: {
      programTitle: 'Old Age Security',
      taskHeadingKey: 'Applications, payments, taxes, personal information',
      tasksGroups: [
        OAS_REQ_TASKS_EN,
        OAS_APPLICATIONS_TASKS_EN,
        OAS_PAYMENT_TASKS_EN,
        OAS_TAXES_TASKS_EN,
        OAS_PERSONAL_TASKS_EN,
      ],
    },
    fr: {
      programTitle: 'Sécurité de la vieillesse',
      taskHeadingKey:
        'Demandes de prestations, paiements, impôts, renseignements personnels ',
      tasksGroups: [
        OAS_REQ_TASKS_FR,
        OAS_APPLICATIONS_TASKS_FR,
        OAS_PAYMENT_TASKS_FR,
        OAS_TAXES_TASKS_FR,
        OAS_PERSONAL_TASKS_FR,
      ],
    },
  },
}

module.exports = {
  TASK_GROUPS,
}
