<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

interface Student {
  id: number
  name: string
  surname: string
  gpa: number
}

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('Error fetching students:', error)
    })
})
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-bold text-center mb-6">Student List</h1>

    <div class="flex flex-wrap justify-center gap-4 mt-4">
      <div
        v-for="student in students"
        :key="student.id"
        class="border border-gray-300 rounded-lg p-4 w-[220px] bg-blue-50 shadow-md"
      >
        <p><strong>Name:</strong> {{ student.name }}</p>
        <p><strong>Surname:</strong> {{ student.surname }}</p>
        <p><strong>GPA:</strong> {{ student.gpa }}</p>
      </div>
    </div>
  </div>
</template>
