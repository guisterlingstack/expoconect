const supabaseUrl = 'https://lhmefsgbknxmotvctmyv.supabase.co'
const supabaseKey = 'sb_publishable_0p8MDwEFYtPVHxi-DM4_rQ_VkQvbsMC'

const client = supabase.createClient(
  supabaseUrl,
  supabaseKey
)

async function carregarParticipantes() {

  const { data, error } = await client
    .from('participantes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {

    console.error(error)

    return
  }

  const lista =
    document.getElementById('lista')

  lista.innerHTML = ''

  const total = data.length

  const restantes =
    data.filter(p => !p.sorteado).length

  document.getElementById('total').innerText =
    total

  document.getElementById('restantes').innerText =
    restantes

  data.forEach(pessoa => {

    lista.innerHTML += `
      <div class="participante">

        <div>
          <strong>${pessoa.nome}</strong>
          <br>
          <small>${pessoa.genero}</small>
        </div>

        ${
          pessoa.sorteado
          ? '<span class="badge">Sorteado</span>'
          : ''
        }

      </div>
    `
  })
}

async function sortear() {

  const generoSelecionado =
    document.getElementById('filtroGenero').value

  let query = client
    .from('participantes')
    .select('*')
    .eq('sorteado', false)

  if (generoSelecionado !== 'ambos') {

    query =
      query.eq(
        'genero',
        generoSelecionado
      )
  }

  const { data, error } =
    await query

  if (error) {

    console.error(error)

    return
  }

  if (data.length === 0) {

    document.getElementById('resultado').innerText =
      'Nenhum participante disponível'

    return
  }

  const indice =
    Math.floor(
      Math.random() * data.length
    )

  const vencedor =
    data[indice]

  await client
    .from('participantes')
    .update({
      sorteado: true,
      sorteado_at: new Date()
    })
    .eq('id', vencedor.id)

  document.getElementById('resultado').innerText =
    vencedor.nome

  carregarParticipantes()
}

carregarParticipantes()
