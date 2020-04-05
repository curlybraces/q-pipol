import ProgrammingDocuments from '../components/Projects/ProgrammingDocuments.vue';
import AdditionalInformation from '../components/Projects/AdditionalInformation.vue';
import TechnicalReadiness from '../components/Projects/TechnicalReadiness.vue';
import FinancialAnalysis from '../components/Projects/FinancialAnalysis.vue';
import ImplementationPeriod from '../components/Projects/ImplementationPeriod.vue';
import SpatialCoverage from '../components/Projects/SpatialCoverage.vue';
import BasicInformation from '../components/Projects/BasicInformation.vue';
import StepperNavigation from '../components/Projects/StepperNavigation.vue';
import ProjectUpdates from '../components/Projects/ProjectUpdates';
import FinancialInformation from '../components/Projects/FinancialInformation';

const ProjectMixins = {
  components: {
    FinancialInformation,
    ProjectUpdates,
    StepperNavigation,
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
