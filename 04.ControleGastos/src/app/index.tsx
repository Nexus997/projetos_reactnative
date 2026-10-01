import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; 
import GastoItem from '../components/gastoItem';
import { Categoria, Gasto } from '../types/gasto';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  StyleSheet, 
  FlatList                                             
} from 'react-native';




export default function HomeScreen() {

const [descricao, setDescricao] = useState('');
const [valor, setValor] = useState('');
const [categoria, setCategoria] = useState<Categoria>('Alimentação');
const [gastoEditado, setGastoEditado] = useState<number | null>(null);
const [gastos, setGastos] = useState<Gasto[]>([
]);
const adicionarGasto = () => {
  const maiorId = gastos.length > 0 ? Math.max(...gastos.map(gasto => gasto.id)) : 0;
  if (descricao && valor) {
    if (gastoEditado !==null) {
      const gastosAtualizados = gastos.map(gasto =>
  gasto.id === gastoEditado
    ? {
        id: gasto.id,
        descricao: descricao,
        valor: parseFloat(valor),
        categoria: categoria
      }
    : gasto
    
  )
  setGastos(gastosAtualizados);
  setDescricao('');
  setValor('');
  setCategoria('Alimentação');
  setGastoEditado(null);
    } else {
    const novoGasto: Gasto = {
      id: maiorId + 1,
      descricao,
      valor: parseFloat(valor),
      categoria,
    };
    setGastos([...gastos, novoGasto]);
    setDescricao('');
    setValor('');
    setCategoria('Alimentação');
  
}
}
};

const removerGasto = (id: number) => {
  setGastos(gastos.filter(gasto => gasto.id !== id));
};

const editarGasto = (id: number) => {
  const editGasto = gastos.find(gasto => gasto.id === id); //find serve para encontrar um elemento em um array que satisfaça uma condição. Ele retorna o primeiro elemento que atende à condição especificada na função de callback fornecida. Se nenhum elemento atender à condição, ele retorna undefined. No caso, a função de callback é gasto => gasto.id === id, que verifica se o id do gasto é igual ao id fornecido como argumento. Se encontrar um gasto com o id correspondente, ele será armazenado na variável editGasto.
  if (editGasto) {
  setDescricao(editGasto.descricao); 
  setValor(editGasto.valor.toString());
  setCategoria(editGasto.categoria); // Define a descrição, valor e categoria do gasto a ser editado nos estados correspondentes, permitindo que o usuário veja e edite a descrição existente.
  setGastoEditado(editGasto.id) //puxa o id do gasto que está sendo editado e armazena no estado gastoEditado, para que possamos identificar qual gasto está sendo editado quando o usuário salvar as alterações.
}
};
const totalGasto = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  return (
<SafeAreaView style={styles.container}>
  <Text style={styles.titulo}>Controle de Gastos</Text>
  <Text>Total gasto</Text>
  <Text style={styles.total}>{totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
  <View style={styles.formulario}>
    <Text>Novo gasto</Text>
    <Text style={styles.label}>Descrição</Text>
<TextInput
  style={styles.input}
  placeholder="Ex.: Mercado"
  value={descricao}
  onChangeText={setDescricao}
/>

<Text style={styles.label}>Valor</Text>
<TextInput
  style={styles.input}
  placeholder="Ex.: 25,00"
  value={valor}
  onChangeText={setValor}
  keyboardType="numeric"
/>

<Text style={styles.label}>Categoria</Text>
    <Picker //Elemento do react que funciona como um select do html, possibilitando o usuário a escolher uma opção de uma lista
      style={styles.input}
      selectedValue={categoria} //Valor selecionado atualmente
      onValueChange={(itemValue) => setCategoria(itemValue)} //Função chamada quando o usuário seleciona uma opção e a chama de itemValue, que é o valor da opção selecionada. Depois chama a função setCategoria para atualizar o estado da categoria com o valor selecionado
    >
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Lazer" value="Lazer" />
          <Picker.Item label="Contas" value="Contas" />
          <Picker.Item label="Outros" value="Outros" />
    </Picker>

    <TouchableOpacity style={gastoEditado === null ? styles.botaoAdicionar : styles.botaoSalvar} onPress={adicionarGasto}>
      <Text style={styles.textoBotaoAdicionar}>{ gastoEditado===null ? 'Adicionar' : 'Salvar alterações' }</Text>
    </TouchableOpacity>

  </View>

  <View style={styles.listaGastos}>
    <Text style={styles.subtitulo}>Meus gastos</Text>

  <View style={styles.cabecalho}>
    <Text style={[styles.cabecalhoTexto, styles.cabecalhoDescricao]}>Descrição</Text>
    <Text style={[styles.cabecalhoTexto, styles.cabecalhoCategoria]}>Categoria</Text>
    <Text style={[styles.cabecalhoTexto, styles.cabecalhoValor]}>Valor</Text>
  </View>

 <FlatList
  data={gastos}
  renderItem={({ item }) => (
    <GastoItem gasto={item} onRemover={removerGasto} onEditar={editarGasto}/>
  )}
  keyExtractor={(item) => item.id.toString()}
/>
  
  </View>




</SafeAreaView>
  );}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
    input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    fontSize: 15,
    width:200,
    height:30,
    margin:2
  },
  label: {
  fontSize: 16,
  fontWeight: 'bold',
  },
  botaoAdicionar: {
  padding:10,
  borderRadius:10,
  backgroundColor:'#2dffa1',
  borderWidth:1,
  alignSelf: 'flex-start',
  margin: 5,
  },
  textoBotaoAdicionar: {
  fontSize:12,
  color:'#021910'
  },
  botaoSalvar:{
  padding:10,
  borderRadius:10,
  backgroundColor:'#54afff',
  borderWidth:1,
  alignSelf: 'flex-start',
  margin: 5,  
  },
  formulario: {
    borderWidth:1,
    padding:5,
    borderRadius:10,
    gap: 5,
  },
  listaGastos: {
    margin:10,
    flex:1,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cabecalhoDescricao: {
    width: 200,
  },

  cabecalhoCategoria: {
    width: 100,
  },

  cabecalhoValor: {
    width: 100,
  },

  cabecalhoTexto: {
  fontWeight: 'bold',
  textDecorationLine:'underline'
},  
  titulo:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 10,
  },
 subtitulo: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
  total:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom: 10,
  },
  });