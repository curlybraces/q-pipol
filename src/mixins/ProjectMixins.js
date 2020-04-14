import ProgrammingDocuments from '../components/AddEditProject/ProgrammingDocuments.vue';
import AdditionalInformation from '../components/Projects/AdditionalInformation.vue';
import TechnicalReadiness from '../components/AddEditProject/TechnicalReadiness.vue';
import FinancialAnalysis from '../components/AddEditProject/FinancialAnalysis.vue';
import ImplementationPeriod from '../components/AddEditProject/ImplementationPeriod.vue';
import SpatialCoverage from '../components/AddEditProject/SpatialCoverage.vue';
import BasicInformation from '../components/AddEditProject/BasicInformation.vue';
import StepperNavigation from '../components/AddEditProject/StepperNavigation.vue';
import ProjectUpdates from '../components/Projects/ProjectUpdates';
import FinancialInformation from '../components/AddEditProject/FinancialInformation';

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
