<template>
  <q-page>
    <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
      <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
        <q-avatar icon="note_add" />
        <q-toolbar-title>View Project</q-toolbar-title>
        <q-btn
          :to="'/projects/' + $route.params.id + '/edit'"
          flat
          round
          icon="edit"
        />
        <q-btn @click="printProject" icon="save" flat round dense />
      </q-toolbar>

      <q-list separator :dark="dark">
        <label-value label="PAP UACS Code" :value="project.uacsCode" />

        <q-item-label header class="text-uppercase"
          >General Information</q-item-label
        >

        <label-value label="Commodity/ies" :value="project.commodities" />

        <label-value
          label="Program/Functional Classification"
          :value="project.program"
        />

        <label-value label="1. Proposal/Project Name" :value="project.title" />

        <label-value
          label="2. Program or Project"
          :value="project.classification"
        />

        <label-value
          label="3. Implementing Agency"
          :value="project.implementingAgency"
        />

        <label-value
          label="4. Main Funding Source"
          :value="project.mainFundingSource"
        />

        <label-value
          label="4a. Mode of Implementation"
          :value="project.implementationMode"
        />

        <label-value
          label="5. Priority Ranking No."
          :value="project.priorityRanking"
        />

        <q-item-label header class="text-uppercase"
          >Categorization</q-item-label
        >

        <label-value label="6a. Status" :value="project.status"></label-value>

        <label-value
          label="6b. Infrastructure"
          :value="project.infrastructure"
        ></label-value>

        <label-value label="6c. Typology" :value="project.typology" />

        <label-value label="6d. Budget Tier" :value="project.budgetTier" />

        <label-value
          label="7a. Spatial Coverage"
          :value="project.spatialCoverage"
        />

        <label-value label="7b. Regions" :value="project.regions" />

        <label-value label="7c. Province/s" :value="project.provinces" />

        <label-value
          label="7d. City/Municipality/ies"
          :value="project.cityMunicipalities"
        />

        <label-value
          label="8. Total Project Cost (in PhP)"
          :value="project.totalProjectCost"
        />

        <label-value
          label="9. Bases for Implementation"
          :value="project.implementationBases"
        />

        <label-value
          label="10. RDIP Inclusion"
          :value="project.rdipInclusion"
        />

        <label-value
          label="11. PCIP Inclusion"
          :value="project.pcipInclusion"
        />

        <label-value
          label="12. Status of ICC/NEDA Board Processing"
          :value="project.nedaProcessing + ' on ' + project.dateNedaProcessing"
        />

        <label-value label="13. Description" :value="project.description" />

        <label-value label="Add component" :value="project.components" />

        <label-value label="14. Purpose" :value="project.purpose" />

        <label-value
          label="15. Challenges being addressed"
          :value="project.challenges"
        />

        <label-value
          label="16. Expected Outputs"
          :value="project.expectedOutputs"
        />

        <label-value label="17. Beneficiaries" :value="project.beneficiaries" />

        <label-value
          label="18. Estimated number of persons to be employed"
          :value="project.employmentGeneration"
        />

        <label-value
          label="19. Implementation Period"
          :value="project.implementationStart + '-' + project.implementationEnd"
        />

        <label-value
          label="20. Physical Status Update/Accomplishment"
          :value="project.updates"
        />

        <q-item-label header class="text-uppercase"
          >Implementation Readiness</q-item-label
        >

        <q-item-label header>21. Prerequisites</q-item-label>

        <label-value label="NEDA Board" :value="project.nedaBoard" />

        <label-value label="NEDA Board-ICC" :value="project.nedaBoardIcc" />

        <label-value
          label="DPWH Certification"
          :value="project.dpwhCertification"
        />

        <label-value label="DPWH MOA" :value="project.dpwhMoa" />

        <label-value label="DPWH Costing" :value="project.dpwhCosting" />

        <label-value label="DENR Clearance" :value="project.denrClearance" />

        <label-value
          label="RDC Consultation"
          :value="project.rdcConsultation"
        />

        <label-value
          label="CSO Consultation"
          :value="project.csoConsultation"
        />

        <label-value label="List of Locations" :value="project.listLocations" />

        <label-value
          label="List of Beneficiaries"
          :value="project.listBeneficiaries"
        />

        <label-value
          label="Evaluated and endorsed by DA Clearinghouse Committee"
          :value="project.daClearingHouse"
        />

        <q-item-label header>22. Technical Readiness</q-item-label>

        <label-value label="Concept Note" :value="project.conceptNote" />

        <label-value
          label="Feasibility Study"
          :value="project.feasibilityStudy"
        />

        <label-value
          label="Detailed Engineering Design"
          :value="project.detailedEngineeringDesign"
        />

        <label-value label="Business Plan" :value="project.businessPlan" />

        <label-value label="Right of Way" :value="project.rightOfWay" />

        <label-value
          label="Resettlement Plan"
          :value="project.resettlementPlan"
        />

        <label-value label="Others" :value="project.otherTechnicalReadiness" />

        <label-value
          label="23. Level of Readiness"
          :value="project.readinessLevel"
        />

        <label-value
          label="24. Implementation Risks"
          :value="project.implementationRisks"
        />

        <label-value
          label="25. Mitigation Strategies"
          :value="project.mitigationStrategies"
        />

        <q-item-label header class="text-uppercase"
          >Strategic Alignment</q-item-label
        >

        <label-value
          label="26. New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)"
          :value="project.newThinkings"
        />

        <label-value label="Philippine Development Plan" :value="project.pdp" />

        <label-value
          label="29. Sustainable Development Goals"
          :value="project.sustainableDevelopmentGoals"
        />

        <label-value
          label="30. 0-10 Socioeconomic Agenda"
          :value="project.tenPointAgenda"
        />

        <label-value
          label="31. Level of GAD Responsiveness"
          :value="project.gadResponsiveness"
        />

        <label-value
          label="32. Infrastructure Sector"
          :value="project.infrastructureSectors"
        />

        <q-item-label header class="text-uppercase"
          >FINANCIAL AND ECONOMIC BENEFITS</q-item-label
        >

        <label-value
          label="33. Estimated Project Life (in years)"
          :value="project.projectLife"
        />

        <label-value label="34. Benefit-Cost Ratio" :value="project.bcr" />

        <label-value
          label="35. Internal Rate of Return (in %)"
          :value="project.irr"
        />

        <label-value
          label="36. Return on Investment (in %)"
          :value="project.roi"
        />

        <q-item-label header>PROJECT COSTING</q-item-label>

        <label-value
          label="ODA Funding Institution"
          :value="project.mainFundingInstitution"
        />

        <label-value
          label="Other Funding Institution"
          :value="project.otherFundingInstitution"
        />

        <label-value
          label="Other Funding Institution"
          :value="project.preparationDocument"
        />

        <q-markup-table></q-markup-table>

        <q-markup-table></q-markup-table>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { firebaseDb } from "boot/firebase";
