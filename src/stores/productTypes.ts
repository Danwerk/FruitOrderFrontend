import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProductType } from '@/domain/IProductType';
import { ProductTypeService } from '@/services/ProductTypeService';
import type { IServiceResult } from '@/domain/IServiceResult';

export const useProductTypesStore = defineStore({
  id: "productTypes",
  state: () => ({
    productTypes: [
    ] as IProductType[],
    productType: null as IProductType | null,
  }),


  getters: {
     getProductTypeById: (state) => {
        return (productTypeId: string) => 
        state.productTypes.find((productType) => 
        productType.id === productTypeId)
     },
  },


  actions: {
    add(productType: IProductType) {
      this.productTypes.push(productType);
    },

    async getProductTypes() : Promise<IProductType[]>{
        const productTypeService = new ProductTypeService();
        this.productTypes = await productTypeService.getAll();
        return this.productTypes;
    },
  }
})
