<template>
  <div>
    Admin

    <button @click="signOut">Loogout</button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const router = useRouter()

const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    router.push('/')
  }
}
</script>
