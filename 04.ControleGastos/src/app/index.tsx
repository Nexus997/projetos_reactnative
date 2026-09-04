import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  StyleSheet, 
  FlatList
} from 'react-native';


type Gasto = {
  descricao: string;
  valor: number;
};

export default function HomeScreen() {

const [descricao, setDescricao] = useState('');
const [valor, setValor] = useState('');
const [gastos, setGastos] = useState<Gasto[]>([
]);
const adicionarGasto = () => {
  if (descricao && valor) {
    const novoGasto: Gasto = {
      descricao,
      valor: parseFloat(valor),
    };
    setGastos([...gastos, novoGasto]);
    setDescricao('');
    setValor('');
  }
}

  return (
<SafeAreaView style={styles.container}>
  <Text>Controle de Gastos</Text>
  <Text>Total gasto</Text>
  <Text>R$ 0,00</Text>
  <View>

    <Text>Novo gasto</Text>
    <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao}/>
    <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric"/>

    <TouchableOpacity onPress={adicionarGasto}>
      <Text>Adicionar</Text>
    </TouchableOpacity>

  </View>

  <View>
    <Text>Meus gastos</Text>

    <View>      
      <Text>Descrição</Text>
      <Text>Valor</Text>
    </View>

    <FlatList
    data={gastos}
    renderItem={({ item }) => (
      <View>
        <Text>{item.descricao}</Text>
        <Text>{item.valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
      </View>
    )}/>

  </View>




</SafeAreaView>
  );}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});