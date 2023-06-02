<template>
  <div class="q-pa-md">
    <div class="top">
      <div class="left">
        <q-btn round icon="keyboard_arrow_left" @click="onHome()" unelevated
          style="color: white; background-color:#3771FF; font-size: 12px;" />
        <div style="margin-left: 10px;font-size: 16px;">ເພີ່ມພະນັກງານໃຫມ່</div>
      </div>
    </div>
    <div class="q-pa-md" style="background-color: white;border-radius: 8px;">
      <q-form @submit="onSubmit" class="q-gutter-md" enctype=“multipart/form-data”>
        <q-input v-model="emp_name" label="ຊຶິ ແລະ ນາມສະກຸນ" />
        <q-input v-model="salary" label="ເງິນເດືອນ" />
        <q-input v-model="dep_uuid" label="ພະແນກ" />
        <!-- <q-file v-model="picProfile" label="ເລືອກຮູບ" /> -->
        <!-- <q-uploader label="Auto Uploader" auto-upload :url="getUrl" multiple /> -->
        <q-btn label="Submit" type="submit" color="primary" />
      </q-form>
    </div>

  </div>
</template>

<style>
.q-field {
  width: 530px;
}

body {
  font-family: 'Noto Sans Lao';
  background-color: #E9E9E9;
}
</style>

<script setup>
import { ref } from 'vue'
import router from '../router'

const emp_name = ref('')
const salary = ref('')
const dep_uuid = ref('ecf73724-4374-413a-a0ca-6d74f6b57267')
// const picProfile = ref(null)

const onHome = () => {
  router.push('/')
}

const onSubmit = () => {
  var formdata = new FormData();
  formdata.append("emp_name", emp_name.value);
  formdata.append("salary", salary.value);
  formdata.append("dep_uuid", dep_uuid.value);
  // formdata.append("picProfile", picProfile.files[0]); 

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/api/jdb/employees/add", requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message)
    })
    .catch(error => console.log('error', error));
  router.push('/')
}
</script>