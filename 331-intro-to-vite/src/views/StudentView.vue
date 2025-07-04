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
  <div>
    <h1>Student List</h1>
    <div class="students-container">
      <div
        class="student-card"
        v-for="student in students"
        :key="student.id"
      >
        <p><strong>Name:</strong> {{ student.name }}</p>
        <p><strong>Surname:</strong> {{ student.surname }}</p>
        <p><strong>GPA:</strong> {{ student.gpa }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.students-container {
justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.student-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 220px;
  background-color: #f2f8ff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
