<template>
  <div class="hello">
    <div align="center"><b>Tasks</b></div>
    <table v-if="tasks && tasks.length" align="center" border={1}>
      <tr v-for="task of tasks">
        <td>{{task.id}}</td>
        <td>{{task.name}}</td>
      </tr>
    </table>

    <div align="center"><b>Files</b></div>
    <table v-if="files && files.length" align="center" border={1}>
      <tr v-for="file of files">
        <td>{{file.entry.id}}</td>
        <td>{{file.entry.name}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as AlfrescoApi from 'alfresco-js-api'

export default {
  name: 'HelloWorld',
  data () {
    return {
      files: [],
      tasks: []
    }
  },

  methods: {
    getFiels () {
      this.alf.core.nodesApi.getNodeChildren('-my-').then(data => {
        console.log('requestNodes ', data)
        this.files = data.list.entries;
      },
      error => {
        console.log('Error', error)
      })
    },

    getTasks () {
      var requestTasks = new this.alf.activiti.TaskQueryRequestRepresentation()

      this.alf.activiti.taskApi.listTasks(requestTasks).then(data => {
        console.log('listTasks ', data)
        this.tasks = data.data;
      },
      error => {
        console.log('Error', error)
      })
    }
  },

  created () {
    this.alf = new AlfrescoApi({
      hostEcm: 'http://localhost:8888',
      hostBpm: 'http://localhost:8888',
      provider: 'ALL'
    })

    this.alf.login('admin', 'admin').then(data => {
      console.log('API called successfully Login in performed ', data)
      this.getTasks()
      this.getFiels()
    },
    error => {
      console.log('Error', error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
