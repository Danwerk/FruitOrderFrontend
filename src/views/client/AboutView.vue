<template>
    <div class="about-us-main" style="min-height: 100vh;">
        <div class="main">
            <div class="about-section">
                <h5>ABOUT US</h5>
                <br>
                <pre>
                        Berries are not our business. Berries are our life.
                        </pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
    },
    props: {},
    emits: []
})

export default class About extends Vue {

}
</script>


<style>
.about-section {
    max-width: 1800px;
    margin: 0 auto;
    padding: 10px;
}
.about-us-main {
   color:#d6afba;
}
</style>
