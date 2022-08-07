<template>
<PageComponent>

 <template v-slot:header>
      <h1 class="text-2xl">Recent Job listings</h1>
</template>

  <div class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">
     
     <div v-if="jobs.loading">
        <div class="flex item-center justify-center">
            <svg xmlns:svg="http://www.w3.org/2000/svg" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            version="1.0" width="64px" height="64px" 
            viewBox="0 0 128 128" xml:space="preserve">
            <rect x="0" y="0" width="100%" height="100%" fill="#e3e3e3" /><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#000000"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></g></svg>
        </div>
      </div>

      <div v-else-if="jobs.data.length">

     <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
     
      
      <JobPublicList
       v-for="(job, index) in jobs.data"
       :key="job.id"
       :job ="job"
       class="opacity-0 animate-fade-in-down"
       :style="{ animationDelay: `${index * 0.1}s` }"
      />
      </div>

      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of jobs.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === jobs.links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
     </div>

      <div v-else>
        <div class="flex justify-center">
        No Jobs Available
        </div>
     </div>

  </div>
</div>

<div class="divide-y"></div>

</PageComponent>

  
</template>

<script setup>
import JobPublicList from "../components/JobPublicList.vue";
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import { computed } from "vue";

const jobs = computed(() => store.state.jobs);

//console.log(jobss)
store.dispatch("getAllJobs");

function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  store.dispatch("getAllJobs", { url: link.url });
}
   
</script>