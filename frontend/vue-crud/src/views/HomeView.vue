<template>
  <div class="q-pa-md">
    <div class="top">
      <div class="left">
        <q-btn round icon="keyboard_arrow_right" unelevated
          style="color: white; background-color:#3771FF; font-size: 12px;" />
        <div style="margin-left: 10px;">ຂໍ້ມູນພະນັກງານທັງໝົດ</div>
      </div>

      <div class="end">
        <q-btn icon="add" unelevated @click="onCreate">ເພີ່ມພະນັກງານ</q-btn>
      </div>
    </div>
    <q-table :rows="rows" :columns="columns" row-key="name">
      <!-- <template v-slot:body-cell-profile="props">
        <q-td :props="props" >
          <q-img 
            :src="props.row.profile"
          />
        </q-td>
      </template> -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row.emp_uuid)" style="margin-right: 10px; color: #3771FF;" />
          <q-btn icon="delete_outline" @click="onDelete(props.row.emp_uuid)" style="color: #C70039;" />


        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style>
body {
  font-family: 'Noto Sans Lao';
  background-color: #E9E9E9;
}

.q-table th {

  font-weight: bold;
  font-size: 15px;
}

.top {
  background-color: white;
  padding: 8px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 20px;
  display: flex;

  justify-content: space-between;

}

.top .left {
  display: flex;
  align-items: center;
}

.top .end {
  color: white;
  background-color: #3771FF;
  border-radius: 8px;
  right: 0;
}

.q-table__card {
  box-shadow: none;
  border-radius: 8px;
}

thead {
  background-color: #3771FF;
  color: white;
}
</style>

<script setup>

import { ref } from 'vue';
import router from '../router'

const columns = ref([
  { name: 'number', align: 'left', label: 'ລຳດັບ', field: 'ID', sortable: true },
  { name: 'emp_name', align: 'left', label: 'ຊື່ ແລະ ນາມສະກຸນ', field: 'emp_name', sortable: true },
  // { name: 'profile', align: 'center', label: 'ຮູບພາບ', field: 'profile', sortable: true },
  { name: 'salary', align: 'left', label: 'ເງິນເດືອນ', field: 'salary', sortable: true },
  { name: 'dep_name', align: 'left', label: 'ພະແນກ', field: 'dep_name', sortable: true }
  , { name: 'action', align: 'center', label: 'ຈັດການ', field: 'emp_uuid', sortable: true }
])

console.log(import.meta.env)

const rows = ref([])

const fetchData = () => {
  fetch("http://localhost:3000/api/jdb/employees")
    .then(res => res.json())
    .then((result) => {
      rows.value = result
    })
}
fetchData()

const onEdit = (emp_uuid) => {
  // alert(emp_uuid + "edit")
  router.push('/update/'+emp_uuid)
  
}



const onDelete = (emp_uuid) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "uuid": emp_uuid
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/api/jdb/employee/delete",
    requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message),
      fetchData()
    })
    .catch(error => console.log('error', error));
}

const onCreate = () => {
  router.push('/create')
}

</script>