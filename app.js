const supabaseUrl = 'SUA_URL'
const supabaseKey = 'SUA_CHAVE'

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

    alert('Erro ao registrar')

    return
  }

  document.getElementById('mensagem').innerText =
    'Participação registrada com sucesso!'

  document.getElementById('nome').value = ''

  document.getElementById('genero').value = ''
}
