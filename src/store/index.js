import axios from "axios";
import { createStore } from "vuex";
import axiosClient from "../axios";

const tempJobs = [
   {
    id: 1,
    job_unique_id: 456789,
    title: 'Lead, Global Product Commercialization',
    description: 'As a Lead Strategist in the Global Product Commercialization (GPC) team at Indeed, you will drive key business decisions, deliver on strategic initiatives and identify  value-creation opportunities across the business, and especially for products and tests rolling out in Japan. You will work closely with Product Managers, Marketing, Sales, ...',
    opening_date: '2021-12-20 19:00:00',
    closing_date: '2021-12-20 19:00:00',
    type: 'fulltime',
    location: 'Sao Paulo',
    experience_level: 'Intermediate',
    salary: '3000 - 5000',
    company: {
      id: 1,
      name: 'Paullo Enterprises',
      description: 'a good company',
      location: 'Sao Paulo, Brazil'
    }
   },

    {
     id: 2,
     job_unique_id: 256789,
     title: 'Lead, Global Product Commercialization',
     description: 'As a Lead Strategist in the Global Product Commercialization (GPC) team at Indeed, you will drive key business decisions, deliver on strategic initiatives and identify  value-creation opportunities across the business, and especially for products and tests rolling out in Japan. You will work closely with Product Managers, Marketing, Sales, ...',
     opening_date: '2021-12-20 19:00:00',
     closing_date: '2021-12-20 19:00:00',
     type: 'fulltime',
     location: 'Sao Paulo',
     experience_level: 'Intermediate',
     salary: '3000 - 5000',
     company: {
       id: 1,
       name: 'Paullo Enterprises',
       description: 'a good company',
       location: 'Sao Paulo, Brazil'
     }
    },

    {
      id: 3,
      job_unique_id: 45609,
      title: 'Lead, Global Product Commercialization',
      description: 'As a Lead Strategist in the Global Product Commercialization (GPC) team at Indeed, you will drive key business decisions, deliver on strategic initiatives and identify  value-creation opportunities across the business, and especially for products and tests rolling out in Japan. You will work closely with Product Managers, Marketing, Sales, ...',
      opening_date: '2021-12-20 19:00:00',
      closing_date: '2021-12-20 19:00:00',
      type: 'fulltime',
      location: 'Sao Paulo',
      experience_level: 'Intermediate',
      salary: '3000 - 5000',
      company: {
        id: 1,
        name: 'Paullo Enterprises',
        description: 'a good company',
        location: 'Sao Paulo, Brazil'
      }
     },

     {
      id: 4,
      job_unique_id: 656789,
      title: 'Lead, Global Product Commercialization',
      description: 'As a Lead Strategist in the Global Product Commercialization (GPC) team at Indeed, you will drive key business decisions, deliver on strategic initiatives and identify  value-creation opportunities across the business, and especially for products and tests rolling out in Japan. You will work closely with Product Managers, Marketing, Sales, ...',
      opening_date: '2021-12-20 19:00:00',
      closing_date: '2021-12-20 19:00:00',
      type: 'fulltime',
      location: 'Sao Paulo',
      experience_level: 'Intermediate',
      salary: '3000 - 5000',
      company: {
        id: 1,
        name: 'Paullo Enterprises',
        description: 'a good company',
        location: 'Sao Paulo, Brazil'
      }
     },
   
   
];

const store = createStore({
   state: {
     user: {
        data: {},
        token: sessionStorage.getItem("TOKEN"),
     },
     users: {
      loading:false,
      data: []
     },
     jobs: {
      loading: false,
      links: [],
      data: []
     },
     jobsbylocation: {
      loading: false,
      data: []
     },
     company: {
      loading:false,
      data:[]
     },
   },

   getters:{

   },

   actions: {
    //register a user
    register({commit}, user) {
        return axiosClient.post('/register', user)
          .then((response) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
          })
      },

      //login a user
      login({commit}, user) {
        return axiosClient.post('/login', user)
          .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
          })
      },

      //logout a user
      logout({commit}) {
        return axiosClient.post('/logout')
          .then(response => {
            commit('logout')
            return response;
          })
      },

      //get single users
      getUser({commit}) {
        return axiosClient.get('/user')
        .then(res => {
          //console.log(res);
          commit('setUser', res.data)
        })
      },

      //get all users
      getAllUsers({commit}) {
        return axiosClient.get('/users')
        .then(res => {
          console.log(res);
          commit('setUsers', res.data.users);
          return res;
        })
      },

      //get all jobs
      // getAllJobs({commit}){
      //   commit('setJobLoading', true);
      //   return axiosClient.get('/jobs')
      //   .then(res => {
      //     commit('setJobs', res.data);
      //     commit('setJobLoading', false);
      //     //console.log(res);
      //   })
      // },

      getAllJobs({ commit }, {url = null} = {}) {
        commit('setJobLoading', true)
        url = url || "/jobs";
        return axiosClient.get(url).then((res) => {
          commit('setJobLoading', false)
          commit("setJobs", res.data);
          return res;
        });
      },

      getJobsByLocation({ commit }, locations) {
        commit('setJobLocationLoading', true)
        console.log(locations);
        return axiosClient.post('/area/location', locations).then((res) => {
          commit('setJobLocationLoading', false)
          commit('setJobLocations', res);
          console.log(res);
          return res;
        })
      },

      

      //get jobs by user locations
      

      //get all companies
      getCompanies({commit}) {
        return axiosClient.get('/company')
        .then(res => {
          console.log(res);
          commit('setCompany', res.data);
          return res;
        })
      },
   },

   mutations: {
    logout: (state) => {
        state.user.token = null;
        state.user.data = {};
        sessionStorage.removeItem("TOKEN");
      },

      setJobs: (state, jobs) => {
         state.jobs.links = jobs.meta.links;
         state.jobs.data = jobs.data;
      },

      setJobLocations: (state, jobs) => {
        state.jobsbylocation.data = jobs.data;
     },
  
      setUser: (state, user) => {
        state.user.data = user;
      },

      setUsers: (state, users) => {
        state.users.data = users
      },

      setCompany: (state, company) => {
        state.company.data = company.data
      },

      setToken: (state, token) => {
        state.user.token = token;
        sessionStorage.setItem('TOKEN', token);
      },


      //loading mutations
      setJobLoading: (state, val) => {
        state.jobs.loading = val;
      },
      setJobLocationLoading: (state, val) => {
        state.jobsbylocation.loading = val;
      },


   },

   modules: {

   }

});

export default store;