import { mapState, mapGetters } from "vuex";
import { Notify, Loading } from "quasar";

const LabelValue = () => import("../components/LabelValue");

import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Table,
  Paragraph,
  WidthType,
  TableAnchorType,
  Header,
  HeadingLevel,
  TableLayoutType,
  // Footer,
  // TextRun,
  // VerticalAlign,
  // BorderStyle,
  AlignmentType,
  VerticalAlign
} from "docx";

export default {
  components: {
    LabelValue
  },
  name: "PageViewProject",
  data() {
    return {
      project: {}
    };
  },
  computed: {
    ...mapState("settings", ["dark"]),
    ...mapGetters("projects", ["getProject"])
  },
  methods: {
    printProject() {
      const doc = new Document({
        creator: "DA-IPMS"
      });

      const table = new Table({
        rows: 11,
        columns: 2,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      const cell = table.getCell(0, 0);
      cell.Properties.setWidth("30%", WidthType.PCT);
      cell.add(new Paragraph("1. Proposal/Project Name"));

      const cell2 = table.getCell(0, 1);
      cell2.Properties.setWidth("70%", WidthType.PCT);
      cell2.add(new Paragraph(this.project.title));

      table
        .getCell(1, 0)
        .add(new Paragraph("2.	Implementing Department/ Agency (or Agencies)"));

      table.getCell(1, 1).add(new Paragraph(this.project.implementingAgency));
      table.getCell(2, 0).add(new Paragraph("3. Priority Ranking No."));
      table.getCell(2, 1).add(new Paragraph(this.project.priorityRanking));
      table.getCell(3, 0).add(new Paragraph("4. Categorization"));
      table.getCell(3, 1).add(new Paragraph(this.project.categorization));
      table.getCell(4, 0).add(new Paragraph("5. NEDA Project ID"));
      table.getCell(4, 1).add(new Paragraph(this.project.nedaProjectId));
      table.getCell(5, 0).add(new Paragraph("6. Total Project Cost"));
      table.getCell(5, 1).add(new Paragraph(this.project.totalProjectCost));
      table.getCell(6, 0).add(new Paragraph("7. Description"));
      table.getCell(6, 1).add(new Paragraph(this.project.description));
      table.getCell(7, 0).add(new Paragraph("8. Purpose"));
      table.getCell(7, 1).add(new Paragraph(this.project.purpose));
      table.getCell(8, 0).add(new Paragraph("9. Beneficiaries"));
      table.getCell(8, 1).add(new Paragraph(this.project.beneficiaries));
      table.getCell(9, 0).add(new Paragraph("10. Implementation Period"));
      table
        .getCell(9, 1)
        .add(new Paragraph("Start Date: " + this.project.implementationStart));
      table
        .getCell(10, 1)
        .add(new Paragraph("End Date: " + this.project.implementationEnd));

      const table2 = new Table({
        rows: 13,
        columns: 6,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table2.getCell(0, 0).add(new Paragraph("11. Pre-requisites"));
      table2.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table2
        .getRow(0)
        .mergeCells(1, 5)
        .add(
          new Paragraph({
            text: "Reviewed/Approved",
            alignment: AlignmentType.CENTER
          })
        )
        .setVerticalAlign(VerticalAlign.CENTER);

      table2.getCell(1, 1).add(new Paragraph("Approving Authorities"));
      table2.getCell(1, 2).add(new Paragraph("Yes"));
      table2.getCell(1, 3).add(new Paragraph("No"));
      table2.getCell(1, 4).add(new Paragraph("Not Applicable"));
      table2.getCell(1, 5).add(new Paragraph("Remark"));
      table2.getCell(2, 1).add(new Paragraph("NEDA Board"));
      table2.getCell(2, 2).add(new Paragraph(""));
      table2.getCell(2, 3).add(new Paragraph(""));
      table2.getCell(2, 4).add(new Paragraph(""));
      table2.getCell(2, 5).add(new Paragraph(""));
      table2.getCell(3, 1).add(new Paragraph("NEDA Board-ICC"));
      table2.getCell(3, 2).add(new Paragraph(""));
      table2.getCell(3, 3).add(new Paragraph(""));
      table2.getCell(3, 4).add(new Paragraph(""));
      table2.getCell(3, 5).add(new Paragraph(""));
      table2.getCell(4, 1).add(new Paragraph("DPWH Certification"));
      table2.getCell(4, 2).add(new Paragraph(""));
      table2.getCell(4, 3).add(new Paragraph(""));
      table2.getCell(4, 4).add(new Paragraph(""));
      table2.getCell(4, 5).add(new Paragraph(""));
      table2.getCell(5, 1).add(new Paragraph("DPWH MOA"));
      table2.getCell(5, 2).add(new Paragraph(""));
      table2.getCell(5, 3).add(new Paragraph(""));
      table2.getCell(5, 4).add(new Paragraph(""));
      table2.getCell(5, 5).add(new Paragraph(""));
      table2.getCell(6, 1).add(new Paragraph("DPWH Costing"));
      table2.getCell(6, 2).add(new Paragraph(""));
      table2.getCell(6, 3).add(new Paragraph(""));
      table2.getCell(6, 4).add(new Paragraph(""));
      table2.getCell(6, 5).add(new Paragraph(""));
      table2.getCell(7, 1).add(new Paragraph("DENR Clearance"));
      table2.getCell(7, 2).add(new Paragraph(""));
      table2.getCell(7, 3).add(new Paragraph(""));
      table2.getCell(7, 4).add(new Paragraph(""));
      table2.getCell(7, 5).add(new Paragraph(""));
      table2.getCell(8, 1).add(new Paragraph("RDC Consultation"));
      table2.getCell(8, 2).add(new Paragraph(""));
      table2.getCell(8, 3).add(new Paragraph(""));
      table2.getCell(8, 4).add(new Paragraph(""));
      table2.getCell(8, 5).add(new Paragraph(""));
      table2.getCell(9, 1).add(new Paragraph("CSO Consultation"));
      table2.getCell(9, 2).add(new Paragraph(""));
      table2.getCell(9, 3).add(new Paragraph(""));
      table2.getCell(9, 4).add(new Paragraph(""));
      table2.getCell(9, 5).add(new Paragraph(""));
      table2.getCell(10, 1).add(new Paragraph("List of Locations"));
      table2.getCell(10, 2).add(new Paragraph(""));
      table2.getCell(10, 3).add(new Paragraph(""));
      table2.getCell(10, 4).add(new Paragraph(""));
      table2.getCell(10, 5).add(new Paragraph(""));
      table2.getCell(11, 1).add(new Paragraph("List of Beneficiaries"));
      table2.getCell(11, 2).add(new Paragraph(""));
      table2.getCell(11, 3).add(new Paragraph(""));
      table2.getCell(11, 4).add(new Paragraph(""));
      table2.getCell(11, 5).add(new Paragraph(""));
      table2.getCell(12, 1).add(new Paragraph("Others (please specify)"));
      table2.getCell(12, 2).add(new Paragraph(""));
      table2.getCell(12, 3).add(new Paragraph(""));
      table2.getCell(12, 4).add(new Paragraph(""));
      table2.getCell(12, 5).add(new Paragraph(""));

      const table3 = new Table({
        rows: 3,
        columns: 4,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });
      table3.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table3.getCell(0, 0).add(new Paragraph("PAP (A)"));
      table3.getCell(0, 1).add(new Paragraph("FY 2021 Tier 2 (B)"));
      table3.getCell(0, 2).add(new Paragraph("2022 (C)"));
      table3.getCell(0, 3).add(new Paragraph("2023 (D)"));

      table3.getCell(2, 0).add(new Paragraph("GRAND TOTAL"));

      const table4 = new Table({
        rows: 3,
        columns: 4,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table4.getCell(0, 0).add(new Paragraph("Physical Accomplishments (A)"));
      table4.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table4
        .getRow(0)
        .mergeCells(1, 3)
        .add(new Paragraph("Targets"));
      table4.getCell(1, 1).add(new Paragraph("FY 2020 Tier 2 (B)"));
      table4.getCell(1, 2).add(new Paragraph("2021 (C)"));
      table4.getCell(1, 3).add(new Paragraph("2022 (D)"));

      const table5 = new Table({
        rows: 6,
        columns: 2,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table5.getCell(0, 0).add(new Paragraph("Expense Class"));
      table5.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table5.getCell(0, 1).add(new Paragraph("Total Project Cost"));
      table5.getCell(1, 0).add(new Paragraph("Personnel Services (PS)"));
      table5
        .getCell(2, 0)
        .add(new Paragraph("Maintenance and Other Operating Expenses (MOOE)"));
      table5.getCell(3, 0).add(new Paragraph("Financial Expenses (FINEX)"));
      table5.getCell(4, 0).add(new Paragraph("Capital Outlay (CO)"));
      table5.getCell(5, 0).add(new Paragraph("GRAND TOTAL"));
      table5.getCell(5, 1).add(new Paragraph(this.project.totalProjectCost));

      const table6 = new Table({
        rows: 3,
        columns: 3,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table6.getCell(0, 0).add(new Paragraph("PAP (A)"));
      table6.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table6.getCell(0, 1).add(new Paragraph("2021 (B)"));
      table6.getCell(0, 2).add(new Paragraph("2022 (C)"));
      table6.getCell(2, 0).add(new Paragraph("GRAND TOTAL"));

      const table7 = new Table({
        rows: 3,
        columns: 6,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table7.getCell(0, 0).add(new Paragraph("Components (A)"));
      table7.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table7.getCell(0, 1).add(new Paragraph("PS (B)"));
      table7.getCell(0, 2).add(new Paragraph("MOOE (C)"));
      table7.getCell(0, 3).add(new Paragraph("CO (D)"));
      table7.getCell(0, 4).add(new Paragraph("FINEX (E)"));
      table7.getCell(0, 5).add(new Paragraph("Total (F)"));
      table7.getCell(2, 0).add(new Paragraph("GRAND TOTAL"));

      const table8 = new Table({
        rows: 3,
        columns: 6,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table8.getCell(0, 0).add(new Paragraph("Location (A)"));
      table8.getCell(0, 0).Properties.setWidth("30%", WidthType.PCT);
      table8.getCell(0, 1).add(new Paragraph("PS (B)"));
      table8.getCell(0, 2).add(new Paragraph("MOOE (C)"));
      table8.getCell(0, 3).add(new Paragraph("CO (D)"));
      table8.getCell(0, 4).add(new Paragraph("FINEX (E)"));
      table8.getCell(0, 5).add(new Paragraph("Total (F)"));
      table8.getCell(2, 0).add(new Paragraph("GRAND TOTAL"));

      const table9 = new Table({
        rows: 3,
        columns: 5,
        float: {
          horizontalAnchor: TableAnchorType.MARGIN,
          verticalAnchor: TableAnchorType.MARGIN
        },
        width: 9070,
        widthUnitType: WidthType.DXA,
        layout: TableLayoutType.FIXED,
        margins: {
          top: 100,
          bottom: 100,
          right: 100,
          left: 100
        }
      });

      table9.getCell(1, 0).Properties.setWidth("20%", WidthType.PCT);
      table9.getCell(1, 1).Properties.setWidth("20%", WidthType.PCT);
      table9.getCell(1, 2).Properties.setWidth("20%", WidthType.PCT);
      table9.getCell(1, 3).Properties.setWidth("20%", WidthType.PCT);
      table9.getCell(1, 4).Properties.setWidth("20%", WidthType.PCT);

      table9
        .getRow(0)
        .mergeCells(0, 1)
        .add(new Paragraph("Prepared by:"));
      table9.getCell(0, 1).add(new Paragraph("Certified Correct:"));
      table9.getCell(0, 2).add(new Paragraph("Approved:"));
      table9.getCell(0, 3).add(new Paragraph("Date:"));
      table9.getCell(2, 0).add(new Paragraph("Budget Officer"));
      table9.getCell(2, 1).add(new Paragraph("Planning Officer"));
      table9.getCell(2, 2).add(new Paragraph("Chief Accountant"));
      table9.getCell(2, 3).add(new Paragraph("Head of Agency"));
      table9.getCell(2, 4).add(new Paragraph("Date"));

      doc.addSection({
        properties: {},
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                text: "Revised BP Form 202 (2021 Budget Tier 2)",
                alignment: AlignmentType.RIGHT,
                bold: true
              })
            ]
          })
        },
        children: [
          new Paragraph({
            text: "PROPOSAL FOR NEW OR EXPANDED LOCALLY FUNDED PROJECT",
            alignment: AlignmentType.CENTER,
            bold: true,
            spacing: {
              after: 200
            }
          }),
          table,
          new Paragraph({
            text: "Pre-Requisites",
            heading: HeadingLevel.HEADING_4,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table2,
          new Paragraph({
            text: "12. Financial (in P'000) and Physical Details",
            heading: HeadingLevel.HEADING_4,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          new Paragraph({
            text: "12.1 PAP ATTRIBUTION BY EXPENSE CLASS",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table3,
          new Paragraph({
            text: "12.2 PHYSICAL ACCOMPLISHMENTS &amp; TARGETS",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table4,
          new Paragraph({
            text: "12.3 TOTAL PROJECT COST",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table5,
          new Paragraph({
            text:
              "12.4 REQUIREMENTS FOR OPERATING COST OF INFRASTRUCTURE PROJECT",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table6,
          new Paragraph({
            text: "12.5 COSTING BY COMPONENT(S)",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table7,
          new Paragraph({
            text: "12.6 LOCATION OF IMPLEMENTATION",
            heading: HeadingLevel.HEADING_5,
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table8,
          new Paragraph({
            spacing: {
              after: 200,
              before: 200
            }
          }),
          table9
        ]
      });

      Loading.show();
      Packer.toBlob(doc).then(blob => {
        saveAs(blob, "mydoc.docx");
        Loading.hide();
      });
    }
  },
  created() {
    let ref = firebaseDb.collection("projects");

    ref
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.project = doc.data();
      })
      .catch(err => {
        Notify.create("Error message: ", err.message);
      });
  }
};
</script>
