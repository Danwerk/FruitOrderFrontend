<template>
     <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button" class="btn">
            Back To Dashboard</RouterLink>
<br>
<br>
    <h1>Units</h1>

    <p>
        <RouterLink :to="{ name: 'unitscreate' }">Create</RouterLink>
        <!-- <a href="/Units/Create">Create New</a> -->
        <br>

    </p>


    <table class="table">
        <thead>
            <tr>
                <th>
                    UnitName
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="unit of unitsStore.units" :key="unit.id">
                
                <td>
                    {{ unit.unitName }}
                </td>
                <td>
                    <RouterLink :to="{ name: 'unitsedit', params: { id: unit.id} }">Edit</RouterLink> |
                    <RouterLink :to="{ name: 'unitsdelete', params: { id: unit.id } }">Delete</RouterLink>

                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useUnitStore } from '@/stores/units';
import { UnitService } from "@/services/UnitService";


@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Units extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();


    async mounted(): Promise<void> {
        try {
            console.log("units mounted");
            this.unitsStore.$state.units =
                await this.unitsService.getAll();
            

        } catch (e) {
            console.error(`Error retrieving unit data: ${e}`)
        }
    }
}
</script>