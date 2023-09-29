<template>
    <h1>Create</h1>

    <h4>Unit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="UnitName">UnitName</label>
                <input v-model="unitName" class="form-control" type="text" />
            </div>
            <div class="form-group">
                <input @click="Create()" type="submit" value="Create" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/Units">Back to List</RouterLink>
    </div>
</template>



<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useUnitStore } from '@/stores/units';
import { UnitService } from "@/services/UnitService";
import router from '@/router';


@Options({
    components: {
    },
    props: {
        unitId: String
    },
    emits: []
})
export default class UnitsCreate extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();


    id!: string;
    unitName!: string;
    

   errorMessage: string | null = null;

    async Create(): Promise<void> {
        if (this.unitName) {
            var res = await this.unitsService.add({
                unitName: this.unitName
                
            })
            router.push("/units")
        
        }

    }
}


</script>