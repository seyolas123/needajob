<template>
<PageComponent>

 <template v-slot:header>
      <div class="flex space-x-20">
       <h1 class="text-2xl">Recent Job in your Area</h1>
      
       <p v-if="allowlocation">
        {{ jobs.data.no_of_locations }} jobs found in <span class="text-black text-2xl">{{ address }}
        </span>
        </p>
        <p v-else>
         Turn on your Location to see jobs near you <span class="text-black text-2xl">
        </span>
        </p>
      </div>

      
      
</template>

  <div v-show="allowlocation" class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">
     
     <div v-if="jobs.loading">
       <div class="flex item-center justify-center">
        <div class="flex item-center justify-center">
            <svg xmlns:svg="http://www.w3.org/2000/svg" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            version="1.0" width="64px" height="64px" 
            viewBox="0 0 128 128" xml:space="preserve">
            <rect x="0" y="0" width="100%" height="100%" fill="#e3e3e3" /><g>
            <path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#000000"/>
            <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1200ms" repeatCount="indefinite"></animateTransform></g></svg>
        </div>
       </div>
     </div>
                
     <div v-else-if="jobs.data.locations.length">
    
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        <LocationList
        v-for="(job, index) in jobs.data.locations"
        :key="job.id"
        :job ="job"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${index * 0.1}s` }"
        />
        </div>

       
      </div>

     <div v-else>
        <div class="flex justify-center">
       Sorry, No Jobs Available in {{ address }}
        </div>
     </div>
     
  </div>
</div>

<div class="divide-y"></div>

</PageComponent>

</template>

<script setup>
import LocationList from "../components/LocationList.vue";
import PageComponent from "../components/PageComponent.vue";
import axios from "axios";
import store from "../store";
import { computed, onMounted, ref } from "vue";

let address = ref('');
let allowlocation = ref(false);

let location_details = ref({
   latitude: "",
   longitude: ""
});

const jobs = computed(() => store.state.jobsbylocation );

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    position => {
      //console.log(position.coords.latitude);
      //console.log(position.coords.longitude);
      getStreetAddress(position.coords.latitude, position.coords.longitude);

      location_details.value.latitude = position.coords.latitude;
      location_details.value.longitude = position.coords.longitude;

      console.log(location_details.value);

      allowlocation.value = true;

      store.dispatch("getJobsByLocation", { ...location_details.value } );

    },
    error => {
      allowlocation.value = false;
      console.log(error.message);
    }
  )
})

store.dispatch("getJobsByLocation", { ...location_details.value } );


async function getStreetAddress(lat, long) {
          try {
            var { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ 
            lat +
            "," +
            long +
            "&key=AIzaSyD7rtONqMNxqW_TrUp_W85ZPuEX-3zkInA");
            if (data.error_message){
              console.log(data.error_message);
            }else {
              address.value = data.results[0].formatted_address;
              allowlocation.value = true;
            }
          }catch(error){
            console.log(error.message);
          }
}



</script>