<template>
  <div class="modal fade" id="statusModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ method }} status</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="formSwitch">
            <div v-if="method === 'Edit'" class="mb-2">
              <label class="form-label">Actual Status Code</label>
              <input
                type="text"
                class="form-control"
                :value="ogCode"
                disabled>
            </div>
            <div class="mb-2">
              <label v-if="method === 'Edit'" class="form-label">New Status Code</label>
              <label v-else class="form-label">Status Code</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="status.code"
                :disabled="method === 'Delete'">
            </div>
            <div class="mb-2">
              <label class="form-label">Status name</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="status.name"
                :disabled="method === 'Delete'">
            </div>
            <button
              type="button"
              class="btn btn-secondary me-2"
              data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-target="#resultModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              :disabled="status.name.length < 1">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="resultModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ method }} status</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div v-if="!done">
            <span>Waiting response</span>
          </div>
          <div v-else>
            <span v-if="success">Success</span>
            <span v-else>Failure</span>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            data-bs-target="#resultModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            :disabled="!done">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StatusForm',
  props: {
    propStatus: Object,
    method: String,
    ogCode: Number
  },
  emits: ['refresh'],
  data () {
    return {
      status: { name: '' },
      done: false,
      success: false
    }
  },
  beforeUpdate () {
    this.status = this.propStatus
  },
  methods: {
    formSwitch () {
      this.done = false
      this.success = false
      switch (this.method) {
        case 'Add':
          axios.post('/api/status', this.status)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        case 'Edit':
          axios.put('/api/status/' + this.ogCode, this.status)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        case 'Delete':
          axios.delete('/api/status/' + this.status.code)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        default:
          break
      }
    }
  }
}
</script>

<style>

</style>
