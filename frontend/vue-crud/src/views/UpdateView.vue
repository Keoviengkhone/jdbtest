<template>
    <div class="q-pa-md">
        <div class="top">
            <div class="left">
                <q-btn round icon="keyboard_arrow_left" @click="onHome()" unelevated
                    style="color: white; background-color:#3771FF; font-size: 12px;" />
                <div style="margin-left: 10px;font-size: 16px;">ແກ້ໄຂຂໍ້ມູນພະນັກງານ</div>
            </div>
        </div>
        <div class="q-pa-md" style="background-color: white;border-radius: 8px;">
            <q-form @submit="onSubmit" class="q-gutter-md" enctype=“multipart/form-data”>
                <q-input v-model="uuid" label="ລະຫັດພະນັກງານ" readonly />
                <q-input v-model="emp_name" label="ຊຶິ ແລະ ນາມສະກຸນ" />
                <q-input v-model="salary" label="ເງິນເດືອນ" />
                <q-input v-model="dep_uuid" label="ພະແນກ" />
                <!-- <q-file v-model="picProfile" label="ເລືອກຮູບ" /> -->
                <q-btn label="ແກ້ໄຂ" type="submit" color="primary" />
            </q-form>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
const route = useRoute()

const uuid = ref(route.params.emp_uuid)
const emp_name = ref('')
const salary = ref('')
const dep_uuid = ref('')

const fetchData = () => {
    fetch("http://localhost:3000/api/jdb/employees/" + uuid.value)
        .then(res => res.json())
        .then((result) => {
            emp_name.value = result.emp_name
            salary.value = result.salary
            dep_uuid.value = result.dep_uuid
        })
}
fetchData()

const onSubmit = () => {
    // alert(emp_name.value, salary.value, dep_uuid.value)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "emp_uuid": uuid.value,
        "emp_name": emp_name.value,
        "salary": salary.value,
        "dep_uuid": dep_uuid.value
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/api/jdb/employee/update", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result.message),
            router.push('/')
        })
        .catch(error => console.log('error', error));
        
}

const onHome = () => {
    router.push('/')
}


</script>