import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUnit } from '@/domain/IUnit';


export const useUnitStore = defineStore({
    id: "units",
    state: () => ({
        units: [
        ] as IUnit[],
        unit: null as IUnit | null,


    }),


    getters: {
        unitCount: (state) => state.units.length,

        getUnitById: (state) => {
            return (unitId: string) =>
                state.units.find((unit) =>
                    unit.id === unitId)
        },



    },
    actions: {
        add(unit: IUnit) {
            this.units.push(unit);
        },


    }
})
