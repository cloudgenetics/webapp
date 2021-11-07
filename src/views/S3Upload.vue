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
        <FormulateInput type="submit" />
        <h4>Submitted Data</h4>
        <pre>{{ data }}</pre>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
export default {
  name: "S3Upload",
  data() {
    return {
      data: {},
      apiMessage: null
    };
  },
  methods: {
    async handleSubmit(data) {
      this.data = data;
    }
  }
};
</script>
