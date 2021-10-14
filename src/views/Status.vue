<template>
  <div>
    <div class="my-3 d-flex flex-column flex-sm-row justify-content-around">
      <h1 class="text-center">Status</h1>
      <button
        class="btn btn-primary"
        @click="addMethod()"
        data-bs-toggle="modal"
        data-bs-target="#statusModal">
        Add new status
      </button>
    </div>
    <table class="table table-hover table-sm text-center">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <!-- <th>Status</th> -->
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        <StatusTableEntry
          v-for="status in statusList"
          :key="status.code"
          :code="status.code"
          :name="status.name"
          @edit="editMethod(status)"
          @delete="deleteMethod(status)"
        />
      </tbody>
    </table>
    <StatusForm
      :propStatus="singleStatus"
      :method="method"
      :ogCode="ogCode"
      @refresh="refreshData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import StatusTableEntry from '../components/StatusTableEntry.vue'
import StatusForm from '../components/StatusForm.vue'

export default {
  name: 'Status',
  components: { StatusTableEntry, StatusForm },
  data () {
    return {
      statusList: [],
      method: 'add',
      singleStatus: {},
      showModal: false,
      ogCode: 0
    }
  },
  mounted () {
    axios.get('/api/status')
      .then(res => { this.statusList = res.data })
      .catch(err => console.log(err))
  },
  methods: {
    addMethod () {
      // this.showModal = true
      this.method = 'Add'
      this.singleStatus = { name: '' }
    },
    editMethod (status) {
      this.method = 'Edit'
      this.singleStatus = Object.assign({}, status)
      this.ogCode = status.code
    },
    deleteMethod (status) {
      this.method = 'Delete'
      this.singleStatus = Object.assign({}, status)
    },
    refreshData () {
      axios.get('/api/status')
        .then(res => { this.statusList = res.data })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
