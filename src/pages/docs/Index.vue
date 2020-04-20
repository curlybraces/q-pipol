<template>
  <q-page padding>
    <div class="text-h6">Introduction</div>
    <q-separator color="primary"></q-separator>

    <div class="q-pt-md">
      <q-item-label header class="q-pa-none q-mb-md"
        >A. About the System</q-item-label
      >
      <p>
        The Public Investment Program Online (PIPOL) is an online database
        system that manages data entry and updates on programs, activities and
        projects (PAPs) under the Public Investment Program (PIP), which
        includes the PIP’s Core Investment Programs and Projects (CIPs) and
        Three Year Rolling Infrastructure Program (TRIP), including the
        generation of PIP/CIP/TRIP-related reports. The system is designed to:
        (i) allow online submission by agencies of information regarding their
        priority programs and projects, including project details and status
        updates; (ii) allow the NEDA Secretariat to review and validate agency
        submissions; and (iii) assist the NEDA Secretariat in generating
        reports. Agencies shall be guided by the PIP Guidelines, CIP Guidelines
        issued in June 2016 and the DBM and NEDA Joint Circular No. 2016-01
        issued on 29 January 2016, for the PIP, CIP and TRIP, respectively.
      </p>

      <q-item-label header class="q-pa-none q-mb-md"
        >B. General Process Flow and User Administration and
        Management</q-item-label
      >
      <p>
        The National Economic Development Authority (NEDA) shall issue a notice
        for the online submission of Agency PIP/TRIP through the PIPOL on or
        before the 15th of July. The deadline for the online submission by the
        agencies is on every 15th of September.
      </p>
      <ul style="list-style-type: none;">
        <li>
          1. National government agencies/offices and independent attached and
          Government-owned and Controlled Corporations (GOCCs) shall encode PAPs
          for inclusion in the PIP/CIP/TRIP through the system (Encoder).
          National government agencies/offices may request additional accounts
          for their attached agencies and GOCCs.
        </li>
        <li>
          2. The NEDA Secretariat (consisting of the NEDA sector staffs and
          regional offices), as PIP/CIP/TRIP focal, shall validate agency
          submission (Reviewer).
        </li>
        <li>
          3. The lead PIP/CIP/TRIP focal of a project will consolidate and
          finalize agency submission and inputs from other PIP/CIP/TRIP focals
          (for projects contributing to cross-cutting sectors/chapters/themes)
          (Approver).
        </li>
        <li>
          4. The NEDA-Public Investment Staff (PIS), as lead Secretariat for the
          PIP/CIP; and Infrastructure Staff (IS), as lead Secretariat for the
          TRIP, shall be the main coordinator and shall manage PIP/CIP and
          TRIP-related concerns, respectively (Administrator).
        </li>
      </ul>
    </div>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="orange-10" />
    </q-page-scroller>
  </q-page>
</template>

<script>
export default {
  name: 'TutorialIndex'
};
</script>
