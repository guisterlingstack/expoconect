const supabaseUrl = 'https://lhmefsgbknxmotvctmyv.supabase.co'
const supabaseKey = 'sb_publishable_0p8MDwEFYtPVHxi-DM4_rQ_VkQvbsMC'

const client = supabase.createClient(
  supabaseUrl,
  supabaseKey
)

async function registrar() {

  const nome =
    document.getElementById('nome').value.trim()

  const genero =
    document.getElementById('genero').value

  if (!nome) {

    alert('Digite seu nome')

    return
  }

  if (!genero) {

    alert('Selecione seu gênero')

    return
  }

  const { error } = await client
    .from('participantes')
    .insert([
      {
        nome,
        genero
      }
    ])

  if (error) {

  console.error(error)

  alert(
    'Erro: ' +
    error.message
  )

  return
}

  document.getElementById('mensagem').innerText =
    'Participação registrada com sucesso!'

  document.getElementById('nome').value = ''

  document.getElementById('genero').value = ''
}
