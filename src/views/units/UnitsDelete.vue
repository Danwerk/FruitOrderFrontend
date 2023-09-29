<template>
    <h1>Delete {{ id }}</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>Unit</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                UnitName
            </dt>
            <dd class="col-sm-10">
                {{ unitName }}
            </dd>
        </dl>

        <div class="form-group">
            <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
            <RouterLink to="/Units">Back to List</RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { UnitService } from '@/services/UnitService';
import { useUnitStore } from '@/stores/units';
import router from '@/router';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class UnitsDelete extends Vue {
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


    async Delete(): Promise<void> {
        console.log("units delete clicked")
        console.log(this.unitName)
        console.log(this.id)
        if (this.unitName) {
            var res = await this.unitsService.delete(this.id);
            console.log(res)
        }
        router.push("/units")
    }

}
</script>