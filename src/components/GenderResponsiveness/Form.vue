<template>
  <q-list bordered>
    <q-item-label header class="text-right text-weight-bold"
      >Total Score: {{ totalScore }} ({{
        totalScore | interpretation
      }})</q-item-label
    >
    <template v-for="(question, key) in questions">
      <q-expansion-item
        expand-separator
        :label="key"
        :key="key"
        :group="key"
        header-class="text-weight-bolder"
        default-opened
      >
        <q-item v-for="(q, index) in question" :key="index">
          <q-item-section>
            <q-item-label>{{ q.question }}</q-item-label>
            <q-item-label>
              <q-option-group
                :options="q.options"
                v-model="q.score"
                inline
                v-if="!$q.screen.gt.sm"
              ></q-option-group>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-option-group
              :options="q.options"
              v-model="q.score"
              inline
              v-if="$q.screen.gt.sm"
            ></q-option-group>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </template>
    <q-item-label header class="text-right text-weight-bold"
    >Total Score: {{ totalScore }} ({{
      totalScore | interpretation
      }})</q-item-label
    >
  </q-list>
</template>

<script>
export default {
  name: 'GadForm',
  data() {
    return {
      questions: {
        '1.0 Participation of women and men in project identification': [
          {
            question:
              '1.1 Has the project consulted women and men on the problem or issue that the intervention must solve and on the development of the solution?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              '1.2 Have women\'s inputs been considered in the design of the project?',
            options: [
                { label: 'No', value: 0 },
                { label: 'Partly Yes', value: 0.33 },
                { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question: 'Are both women and men seen as stakeholders, partners, or agents of change in the project design?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          }
        ],
        '2.0 Collection of sex-disaggregated data and gender-related information': [
          {
            question:
              'Has the project tapped sex-disaggregated data and gender-related information from secondary and primary sources at the project identification stage? OR, does the project document include sexdisaggregated and gender information in the analysis of the development issue or problem?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '3.0 Conduct of gender analysis and identification of gender issues': [
          {
            question:
              'Has a gender analysis been done to identify gender issues prior to project design? OR, does the discussion of development issues in the project document include gender issues that the project must address?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '4.0 Gender equality goals, outcomes, and outputs': [
          {
            question:
              '4.1 Do project objectives explicitly refer to women and men? Do they target women\'s agricultural production and marketing needs as well as men\'s?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          },
          {
            question:
                'Does the project have gender equality outputs or outcomes?',
            options: [
                { label: 'No', value: 0 },
                { label: 'Partly Yes', value: 0.5 },
                { label: 'Yes', value: 1 }
            ],
            score: null
          }
        ],
        '5.0 Matching of strategies with gender issues': [
          {
            question:
              '5.1 Do the strategies match the gender issues and gender equality goals identified? That is, will the activities or interventions reduce gender gaps and inequalities? ',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          },
          {
            question:
                'Do the project activities build on women’s and men\'s knowledge and skills?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          }
        ],
        '6.0 Gender analysis of the likely impacts of the project': [
          {
            question:
              '6.1.1 Is the project addressing the array of women\'s agricultural activities, including subsistence- and cash-crop activities?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.17 },
              { label: 'Yes', value: 0.33 }
            ],
            score: null
          },
          {
            question:
              "6.1.2 Has the project considered how women and men fit their agricultural activities with their other productive, reproductive, and community tasks in scheduling project activities?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.17 },
              { label: 'Yes', value: 0.33 }
            ],
            score: null
          },
            {
                question:
                    "6.2.1 Will women and men have equal access to credit, extension services, and information, training, or technology to be introduced by the project? ",
                options: [
                    { label: 'No', value: 0 },
                    { label: 'Partly Yes', value: 0.17 },
                    { label: 'Yes', value: 0.33 }
                ],
                score: null
            },
            {
                question:
                    "6.2.2 Will the project involve female extension officers? Woman farmer leaders?",
                options: [
                    { label: 'No', value: 0 },
                    { label: 'Partly Yes', value: 0.17 },
                    { label: 'Yes', value: 0.33 }
                ],
                score: null
            },
            {
                question:
                    "6.2.3 Will the training of agency/project personnel capacitate them for gender-responsive development?",
                options: [
                    { label: 'No', value: 0 },
                    { label: 'Partly Yes', value: 0.17 },
                    { label: 'Yes', value: 0.33 }
                ],
                score: null
            },
            {
                question:
                    "6.3.1 Has the project devised strategies to overcome the constraints (including mobility and time constraints for women) to project participation by women and by men?",
                options: [
                    { label: 'No', value: 0 },
                    { label: 'Partly Yes', value: 0.17 },
                    { label: 'Yes', value: 0.33 }
                ],
                score: null
            },
            {
                question:
                    "6.3.2. Has the project considered that the constraints to women’s participation may require separate programming (by way of separate groups, activities, or components)? IF SEPARATE PROGRAMMING IS NEEDED: Has the project addressed this?",
                options: [
                    { label: 'No', value: 0 },
                    { label: 'Partly Yes', value: 0.17 },
                    { label: 'Yes', value: 0.33 }
                ],
                score: null
            }
        ],
        '7.0 Monitoring targets and indicators': [
          {
            question:
              'Does the project include gender equality targets and indicators for welfare, access, consciousness raising participation, and control? For instance, will the following gender differences be monitored: Adoption rates of technology, Membership and leadership in farmers\' organization or similar groups created by the project, Participation in training and similar project activities, by type of training or activity, and Dispersal of project inputs (animals, seeds or planting materials, credit)',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '8.0 Sex-disaggregated database requirement': [
          {
            question:
              'Does the proposed project monitoring framework or plan include the collection of sex-disaggregated data?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '9.0 Resources': [
          {
            question:
              '9.1 Is the budget allotted by the project sufficient for gender equality promotion or integration? Or, will the project tap counterpart funds from LGUs/partners for its GAD efforts?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          },
          {
            question:
              "9.2 Does the project have the expertise to promote gender equality and women's empowerment? Or, is the project committed to investing project staff time in building capacities within the project to integrate GAD or promote gender equality?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          }
        ],
        "10.0 Relationship with the agency's GAD efforts": [
          {
            question:
              "10.1 Will the project build on or strengthen the agency/PCW/government's commitment to the empowerment of women?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              '10.2 Does the project have an exit plan that will ensure the sustainability of GAD efforts and benefits?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              '10.3 Will the project build on the initiatives or actions of other organizations in the area?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          }
        ]
      }
    };
  },
  computed: {
    totalScore() {
      const keys = Object.keys(this.questions);

      let totalScore = 0;
      let sums = [];

      keys.forEach(key => {
        let question = this.questions[key];
        let sum = 0;
        sum = question.reduce((sum, d) => {
          return sum + d.score;
        }, 0);

        sums.push(sum);
      });

      totalScore = sums.reduce((totalSum, i) => {
        return totalSum + i;
      }, 0);

      return totalScore;
    }
  },
  methods: {
    calculateScore() {
      const keys = Object.keys(this.questions);

      let totalScore = 0;
      let sums = [];

      keys.forEach(key => {
        let question = this.questions[key];
        let sum = 0;
        sum = question.reduce((sum, d) => {
          return sum + d.score;
        }, 0);
        console.log(sum);
        sums.push(sum);
      });

      totalScore = sums.reduce((totalSum, i) => {
        return totalSum + i;
      }, 0);

      this.totalScore = totalScore.toFixed(1);
    }
  },
  filters: {
    interpretation(val) {
      if (val < 4) return 'GAD is invisible in the project';
      else if (val >= 4 && val < 8)
        return 'Proposed project has promising prospects';
      else if (val >= 8 && val < 15)
        return 'Proposed project is gender-sensitive';
      else if (val >= 15) return 'Proposed project is gender-responsive';
      else return null;
    }
  }
};
</script>
