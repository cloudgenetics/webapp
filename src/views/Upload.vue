<template>
  <div class="col-md-12 mb-3">
    <h1>New genome dataset</h1>
    <div class="input-area">
      <FormulateForm @submit="handleSubmit">
        <FormulateInput
          type="file"
          name="data"
          placeholder="genomics dataset"
          help="Select one or more datafiles to upload!"
          multiple
          validation=""
        />
        <FormulateInput type="submit" label="upload" />
        <h4>uploaded data</h4>
        <pre>{{ data }}</pre>
      </FormulateForm>
    </div>
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

<style scoped>
.formulate-input[data-classification="button"]::v-deep button {
  background-color: #424242;
  color: white;
  border: 1px solid;
}
</style>