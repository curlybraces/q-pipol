<template>
  <q-list bordered>
    <q-item class="bg-accent text-white">
      <q-item-section>
        <q-item-label>
          Gender and Development Evaluation Form
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </q-item-section>
    </q-item>

    <template v-for="question in gad_questions">
      <q-expansion-item :label="question.name" :key="question.id" default-expand-all>
          <template v-for="sq in question.gad_subquestions">
            <q-item :key="sq.id">
              <q-item-section>
                <q-item-label>{{ sq.name }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-option-group
                  v-model="answers[sq.id]"
                  inline type="radio"
                  :options="map(sq.gad_choices)"></q-option-group>
              </q-item-section>
            </q-item>
          </template>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script>
import { FETCH_GAD_QUESTIONS } from 'src/graphql/queries'
export default {
  name: 'GadForm',
  props: ['value'],
  apollo: {
    gad_questions: {
      query: FETCH_GAD_QUESTIONS
    }
  },
  data() {
    return {
      gad_questions: [],
      answers: []
    };
  },
  computed: {
    mappedAnswers() {
      let mappedAnswers = []
      const answers = this.answers

      mappedAnswers = answers.map((answer, index) => {
        return {
          id: null,
          subquestion_id: index,
          gad_choice_id: answer
        }
      })
				.filter(answer => answer.subquestion_id !== 0)

      return mappedAnswers
    }
  },
  methods: {
    map(items) {
      let mappedItems = []
      mappedItems = items.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      return mappedItems
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
