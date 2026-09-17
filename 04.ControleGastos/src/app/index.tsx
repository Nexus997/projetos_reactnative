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
const [gastos, setGastos] = useState<Gasto[]>([
]);
const adicionarGasto = () => {
  if (descricao && valor) {
    const novoGasto: Gasto = {
      descricao,
      valor: parseFloat(valor),
      categoria,
    };
    setGastos([...gastos, novoGasto]);
    setDescricao('');
    setValor('');
  }
}
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
    <GastoItem gasto={item} />
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