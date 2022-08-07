<template>
<PageComponent>
 <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <Button color="green" :to="{ name: 'CompanyCreate' }">
          <PlusIcon class="w-5 h-5" />
          Add new User
        </Button>
      </div>
</template>
 <div class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">

<div class="">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      <UserList
       v-for="(user, index) in users.data"
       :key="user.id"
       :user ="user"
      />
     </div>
     </div>
  </div>
</div>
</PageComponent>
</template>

<script setup>

import store from "../../store";
import { computed } from "vue";
import UserList from "../../components/UserList.vue";


import PageComponent from "../../components/PageComponent.vue";

store.dispatch("getAllUsers");

const users = computed(() => store.state.users);






</script>