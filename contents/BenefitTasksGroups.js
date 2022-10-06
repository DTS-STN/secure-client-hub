import { ProgramCodes } from '../contents/ProgramCodes'

import { BenefitTasks_EN, BenefitTasks_FR } from './BenefitTasks'

// Employment Insurance

// EN
const EI_REQ_TASKS_EN = {
  header: 'Most Requested',
  tasks: [BenefitTasks_EN.EiStatusUpdateTask, BenefitTasks_EN.ViewPaymentInfo],
}

const EI_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [BenefitTasks_EN.EiStatusUpdateTask, BenefitTasks_EN.ApplyEI],
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

const EI_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_EN.UpdateProfileTask,
    BenefitTasks_EN.RegisterForAlerts,
    BenefitTasks_EN.AccessCode,
    BenefitTasks_EN.ViewAgreementStatus,
  ],
}

// FR
const EI_REQ_TASKS_FR = {
  header: 'Demandes de prestations',
  tasks: [BenefitTasks_FR.EiStatusUpdateTask, BenefitTasks_FR.ViewPaymentInfo],
}

const EI_APPLICATIONS_TASKS_FR = {
  header: 'Applications',
  tasks: [BenefitTasks_FR.EiStatusUpdateTask, BenefitTasks_FR.ApplyEI],
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
  tasks: [
    BenefitTasks_EN.DelayOasPensionTask,
    BenefitTasks_EN.GiveConsentTask,
    BenefitTasks_EN.UpdateAccountInfoTask,
  ],
}

const CPP_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [BenefitTasks_EN.RetirementIncomeTask],
}

const CPP_PAYMENT_TASKS_EN = {
  header: 'Payments',
  tasks: [
    BenefitTasks_EN.AllPaymentsTask,
    BenefitTasks_EN.CppContributionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.TaxSlipTask,
  ],
}

const CPP_TAXES_TASKS_EN = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_EN.AllPaymentsTask,
    BenefitTasks_EN.CppContributionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.TaxSlipTask,
  ],
}

const CPP_DOCS_TASKS_EN = {
  header: 'Documents',
  tasks: [
    BenefitTasks_EN.DelayOasPensionTask,
    BenefitTasks_EN.TaxDeductionsTask,
    BenefitTasks_EN.UpdateAccountInfoTask,
    BenefitTasks_EN.GiveConsentTask,
    BenefitTasks_EN.ReconsiderationTask,
  ],
}

const CPP_PROVISIONS_TASKS_EN = {
  header: 'Provisions',
  tasks: [
    BenefitTasks_EN.AllPaymentsTask,
    BenefitTasks_EN.TaxSlipTask,
    BenefitTasks_EN.TaxSlipMailingTask,
  ],
}

const CPP_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_EN.UpdateAccountInfoTask,
    BenefitTasks_EN.RequestAReview,
  ],
}

// FR
const CPP_REQ_TASKS_FR = {
  header: 'Most Requested',
  tasks: [BenefitTasks_FR.DelayOasPensionTask, BenefitTasks_FR.ViewPaymentInfo],
}

const CPP_APPLICATIONS_TASKS_FR = {
  header: 'Applications',
  tasks: [BenefitTasks_FR.RetirementIncomeTask],
}

const CPP_PAYMENT_TASKS_FR = {
  header: 'Payments',
  tasks: [
    BenefitTasks_FR.AllPaymentsTask,
    BenefitTasks_FR.CppContributionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.TaxSlipTask,
  ],
}

const CPP_TAXES_TASKS_FR = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_FR.AllPaymentsTask,
    BenefitTasks_FR.CppContributionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.TaxSlipTask,
  ],
}

const CPP_DOCS_TASKS_FR = {
  header: 'Documents',
  tasks: [
    BenefitTasks_FR.DelayOasPensionTask,
    BenefitTasks_FR.TaxDeductionsTask,
    BenefitTasks_FR.UpdateAccountInfoTask,
    BenefitTasks_FR.GiveConsentTask,
    BenefitTasks_FR.ReconsiderationTask,
  ],
}

const CPP_PROVISIONS_TASKS_FR = {
  header: 'Provisions',
  tasks: [
    BenefitTasks_FR.AllPaymentsTask,
    BenefitTasks_FR.TaxSlipTask,
    BenefitTasks_FR.TaxSlipMailingTask,
  ],
}

