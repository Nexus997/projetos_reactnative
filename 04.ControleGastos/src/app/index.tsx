import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  StyleSheet } from 'react-native';


export default function HomeScreen() {

const [descricao, setDescricao] = useState('');
const [valor, setValor] = useState('');

  return (
<SafeAreaView style={styles.container}>
  <Text>Controle de Gastos</Text>
  <Text>Total gasto</Text>
  <Text>R$ 0,00</Text>
  <View>

    <Text>Novo gasto</Text>
    <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao}/>
    <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric"/>

    <TouchableOpacity>
      <Text>Adicionar</Text>
    </TouchableOpacity>

  </View>

  <View>
    <Text>Meus gastos</Text>

    <View>      
      <Text>Descrição</Text>
      <Text>Valor</Text>
    </View>

  </View>




</SafeAreaView>
  );}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});