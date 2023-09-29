<template>
    <h1>Edit {{ id }}</h1>

    <h4>Unit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="UnitName">UnitName</label>
                <input v-model="unitName" class="form-control" type="text" />
            </div>
            <div class="form-group">
                <input @click="Update()" type="submit" value="Save" class="btn btn-primary" />
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
        id: String,
    },
    emits: [],

})
export default class UnitsEdit extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();

    id!: string;
    unitName: string = '';

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        try {
            var unit = await this.unitsService.get(this.id);
            this.unitsStore.$state.unit = unit
            this.unitName = unit.unitName;
        } catch (e) {
            console.error(`Error retrieving unit data: ${e}`)
        }

    }


    async Update(): Promise<void> {
        console.log("units update clicked")
        console.log(this.unitName)
        console.log(this.id)
        if (this.unitName) {
            var res = await this.unitsService.put(this.id, {
                id: this.id,
                unitName: this.unitName
            })

            console.log(res)
            router.push("/units")
        }
    }
}
</script>