const CPP_PERSONAL_TASKS_FR = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_FR.UpdateAccountInfoTask,
    BenefitTasks_FR.RequestAReview,
  ],
}

// OAS

// EN
const OAS_REQ_TASKS_EN = {
  header: 'Most Requested',
  tasks: [
    BenefitTasks_EN.DelayOasPensionTask,
    BenefitTasks_EN.GiveConsentTask,
    BenefitTasks_EN.UpdateAccountInfoTask,
  ],
}

const OAS_APPLICATIONS_TASKS_EN = {
  header: 'Applications',
  tasks: [BenefitTasks_EN.RetirementIncomeTask],
}

const OAS_PAYMENT_TASKS_EN = {
  header: 'Payments',
  tasks: [
    BenefitTasks_EN.AllPaymentsTask,
    BenefitTasks_EN.CppContributionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.TaxSlipTask,
  ],
}

const OAS_TAXES_TASKS_EN = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_EN.AllPaymentsTask,
    BenefitTasks_EN.CppContributionTask,
    BenefitTasks_EN.RetirementIncomeTask,
    BenefitTasks_EN.TaxSlipTask,
  ],
}

const OAS_PERSONAL_TASKS_EN = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_EN.UpdateAccountInfoTask,
    BenefitTasks_EN.RequestAReview,
  ],
}

// FR
const OAS_REQ_TASKS_FR = {
  header: 'Most Requested',
  tasks: [
    BenefitTasks_FR.DelayOasPensionTask,
    BenefitTasks_FR.GiveConsentTask,
    BenefitTasks_FR.UpdateAccountInfoTask,
  ],
}

const OAS_APPLICATIONS_TASKS_FR = {
  header: 'Applications',
  tasks: [BenefitTasks_FR.RetirementIncomeTask],
}

const OAS_PAYMENT_TASKS_FR = {
  header: 'Payments',
  tasks: [
    BenefitTasks_FR.AllPaymentsTask,
    BenefitTasks_FR.CppContributionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.TaxSlipTask,
  ],
}

const OAS_TAXES_TASKS_FR = {
  header: 'Taxes',
  tasks: [
    BenefitTasks_FR.AllPaymentsTask,
    BenefitTasks_FR.CppContributionTask,
    BenefitTasks_FR.RetirementIncomeTask,
    BenefitTasks_FR.TaxSlipTask,
  ],
}

const OAS_PERSONAL_TASKS_FR = {
  header: 'Personal Information',
  tasks: [
    BenefitTasks_FR.UpdateAccountInfoTask,
    BenefitTasks_FR.RequestAReview,
  ],
}

// Task Groups

const TASK_GROUPS = {
  [ProgramCodes.EI]: {
    en: {
      taskHeadingKey:
        'Applications, payments and claims, taxes, reports and documents, personal information',
      tasksGroups: [
        EI_REQ_TASKS_EN,
        EI_APPLICATIONS_TASKS_EN,
        EI_PAYMENT_CLAIM_TASKS_EN,
        EI_TAXES_TASKS_EN,
        EI_DOCS_TASKS_EN,
        EI_PERSONAL_TASKS_EN,
      ],
    },
    fr: {
      taskHeadingKey:
        'Demandes de prestations, paiements et demandes, impôts, rapports et documents, renseignements personnels',
      tasksGroups: [
        EI_REQ_TASKS_FR,
        EI_APPLICATIONS_TASKS_FR,
        EI_PAYMENT_CLAIM_TASKS_FR,
        EI_TAXES_TASKS_FR,
        EI_DOCS_TASKS_FR,
        EI_PERSONAL_TASKS_FR,
      ],
    },
  },

  [ProgramCodes.CPP]: {
    en: {
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
      taskHeadingKey: 'Common actions',
      tasksGroups: [
        OAS_REQ_TASKS_EN,
        OAS_APPLICATIONS_TASKS_EN,
        OAS_PAYMENT_TASKS_EN,
        OAS_TAXES_TASKS_EN,
        OAS_PERSONAL_TASKS_EN,
      ],
    },
    fr: {
      taskHeadingKey: 'Actions courantes',
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
