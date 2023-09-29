<template>
    <h1>Edit {{ id }}</h1>

    <h4>Order</h4>
    <hr />
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class OrdersEdit extends Vue { 
    id!: string;
}
</script>