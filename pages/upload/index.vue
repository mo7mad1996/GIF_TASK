<template>
  <div>
    <UploadForm @update_list="update_list" />
    <UploadList :update="update" />
  </div>
</template>

<script>
// components
import UploadForm from "~/components/upload/form";
import UploadList from "~/components/upload/list";

export default {
  components: {
    UploadForm,
    UploadList,
  },
  data() {
    return { update: false };
  },
  methods: {
    update_list() {
      this.update = !this.update;
    },
  },
};
</script>
