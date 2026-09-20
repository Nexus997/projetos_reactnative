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
  <Text>Controle de Gastos</Text>
  <Text>Total gasto</Text>
  <Text>{totalGasto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
  <View>

    <Text>Novo gasto</Text>
    <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao}/>
    <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric"/>
    <Picker //Elemento do react que funciona como um select do html, possibilitando o usuário a escolher uma opção de uma lista
      selectedValue={categoria} //Valor selecionado atualmente
      onValueChange={(itemValue) => setCategoria(itemValue)} //Função chamada quando o usuário seleciona uma opção e a chama de itemValue, que é o valor da opção selecionada. Depois chama a função setCategoria para atualizar o estado da categoria com o valor selecionado
    >
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Lazer" value="Lazer" />
          <Picker.Item label="Contas" value="Contas" />
          <Picker.Item label="Outros" value="Outros" />
    </Picker>

    <TouchableOpacity onPress={adicionarGasto}>
      <Text>Adicionar</Text>
    </TouchableOpacity>

  </View>

  <View>
    <Text>Meus gastos</Text>

    <View>      
      <Text>Descrição</Text>
      <Text>Categoria</Text>
      <Text>Valor</Text>
      
    </View>

 <FlatList
  data={gastos}
  renderItem={({ item }) => (
    <GastoItem gasto={item} onRemover={removerGasto} onEditar={editarGasto}/>
  )}
/>
  
  </View>




</SafeAreaView>
  );}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});