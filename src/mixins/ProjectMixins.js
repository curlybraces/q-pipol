import ProgrammingDocuments from '../modules/projects/components/shared/ProgrammingDocuments.vue';
import AdditionalInformation from '../modules/projects/components/shared/AdditionalInformation.vue';
import TechnicalReadiness from '../modules/projects/components/shared/TechnicalReadiness.vue';
import FinancialAnalysis from '../modules/projects/components/shared/FinancialAnalysis.vue';
import ImplementationPeriod from '../modules/projects/components/shared/ImplementationPeriod.vue';
import SpatialCoverage from '../modules/projects/components/shared/SpatialCoverage.vue';
import BasicInformation from '../modules/projects/components/shared/BasicInformation.vue';
import FinancialInformation from '../modules/projects/components/shared/FinancialInformation';

const ProjectMixins = {
  components: {
    FinancialInformation,
    TechnicalReadiness,
    BasicInformation,
    SpatialCoverage,
    ImplementationPeriod,
    FinancialAnalysis,
    ProgrammingDocuments,
    AdditionalInformation
  }
};

export default ProjectMixins;
