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
          </q-item-section>
          <q-item-section side>
            <q-option-group
              :options="q.options"
              v-model="q.score"
              inline
            ></q-option-group>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: 'GadForm',
  data() {
    return {
      questions: {
        '1.0 Involvement of women and men': [
          {
            question:
              '1.1 Participation of women and men in beneficiary groups in the identification of the problem',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          },
          {
            question:
              '1.2 Participation of women and men in beneficiary groups in project design',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          }
        ],
        '2.0 Collection of sex-disaggregated data and gender-related information': [
          {
            question:
              'Collection of sex-disaggregated data and gender-related information ',
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
              '3.1 Analysis of gender gaps and inequalities related to gender roles, perspectives, and needs, or access to and control of resources',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          },
          {
            question:
              "3.2 Analysis of constraints and opportunities related to women's and men's participation in the project",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.5 },
              { label: 'Yes', value: 1 }
            ],
            score: null
          }
        ],
        '4.0 Gender equality goals, outcomes, and outputs': [
          {
            question:
              'Does the project have clearly-stated gender equality goals, objectives, outcomes or outputs?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '5.0 Matching of strategies with gender issues': [
          {
            question:
              'Do the strategies and activities match the gender issues and gender equality goals identified?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 1 },
              { label: 'Yes', value: 2 }
            ],
            score: null
          }
        ],
        '6.0 Gender analysis of the likely impacts of the project': [
          {
            question:
              '6.1  Are women and girl children among the direct or indirect beneficiaries?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              "6.2  Has the project considered its long-term impact on women's socioeconomic status and empowerment?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              "6.3   Has the project included strategies for avoiding or minimizing negative impacts on women's status and welfare?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          }
        ],
        '7.0 Monitoring targets and indicators': [
          {
            question:
              '        Does the project include gender equality targets and indicators to measure gender equality outputs and outcomes?',
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
              'Does the project M&E system require the collection of sex-disaggregated data?',
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
              "10.1 Will the project build on or strengthen the agency/PCW/government's commitment to the empowerment of women?\nIF THE AGENCY HAS NO GAD PLAN: Will the project help in the formulation of the implementing agency's GAD plan?",
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              '10.2 Will the project build on the initiatives or actions of other organizations in the area?',
            options: [
              { label: 'No', value: 0 },
              { label: 'Partly Yes', value: 0.33 },
              { label: 'Yes', value: 0.67 }
            ],
            score: null
          },
          {
            question:
              '10.3 Does the project have an exit plan that will ensure the sustainability of GAD efforts and benefits?',
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

      this.totalScore = totalScore.toLocaleString(2);
    }
  },
  filters: {
    interpretation(val) {
      if (val <= 3.9) return 'GAD is invisible in the project';
      else if (val >= 4 && val <= 7.9)
        return 'Proposed project has promising prospects';
      else if (val >= 8 && val <= 14.9)
        return 'Proposed project is gender-sensitive';
      else if (val >= 15) return 'Proposed project is gender-responsive';
      else return null;
    }
  }
};
</script>
