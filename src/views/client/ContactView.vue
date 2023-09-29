<template>
  <div class="contact" style="min-height: 100vh;">
    <div class="col-md-7 col-lg-5 col-xl-4 mb-md-0 mb-4" style="padding-top: 15px; padding-left: 40px;">
      <!-- Links -->
      <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
      <p>
        <i class="fa fa-envelope me-3"></i>
        fruit.order@gmail.com
      </p>
      <p><i class="fa fa-phone me-3"></i> +372 555 66 72</p>
      <p><i class="fa fa-home me-3"></i> Kriidi 11, Tallinn</p>
      <p>
        <a href="" class="me-4 text-reset">
          <i class="fa fa-facebook me-3">&nbsp;&nbsp;</i>https://www.fb.com/
        </a>
      </p>
      <p>
        <a href="" class="me-4 text-reset">
          <i class="fa fa-instagram me-3">&nbsp;&nbsp;</i>https://www.instagram.com/
        </a>
      </p>
      <br>
    </div>

  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
  },
  props: {},
  emits: []
})
export default class ContactView extends Vue { }
</script>
  
<style>
.contact {
  color: #d6afba;
}
</style>