<template>
  <q-page padding>
    <div class="row">
      <p>Add Project</p>
      <q-space/>
      <q-btn
        flat round dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <card-component>

      <template v-slot:title>
        General Information
      </template>

      <template v-slot:content>

        <input-component
          label="Project Title"
          hint="Project title must match title in budget proposal"></input-component>

        <options-component
          label="Program or Project"
          :options="[ { label: 'Program', value: '1' }, { label: 'Project', value: '2' } ]"></options-component>

        <select-component
          label="Basis for Implementation"
          hint="Included in any of the following documents"></select-component>

        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
        ></input-component>

        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
        ></input-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Spatial Coverage
      </template>

      <template v-slot:content>

        <select-component
          label="Spatial Coverage"></select-component>

        <select-component
          label="Region/s"></select-component>

        <select-component
          label="Province/s"></select-component>

        <select-component
          label="City and Municipalities"></select-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Level of Approval
      </template>

      <template v-slot:content>

        <select-component
          label="Level of Approval"></select-component>

        <date-component
          label="Approval Date"></date-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Project for Inclusion in Which Programming Document
      </template>

      <template v-slot:content>

        <select-component
          label="PIP Category"></select-component>

        <select-component
          label="CIP Category"></select-component>

        <options-component
          label="TRIP"
          :options="[ { label: 'TRIP', value: 1 }, { label: 'No', value: 0 } ]"></options-component>

        <options-component
          label="RDIP"
          :options="[ { label: 'RDIP', value: 1 }, { label: 'No', value: 0 } ]"></options-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Philippine Development Plan (PDP) Chapter
      </template>

      <template v-slot:content>

        <select-component
                label="Main PDP Chapter"></select-component>

        <select-component
          label="Other PDP Chapters"
          :multiple="true"></select-component>

        <p>PDP Chapter Outcome Statements/Outputs</p>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        0-10 Point Socioeconomic Agenda
      </template>

      <template v-slot:content>

        <select-component
          label="0-10 Point Socioeconomic Agenda"
          :multiple="true"></select-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Sustainable Development Goals (SDG)
      </template>

      <template v-slot:content>

        <select-component
          label="Sustainable Development Goals (SDG)"
          :multiple="true"></select-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Implementation Period
      </template>

      <template v-slot:content>

        <select-component
          label="Implementation Start"
          hint="Target year of start of implementation"></select-component>

        <select-component
          label="Implementation End"
          hint="Target year of project completion"></select-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Project Preparation Details
      </template>

      <template v-slot:content>

        <select-component
          label="Project Preparation Document"></select-component>

        <select-component
          label="Status of Feasibility Status"></select-component>

        <p>Will require NEDA assistance? Yes or No</p>

        <date-component
          label="Target Date of Start/Completion"></date-component>

        <input-component
          label="Others"></input-component>

        <p>Schedule of F/S Cost (In Exact Amount in PhP)</p>

        <input-component
          label="FS Cost for 2017"></input-component>

        <input-component
          label="FS Cost for 2018"></input-component>

        <input-component
          label="FS Cost for 2019"></input-component>

        <input-component
          label="FS Cost for 2020"></input-component>

        <input-component
          label="FS Cost for 2021"></input-component>

        <input-component
          label="FS Cost for 2022"></input-component>

        <input-component
          label="Total FS Cost"></input-component>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

      <template v-slot:title>
        Pre-Construction Costs
      </template>

      <template v-slot:content>

        <p>ROWA Component? Yes or No</p>

        <input-component
          label="Number of affected households"></input-component>

        <p>Schedule of ROWA Cost (In Exact Amount in PhP)</p>

        <input-component
          label="ROWA Cost for 2017"></input-component>

        <input-component
          label="ROWA Cost for 2018"></input-component>

        <input-component
          label="ROWA Cost for 2019"></input-component>

        <input-component
          label="ROWA Cost for 2020"></input-component>

        <input-component
          label="ROWA Cost for 2021"></input-component>

        <input-component
          label="ROWA Cost for 2022"></input-component>

        <input-component
          label="Total ROWA Cost"></input-component>

        <p>Resettlement Component? Yes or No</p>

        <input-component
          label="Number of affected households"></input-component>

        <p>Schedule of Resettlement Cost (In Exact Amount in PhP)</p>

        <input-component
          label="Resettlement Cost for 2017"></input-component>

        <input-component
          label="Resettlement Cost for 2018"></input-component>

        <input-component
          label="Resettlement Cost for 2019"></input-component>

        <input-component
          label="Resettlement Cost for 2020"></input-component>

        <input-component
          label="Resettlement Cost for 2021"></input-component>

        <input-component
          label="Resettlement Cost for 2022"></input-component>

        <input-component
          label="Total Resettlement Cost"></input-component>

        <p>ROWA and Resettlement Plan? Yes or No</p>

      </template>

      <template v-slot:actions>
        <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
      </template>

    </card-component>

    <card-component>

    <template v-slot:title>
      Employment Generation
    </template>

    <template v-slot:content>

      <input-component
              label="No. of persons to be employed"
              type="number"
              hint="Please indicate the no. of persons to be employed by the project outside of the implementing agency"></input-component>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  <card-component>

    <template v-slot:title>
      Funding Source and Mode of Implementation
    </template>

    <template v-slot:content>

      <select-component
        label="Main Funding Source"></select-component>

      <select-component
        label="ODA Funding Institutions"></select-component>

      <input-component
        label="Others"></input-component>

      <select-component
        label="Mode of Implementation/Procurement"></select-component>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  <card-component>

    <template v-slot:title>
      Project Cost <small>in exact amount in PhP</small>
    </template>

    <p>Not Applicable (For PAPs not for funding in the GAA)</p>

    <template v-slot:content>

      <q-markup-table
        class="my-sticky-column-table"
        separator="cell"
        flat
        bordered>
        <thead>
          <tr>
            <th class="text-left">Year</th>
            <th class="text-right">2016 and Prior</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023 and Beyond</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              NG-Local
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              NG-ODA Loan
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              NG-ODA Grant
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              GOCC/GFIs
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              LGUs
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Private Sector
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Others
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Total
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
        </tbody>
      </q-markup-table>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  <card-component>

    <template v-slot:title>
      Infrastructure Cost <small>in exact amount in PhP</small>
    </template>

    <p>Not Applicable (For PAPs not for funding in the GAA)</p>

    <template v-slot:content>

      <q-markup-table
              class="my-sticky-column-table"
              separator="cell"
              flat
              bordered>
        <thead>
        <tr>
          <th class="text-left">Year</th>
          <th class="text-right">2016 and Prior</th>
          <th class="text-right">2017</th>
          <th class="text-right">2018</th>
          <th class="text-right">2019</th>
          <th class="text-right">2020</th>
          <th class="text-right">2021</th>
          <th class="text-right">2022</th>
          <th class="text-right">2023 and Beyond</th>
          <th class="text-right">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-left">
            NG-Local
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            NG-ODA Loan
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            NG-ODA Grant
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            GOCC/GFIs
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            LGUs
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Private Sector
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Others
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        <tr>
          <td class="text-left">
            Total
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
          <td class="text-right">
            <table-input-component></table-input-component>
          </td>
        </tr>
        </tbody>
      </q-markup-table>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  <card-component>

    <template v-slot:title>
      Physical Accomplishments
    </template>

    <template v-slot:content>

      <select-component
        label="Categorization"
        ></select-component>

      <input-component
              label="UACS Code"></input-component>

      <input-component
        label="Updates"
        type="textarea"></input-component>

      <date-component
        label="As of"></date-component>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  <card-component>

    <template v-slot:title>
      Financial Accomplishments In exact amount in PhP
    </template>

    <p>Not Applicable (For PAPs not for funding in the GAA)</p>

    <template v-slot:content>

      <q-markup-table
        class="my-sticky-column-table"
        separator="cell"
        flat bordered>
        <thead>
          <tr>
            <th class="text-left">Year</th>
            <th class="text-right">Amount Included in the NEP</th>
            <th class="text-right">Amount Allocated in the Budget/GAA</th>
            <th class="text-right">Actual Amount Disbursed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">2017</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2018</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2019</td>
            <td class="text-right">
              <table-input-component></table-input-component>
          </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2020</td>
            <td class="text-right">
              <table-input-component></table-input-component>
          </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2021</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2022</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
        </tbody>
      </q-markup-table>

    </template>

    <template v-slot:actions>
      <q-btn icon="save" class="bg-primary text-white">Save</q-btn>
    </template>

  </card-component>

  </q-page>
</template>

<script>
import InputComponent from "../../components/InputComponent";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";
import OptionsComponent from "../../components/OptionsComponent";
import DateComponent from "../../components/DateComponent";
import TableInputComponent from "../../components/TableInputComponent";

export default {
  components: {
    TableInputComponent,
    DateComponent,
    OptionsComponent,
    SelectComponent,
    CardComponent,
    InputComponent},
  name: 'PageAddProject',
  data() {
    return {
      step: 1
    }
  }
};
</script>

<style lang="stylus">
  .my-sticky-column-table
    /* bg color is important for th; just specify one */
    thead tr:first-child th:first-child
      background-color #344955
      opacity 1

    td:first-child
      background-color #344955

    thead tr:first-child th:first-child,
    td:first-child
      position sticky
      left 0
      z-index 1
      color: #FFF
</style>
