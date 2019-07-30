<template>
  <q-page padding>
    <p>View Projects</p>
    <q-input outlined dense rounded class="q-mb-md" clearable placeholder="Search in project titles...">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <list-component :items="projects"> </list-component>
  </q-page>
</template>

<script>
import ListComponent from "../../components/ListComponent";

export default {
  components: { ListComponent },
  name: "PageViewProjects",
  data() {
    return {
      projects: [
        {
          id: 1,
          icon: "home",
          user: {
            name: "Lester"
          },
          title: "Project Title",
          description: "Description of the project",
          total_cost: "1,000,000.00",
          implementation_period: "2017-2022",
          date_added: "10/9/2019"
        },
        {
          id: 2,
          icon: "home",
          user: {
            name: "Lester"
          },
          title: "Project Title",
          description: "Description of the project",
          total_cost: "1,000,000.00",
          implementation_period: "2017-2022",
          date_added: "10/9/2019"
        },
        {
          id: 3,
          icon: "home",
          user: {
            name: "Lester"
          },
          title: "Project Title",
          description: "Description of the project",
          total_cost: "1,000,000.00",
          implementation_period: "2017-2022",
          date_added: "10/9/2019"
        },
        {
          id: 4,
          icon: "home",
          user: {
            name: "Lester"
          },
          title: "Project Title",
          description: "Description of the project",
          total_cost: "1,000,000.00",
          implementation_period: "2017-2022",
          date_added: "10/9/2019"
        },
        {
          id: 5,
          icon: "home",
          user: {
            name: "Lester"
          },
          title: "Project Title",
          description: "Description of the project",
          total_cost: "1,000,000.00",
          implementation_period: "2017-2022",
          date_added: "10/9/2019"
        }
      ]
    };
  }
};
</script>

<style></style>
