import ProgrammingDocuments from '../components/AddEditProject/shared/ProgrammingDocuments.vue';
import AdditionalInformation from '../components/Projects/AdditionalInformation.vue';
import TechnicalReadiness from '../components/AddEditProject/shared/TechnicalReadiness.vue';
import FinancialAnalysis from '../components/AddEditProject/shared/FinancialAnalysis.vue';
import ImplementationPeriod from '../components/AddEditProject/shared/ImplementationPeriod.vue';
import SpatialCoverage from '../components/AddEditProject/shared/SpatialCoverage.vue';
import BasicInformation from '../components/AddEditProject/shared/BasicInformation.vue';
import StepperNavigation from '../components/AddEditProject/shared/StepperNavigation.vue';
import ProjectUpdates from '../components/Projects/ProjectUpdates';
import FinancialInformation from '../components/AddEditProject/shared/FinancialInformation';

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
