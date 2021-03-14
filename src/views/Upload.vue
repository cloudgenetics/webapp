<template>
  <div class="input-area">
    <FormulateForm @submit="handleSubmit">
      <FormulateInput
        type="file"
        name="data"
        label="genomics dataset"
        placeholder="genomics dataset"
        help="Select one or more datafiles to upload!"
        multiple
        validation=""
      />
      <FormulateInput type="submit" />
      <h4>Submitted Data</h4>
      <pre>{{ data }}</pre>
    </FormulateForm>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      data: {}
    };
  },
  methods: {
    async handleSubmit(data) {
      this.data = data;
    }
  }
};
</script>
