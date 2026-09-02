import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


//Cria um tipo para a tarefa, com id, texto e concluida
type Tarefa = {
  id: number;
  texto: string;
  concluida: boolean;
};


//Cria um tipo para filtro, limitado a 3 opções: 'todas', 'pendentes' e 'concluidas'
type Filtro = 'todas' | 'concluidas' | 'pendentes';


export default function HomeScreen() {
  /* UseStates necessários*/
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, texto: "Estudar React Native", concluida: false },  //estado useState para tarefas, cria 2 por padrão, para testes no navegador
    { id: 2, texto: "Estudar Git", concluida: false },
  ]);
  const [textoTarefa, setTextoTarefa] = useState(''); //// estado que armazena o texto da nova tarefa, inicialmente vazio
  const [tarefaEditando, setTarefaEditando] = useState<number | null>(null); //estado que usa o estado de edição, se o usuário desejar alterar, o id da tarefa é passado para essa constante, caso contrário, é nulo
  const [textoEdicao, setTextoEdicao] = useState(''); //estado que recebe o texto que está sendo editado, sendo usado posteriormente para salvar, uma forma de manter o texto que está sendo editado separado do texto da tarefa original, evitando alterações indesejadas antes de salvar
  const [filtro, setFiltro] = useState<Filtro>('todas'); //estado que recebe o filtro, inicialmente 'todas', podendo ser alterado para as opções 'concluidas' ou 'pendentes', e apenas elas, já que usa o tipo Filtro que limita as opções possíveis


  const iniciarEdicao = (tarefa: Tarefa) => {
  setTarefaEditando(tarefa.id);
  setTextoEdicao(tarefa.texto);
}; // Função que inicia a edição de uma tarefa, recebe a tarefa como parâmetro, e altera o estado de edição para o id da tarefa, e o texto de edição para o texto da tarefa, permitindo que o usuário altere o texto da tarefa selecionada

const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'concluidas') {
      return tarefa.concluida;
    } else if (filtro === 'pendentes') {
      return !tarefa.concluida;
    }
    return true; // Retorna todas as tarefas se o filtro for 'todas'
  });
  const adicionarTarefa = () => {

     if (textoTarefa.trim() === '') { // Verificação de input vazio, o trim() tira os espaços em branco do começo e do fim da string
    return;
  }
  const maiorId = Math.max(0, ...tarefas.map(tarefa => tarefa.id)); // constante que recebe o valor referente ao id de maior numero na lista de tarefas

  setTarefas([
    ...tarefas,
      {
        id: tarefas.length > 0 ? maiorId + 1 : 1,
        texto: textoTarefa.trim(),
        concluida: false,
      },
    ]); //Função que puxa todas as tarefas já existentes, e adiciona uma nova tarefa com id maior que o maior id existente, texto da tarefa digitado pelo usuário, e concluida como false

    setTextoTarefa(''); //Função que limpa o input de texto
  };



  const salvarEdicao = () => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaEditando
          ? { ...tarefa, texto: textoEdicao }
          : tarefa  )
    );  //função para salvar a edição da tarefa, percorre todas as tarefas, e se o id da tarefa for igual ao id da tarefa que está sendo editada, altera o texto da tarefa para o texto que está sendo editado, caso contrário, mantém a tarefa original


    setTarefaEditando(null); //função que deixa como nulo o estado atual da tarefa a ser editada
    setTextoEdicao(''); // função que limpa o estado do texto a ser salvo
  };

  const removerTarefa = (id: number) => {
    setTarefas(
      tarefas.filter((tarefa) => tarefa.id !== id)
    ); // função que remove a tarefa, percorre todas as tarefas, e mantém apenas as tarefas cujo id seja diferente do id da tarefa que está sendo removida
  }; 

  const alternarConclusao = (id: number) => {
    setTarefas(
      tarefas.map((tarefa) => 
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    ); //função que alterna a conclusão da tarefa, percorre todas as tarefas, e se o id da tarefa for igual ao id da tarefa que está sendo alterada, altera o estado de concluida para o oposto do estado atual, caso contrário, mantém a tarefa original
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.input}
          value={textoTarefa}
          onChangeText={setTextoTarefa}
          placeholder="Digite uma tarefa"
        />
        <TouchableOpacity onPress={adicionarTarefa}>
          <Text>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Minhas tarefas</Text>

        <View style={styles.filtros}>
            <TouchableOpacity
              onPress={() => setFiltro('todas')}
              style={filtro === 'todas' && styles.filtroSelecionado}
            >
              <Text>Todas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFiltro('concluidas')}
              style={filtro === 'concluidas' && styles.filtroSelecionado}
            >
              <Text>Concluídas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFiltro('pendentes')}
              style={filtro === 'pendentes' && styles.filtroSelecionado}
            >
              <Text>Pendentes</Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={tarefasFiltradas}
          renderItem={({ item }) => (
            <View style={styles.tarefa}>
              {/* Condicional que verifica se o id da tarefa é igual ao id da tarefa que está sendo editada */}
              {item.id === tarefaEditando ? (
                <TextInput
                  value={textoEdicao}
                  onChangeText={setTextoEdicao}
                />
              ) : (
                <Text style={styles.textoTarefa}>
                  {item.texto}
                </Text>
              )} 
              <Switch
                value={item.concluida}
                onValueChange={() => alternarConclusao(item.id)}
              />
            {item.id === tarefaEditando ? (
                <Button
                  title="Salvar"
                  onPress={() => salvarEdicao()}
                /> ) : (
                <Button
                  title="Editar"
                  onPress={() => iniciarEdicao(item)}
                />)
            }
              <Button
                title="Remover"
                onPress={() => removerTarefa(item.id)}
              />
    
            </View>
            
          )}
          keyExtractor={(item) => item.id.toString()}
        />

          {/* Versão Anterior com Map
          
          {tarefas.map((tarefa) => (
            <View key={tarefa.id}>
              <Text>{tarefa.texto}</Text>
              <Button
                title="Remover"
                onPress={() => removerTarefa(tarefa.id)}
              />
            </View>
          ))} */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

    container: {
  flex: 1,
  padding: 20,
  },

    tarefa: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 10,
  padding: 10,
  borderWidth: 1,
  borderRadius: 8,
  },

    entrada: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  },

    input: {
  flex: 1,
  borderWidth: 1,
  padding: 10,
  },

    titulo: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 15,
  },

  textoTarefa: {
  flex: 1,
  flexShrink: 1, //diminui a largura do texto caso seja muito grande
},
  tarefaConcluida: {
  textDecorationLine: 'line-through',
  color: '#888',

},

filtroSelecionado: {
  padding: 5,
  backgroundColor: '#007bff',
  borderRadius: 5,
},

filtros: {
  flexDirection: 'row',
  gap: 10,
  marginBottom: 15,
},
});