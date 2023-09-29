import type { ICart } from '@/domain/ICart';
import type { IProductType } from '@/domain/IProductType';
import Vue from 'vue'
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';

import { defineStore } from 'pinia';

export const useIndexStore = defineStore({
    id: "index",
    state: () => ({
      
    }),
    getters: {
        
    },
    actions: {
    },
  });
