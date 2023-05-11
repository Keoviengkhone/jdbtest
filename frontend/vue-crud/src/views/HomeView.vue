<template>
  <div class="q-pa-md">
    <q-table
      title="ຂໍ້ມູນພະນັກງານທັງໝົດ"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <!-- <template v-slot:body-cell-profile="props">
        <q-td :props="props" >
          <q-img 
            :src="props.row.profile"
          />
        </q-td>
      </template> -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row.emp_uuid)" />
          <q-btn icon="delete" @click="onDelete(props.row.emp_uuid)" />
          
          
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style>
  body{
    font-family: 'Noto Sans Lao' ;
  }
  .q-table th{
   
    font-weight: bold;
    font-size: 15px;
  }
</style>

<script setup>

import { ref } from 'vue';

const columns = ref([
  { name: 'number', align: 'left', label: 'ລຳດັບ', field: 'ID', sortable: true },
  { name: 'emp_name',align: 'left' , label: 'ຊື່ ແລະ ນາມສະກຸນ', field: 'emp_name', sortable: true },
  { name: 'profile',align: 'center', label: 'ຮູບພາບ', field: 'profile', sortable: true },
  { name: 'salary',align: 'left', label: 'ເງິນເດືອນ', field: 'salary' , sortable: true },
  { name: 'dep_name',align: 'left', label: 'ພະແນກ', field: 'dep_name' ,  sortable: true }
  , { name: 'action',align: 'center', label: 'action', field: 'emp_uuid' ,  sortable: true }
])

const rows = ref([])

const fetchData = () =>{
  fetch("http://localhost:3000/api/jdb/employees")
  .then(res => res.json())
  .then((result) => {
    rows.value = result
  })
}
fetchData()

const onEdit = (emp_uuid) => {
  alert(emp_uuid + "edit")
}
const onDelete = (emp_uuid) => {
  alert(emp_uuid + "delete")
}

</script>


