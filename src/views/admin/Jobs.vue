<template>
<PageComponent>
 <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Jobs</h1>
        <Button color="green" :to="{ name: 'CompanyCreate' }">
          <PlusIcon class="w-5 h-5" />
          Add new Jobs
        </Button>
      </div>
</template>
 <div class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">

<div class="">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      <JobList
       v-for="(job, index) in jobs.data"
       
       :key="job.id"
       :job ="job"
       :style="{ animationDelay: `${index * 0.1}s` }"
      />
     </div>
     </div>
  </div>
</div>
</PageComponent>
</template>

<script setup>
import JobList from "../../components/JobList.vue";
import store from "../../store";
import { computed } from "vue";
import PageComponent from "../../components/PageComponent.vue";

 const jobs = computed(() => store.state.jobs );

</script>